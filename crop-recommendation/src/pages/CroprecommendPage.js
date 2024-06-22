import React, { useState } from 'react';
import '../styles/Croprecommend.css';
import Menu from './Menu';
import { FaTimes } from 'react-icons/fa';

const FormComponent = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    pH: '',
    rainfall: ''
  });

  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // New object to send data
    const formDataToSend = new FormData();
    formDataToSend.append('N', formData.N);
    formDataToSend.append('P', formData.P);
    formDataToSend.append('K', formData.K);
    formDataToSend.append('temperature', formData.temperature);
    formDataToSend.append('humidity', formData.humidity);
    formDataToSend.append('pH', formData.pH);
    formDataToSend.append('rainfall', formData.rainfall);

    fetch('http://127.0.0.1/index.php', {
      method: 'POST',
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => {
        setResult({ crop: data.recommended_crop, imageUrl: data.image_url, details: data.details });
        setShowResult(true);
        setProcessing(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setProcessing(false);
      });
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setResult(null);
  };

  const ResultComponent = ({ result, handleCloseResult }) => (
    <div className="result-container">
      <div className="result-rectangle">
        <button className="close-btn" onClick={handleCloseResult}>
          <FaTimes />
        </button>
        <h2>Result</h2>
        <p>{result.crop}</p>
        <p>
          {result.imageUrl && (
            <img src={result.imageUrl} alt={result.crop} style={{ width: '190px', height: '95px' }} />
          )}
        </p>
        <p style={{ fontSize: '10px' }}>{result.details}</p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <header>
        <Menu />
      </header>
      <div className="form-container">
        <div className="hth-container">
          <h2>Share your land info and let's make it thrive!</h2>
        </div>
        <form onSubmit={handleSubmit} className="crop-form">
          <div className="input-group">
            <label htmlFor="N">N (Nitrogen)</label>
            <input type="number" name="N" value={formData.N} onChange={handleChange} placeholder="N" />
          </div>
          <div className="input-group">
            <label htmlFor="P">P (Phosphorus)</label>
            <input type="number" name="P" value={formData.P} onChange={handleChange} placeholder="P" />
          </div>
          <div className="input-group">
            <label htmlFor="K">K (Potassium)</label>
            <input type="number" name="K" value={formData.K} onChange={handleChange} placeholder="K" />
          </div>
          <div className="input-group">
            <label htmlFor="temperature">Temperature</label>
            <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature in °C" />
          </div>
          <div className="input-group">
            <label htmlFor="humidity">Humidity</label>
            <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Humidity%" />
          </div>
          <div className="input-group">
            <label htmlFor="pH">pH</label>
            <input type="number" name="pH" value={formData.pH} onChange={handleChange} placeholder="pH" />
          </div>
          <div className="input-group">
            <label htmlFor="rainfall">Rainfall</label>
            <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="Rainfall in mm" />
          </div>
          <div className="button-container">
            <button type="submit">Recommend!</button>
          </div>
        </form>
      </div>
      {/* Processing effect */}
      {processing && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Processing...</p>
        </div>
      )}
      {/* Result display */}
      {showResult && result && <ResultComponent result={result} handleCloseResult={handleCloseResult} />}
    </div>
  );
};

export default FormComponent;
