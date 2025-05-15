import { useState } from 'react';
import './components.css';

function Prediction() {
    const [asset, setAsset] = useState('');
    const [predictionData, setPredictionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getPrediction = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ asset: asset })
            });

            const data = await response.json();
            
            if (data.status === 'error') {
                throw new Error(data.issue);
            }

            setPredictionData(data.prediction);
            
        } catch (err) {
            setError(err.message);
            console.error('Prediction error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="vol-surf">
                <p>Asset:</p>
                <input 
                    type="text"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    disabled={loading}
                />
                <button 
                    onClick={getPrediction} 
                    disabled={loading || !asset}
                    className="predict-button"
                >
                    {loading ? 'Predicting...' : 'Predict'}
                </button>
                
                {error && (
                    <div className="error-message">
                        Error: {error}
                    </div>
                )}
            </div>
            <div className="pred">
                {predictionData && (
                    <div className="pred-res">
                        <h1>Previous Close: {predictionData[0]}</h1>
                        <h1>Next Close: {predictionData[1]}</h1>
                        <h2>
                            {`Predicted Increase: ${(((predictionData[1] / predictionData[0]) - 1) * 100).toFixed(4)}%`}
                        </h2>
                        <h2>
                            {Math.abs(((predictionData[1] / predictionData[0]) - 1) * 100) > 1 ? 
                                'We can confidently say that the asset will most likely follow the predicted trend' :
                                'We can reasonably speculate that the asset may follow the predicted trend'
                            }
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Prediction;