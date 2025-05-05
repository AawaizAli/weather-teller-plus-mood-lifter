import { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, ThermometerSun, Sunset, AlertTriangle } from 'lucide-react';

export default function WeatherWidget({ weatherData, dark }) {
  const [selectedCity, setSelectedCity] = useState('lahore');
  
  const getAirQualityText = (index) => {
    switch(index) {
      case 1: return "Good";
      case 2: return "Moderate";
      case 3: return "Unhealthy for sensitive groups";
      case 4: return "Unhealthy";
      case 5: return "Very Unhealthy";
      case 6: return "Hazardous";
      default: return "Unknown";
    }
  };

  const getWeatherIcon = (condition) => {
    const iconColor = dark ? "#F2EFE7" : "#006A71";
    if (condition.toLowerCase().includes("overcast") || condition.toLowerCase().includes("cloudy")) {
      return <Cloud className="weather-icon" color={iconColor} />;
    } else if (condition.toLowerCase().includes("rain")) {
      return <CloudRain className="weather-icon" color={iconColor} />;
    } else if (condition.toLowerCase().includes("sun") || condition.toLowerCase().includes("clear")) {
      return <Sun className="weather-icon" color={iconColor} />;
    } else {
      return <Cloud className="weather-icon" color={iconColor} />;
    }
  };

  const currentData = weatherData[selectedCity];

  return (
    <div className="weather-widget">
      
      <div className="city-selector">
        <button 
          className={`city-button ${selectedCity === 'lahore' ? 'active' : ''}`}
          onClick={() => setSelectedCity('lahore')}
        >
          Lahore
        </button>
        <button 
          className={`city-button ${selectedCity === 'karachi' ? 'active' : ''}`}
          onClick={() => setSelectedCity('karachi')}
        >
          Karachi
        </button>
      </div>
      
      <div className={`weather-card ${dark ? 'dark' : ''}`}>
        <div className="weather-header">
          <div className="location-info">
            <h2 className="location-name">{currentData.location.name}</h2>
            <p className="location-region">{currentData.location.region}, {currentData.location.country}</p>
            <p className="location-time">{currentData.location.localtime}</p>
          </div>
          <div className="weather-condition">
            {getWeatherIcon(currentData.current.condition.text)}
            <p className="condition-text">{currentData.current.condition.text}</p>
          </div>
        </div>
        
        <div className="weather-stats">
          <div className="weather-stat">
            <ThermometerSun className="weather-stat-icon" />
            <p className="weather-stat-value">{currentData.current.temp_c}°C</p>
            <p className="weather-stat-label">Feels like {currentData.current.feelslike_c}°C</p>
          </div>
          <div className="weather-stat">
            <Wind className="weather-stat-icon" />
            <p className="weather-stat-value">{currentData.current.wind_kph} km/h</p>
            <p className="weather-stat-label">{currentData.current.wind_dir}</p>
          </div>
          <div className="weather-stat">
            <Droplets className="weather-stat-icon" />
            <p className="weather-stat-value">{currentData.current.humidity}%</p>
            <p className="weather-stat-label">Humidity</p>
          </div>
        </div>
        
        <div className={`air-quality ${currentData.current.air_quality["us-epa-index"] > 2 ? 'warning' : 'good'}`}>
          <AlertTriangle className="air-quality-icon" />
          <div>
            <p className="air-quality-title">Air Quality: {getAirQualityText(currentData.current.air_quality["us-epa-index"])}</p>
            <p className="air-quality-detail">PM2.5: {currentData.current.air_quality["pm2_5"].toFixed(1)} µg/m³</p>
          </div>
        </div>
        
        <div className="visibility-info">
          <div className="visibility-label">
            <Sunset className="visibility-icon" />
            <span>Visibility:</span>
          </div>
          <span className="visibility-value">{currentData.current.vis_km} km</span>
        </div>
      </div>

      <style jsx>{`
        .weather-widget {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
        }

        .weather-title {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 0.5rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .weather-subtitle {
          text-align: center;
          margin-bottom: 1.5rem;
          color: ${dark ? "#9ACBD0" : "#48A6A7"};
        }

        .city-selector {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .city-button {
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          background-color: ${dark ? "#48A6A7" : "#9ACBD0"};
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .city-button.active {
          background-color: ${dark ? "#9ACBD0" : "#48A6A7"};
          color: ${dark ? "#006A71" : "#F2EFE7"};
        }

        .city-button:hover {
          background-color: ${dark ? "#9ACBD0" : "#48A6A7"};
          color: ${dark ? "#006A71" : "#F2EFE7"};
        }

        .weather-card {
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: ${dark ? "#48A6A7" : "#9ACBD0"};
          padding: 1.5rem;
        }

        .weather-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .location-info {
          flex: 1;
        }

        .location-name {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .location-region, .location-time {
          font-size: 0.875rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .location-time {
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .weather-condition {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .weather-icon {
          width: 3rem;
          height: 3rem;
        }

        .condition-text {
          font-size: 0.875rem;
          margin-top: 0.25rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .weather-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .weather-stat {
          text-align: center;
          flex: 1;
        }

        .weather-stat-icon {
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 auto;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .weather-stat-value {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.25rem 0;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .weather-stat-label {
          font-size: 0.75rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .air-quality {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .air-quality.good {
          background-color: ${dark ? "#006A71" : "#48A6A7"};
        }

        .air-quality.warning {
          background-color: ${dark ? "rgba(234, 179, 8, 0.2)" : "rgba(234, 179, 8, 0.1)"};
        }

        .air-quality-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .air-quality-title {
          font-weight: 500;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .air-quality-detail {
          font-size: 0.75rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .visibility-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .visibility-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .visibility-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }

        .visibility-value {
          font-weight: 500;
          color: ${dark ? "#F2EFE7" : "#006A71"};
        }
      `}</style>
    </div>
  );
}