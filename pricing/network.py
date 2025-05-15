import torch
import torch.nn as nn
import yfinance as yf
import pandas as pd
import numpy as np
device = torch.device("mps")
import matplotlib.pyplot as plt

class LSTM(nn.Module):
    def __init__(self):
        super().__init__() 
        self.lstm = nn.LSTM(1, 128, batch_first=True)
        self.dropout = nn.Dropout(p=0.1)
        self.linear1 = nn.Linear(128, 64)
        self.relu = nn.ReLU()
        self.linear2 = nn.Linear(64, 64)
        self.linear3 = nn.Linear(64, 1)
        self.ln = nn.LayerNorm(1)
        self.bias = nn.Parameter(torch.zeros(1))
    
    def forward(self, x):
        x = x.unsqueeze(-1)
        lstm_out, _ = self.lstm(x)
        x = self.linear1(lstm_out[:, -1, :])
        x = self.relu(x)
        x = self.linear2(x)
        x = self.relu(x)
        x = self.linear3(x)
        return x + self.bias

def generate_data(arr, n):
    x = []
    y = []
    for i in range(n, len(arr)):
        x.append(arr[i-n:i])
        y.append(arr[i])
    return np.array(x), np.array(y)


def train(tick):
    spy = yf.download(tick)
    data = np.array(spy["Close"].loc['2022-04-17':]).flatten()  

    model = LSTM() 
    X, y = generate_data(data, 3)
    cut = (len(X) * 9) // 10
    X_train, X_test, y_train, y_test = torch.tensor(X[:cut]).float(), torch.tensor(X[cut:]).float(), torch.tensor(y[:cut]).float(), torch.tensor(y[cut:]).float()

    lr = 7.5e-5
    bs = 32
    epochs = 300

    loss = nn.MSELoss() 

    optimizer = torch.optim.Adam(model.parameters(), lr=lr)


    losses = []
    for epoch in range(epochs):
        total_loss = 0
        for i in range(0, len(X_train), bs):
            batch_X = X_train[i:i+bs]
            batch_y = y_train[i:i+bs].unsqueeze(1) 
            y_pred = model(batch_X)
            l = loss(y_pred, batch_y)
            
            optimizer.zero_grad()
            l.backward()
            optimizer.step()
            
            total_loss += l.item()
        
        avg_loss = total_loss / (len(X_train) // bs)
        losses.append(avg_loss)

    last_sequence = torch.tensor(data[-3:]).float()
    with torch.no_grad():
        prediction = model(last_sequence.unsqueeze(0))
    return round(float(data[-1]), 2), round(prediction.item(), 2)

