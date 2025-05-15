import React from 'react';

function Home() {
    return (
        <div className="home">
            <h2>Welcome To The Trading Hub!</h2>
            <div className="features">
                <div className="feature-card">
                    <h4>Volatility Surface</h4>
                    <p>Calculate and visualize implied volatility surfaces for options</p>
                </div>
                <div className="feature-card">
                    <h4>Stock Prediction</h4>
                    <p>An LSTM neural network for stock price prediction</p>
                </div>
            </div>
            <div>
                <h3>
                The Trading Hub is a comprehensive platform designed for recreational derivatives traders. It allows traders to explore the basics of volatility as well as use machine learning techniques to make price speculations.
                </h3>
            </div>
        </div>
    );
}

export default Home;