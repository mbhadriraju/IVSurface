import yfinance as yf
import numpy as np
import pandas as pd
import datetime as dt


ticker = yf.Ticker("SPY")

exps = ticker.options