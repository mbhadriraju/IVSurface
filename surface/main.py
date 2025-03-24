import yfinance as yf
import numpy as np
from math import log, sqrt, exp
from scipy.stats import norm
from datetime import datetime, date
from scipy.interpolate import SmoothBivariateSpline
import json
import matplotlib.pyplot as plt


def opt_price(S, K, r, t, sigma, q, call):
    d1 = (log(S / K) + ((r - q + ((sigma ** 2) / 2)) * t)) / (sigma * sqrt(t))
    d2 = d1 - (sigma * sqrt(t))
    if call:
        return S * exp(-q * t) * norm.cdf(d1) - K * exp(-r * t) * norm.cdf(d2)
    return K * exp(-r * t) * norm.cdf(-d2) - S * exp(-q * t) * norm.cdf(-d1)

def implied_vol(price, S, K, t, r, q, call):
    init_sigma = 0.1
    for i in range(100):
        Cprime = S * sqrt(t) * norm.pdf((log(S / K) + ((r - q + ((init_sigma ** 2) / 2)) * t)) / (init_sigma * sqrt(t)))
        bs_price = opt_price(S, K, r, t, init_sigma, q, call)
        C = bs_price - price
        new_sigma = init_sigma - (C / Cprime)
        init_sigma = new_sigma
        if abs(init_sigma) < .001:
            return init_sigma
    return init_sigma

def surface_plot(tick, str1, str2, d1, d2):
    str1, str2, d1, d2 = int(str1), int(str2), int(d1), int(d2)
    ticker = yf.Ticker(tick)

    prev_close = ticker.info["previousClose"]

    exps = ticker.options

    options = []
    for expiry in exps:
        days = (datetime.strptime(expiry, "%Y-%m-%d").date() - date.today()).days
        if days >= d1 and days <= d2:
            chain = ticker.option_chain(expiry)
            for i in range(len(chain.calls["strike"])):
                strike = chain.calls["strike"][i]
                if strike <= str2 and strike >= str1:
                    options.append([expiry, strike, chain.calls["impliedVolatility"][i]])
            
            for i in range(len(chain.puts["strike"])):
                strike = chain.puts["strike"][i]
                if strike <= str2 and strike >= str1:
                    options.append([expiry, strike, chain.puts["impliedVolatility"][i]])





    length = len(options)
    x = [(datetime.strptime(options[i][0], "%Y-%m-%d").date() - date.today()).days for i in range(length)]
    y = [options[i][1] / prev_close for i in range(length)]
    z = [options[i][2] for i in range(length)]

    tx = np.linspace(min(x), max(x), len(x))
    ty = np.linspace(min(y), max(y), len(y))

    X, Y = np.meshgrid(tx, ty)

    spline = SmoothBivariateSpline(x, y, z)

    Z = spline(tx, ty)
    data = {
        "X": X,
        "Y": Y,
        "Z": Z
    }
    return data
'''
data = surface_plot("SPY", 400, 700, 0, 60)
fig, ax = plt.subplots(subplot_kw={"projection": "3d"})
plt.plot(data["X"], data["Y"], data["Z"])
surf = ax.plot_surface(data["X"], data["Y"], data["Z"], cmap='viridis', edgecolor='none', linewidth=0)
fig.colorbar(surf)
plt.show()'''