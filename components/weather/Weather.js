import { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, ThermometerSun, Sunset, AlertTriangle } from 'lucide-react';

export default function WeatherWidget({weatherData}) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('lahore');
  
  // Weather data for Lahore and Karachi
  // const weatherData = {
  //   lahore: {
  //     location: {
  //       name: "Lahore",
  //       region: "Punjab",
  //       country: "Pakistan",
  //       localtime: "2025-05-06 02:33"
  //     },
  //     current: {
  //       temp_c: 25.8,
  //       temp_f: 78.5,
  //       is_day: false,
  //       condition: {
  //         text: "Overcast",
  //         icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
  //       },
  //       wind_kph: 9.7,
  //       wind_dir: "ENE",
  //       humidity: 47,
  //       feelslike_c: 26.3,
  //       vis_km: 4,
  //       air_quality: {
  //         "us-epa-index": 4,
  //         "pm2_5": 145.225
  //       }
  //     }
  //   },
  //   karachi: {
  //     location: {
  //       name: "Karachi",
  //       region: "Sindh",
  //       country: "Pakistan",
  //       localtime: "2025-05-06 02:32"
  //     },
  //     current: {
  //       temp_c: 29.3,
  //       temp_f: 84.7,
  //       is_day: false,
  //       condition: {
  //         text: "Overcast",
  //         icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
  //       },
  //       wind_kph: 6.5,
  //       wind_dir: "NNW",
  //       humidity: 75,
  //       feelslike_c: 35.8,
  //       vis_km: 5,
  //       air_quality: {
  //         "us-epa-index": 3,
  //         "pm2_5": 41.81
  //       }
  //     }
  //   }
  // };

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
    if (condition.toLowerCase().includes("overcast") || condition.toLowerCase().includes("cloudy")) {
      return <Cloud className="w-12 h-12" />;
    } else if (condition.toLowerCase().includes("rain")) {
      return <CloudRain className="w-12 h-12" />;
    } else if (condition.toLowerCase().includes("sun") || condition.toLowerCase().includes("clear")) {
      return <Sun className="w-12 h-12" />;
    } else {
      return <Cloud className="w-12 h-12" />;
    }
  };

  const currentData = weatherData[selectedCity];

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <main>
        <div className="toggle-container">
          {/* <button 
            className="theme-toggle text-2xl" 
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button> */}
        </div>
        <h1 className="title">Pakistan Weather</h1>
        <p className="description">Current conditions in major cities</p>
        
        <div className="flex gap-4 mt-4 mb-8">
          <button 
            className={`px-4 py-2 rounded-full ${selectedCity === 'lahore' ? 'compliment' : 'bg-gray-200 dark:bg-gray-600'}`}
            onClick={() => setSelectedCity('lahore')}
          >
            Lahore
          </button>
          <button 
            className={`px-4 py-2 rounded-full ${selectedCity === 'karachi' ? 'compliment' : 'bg-gray-200 dark:bg-gray-600'}`}
            onClick={() => setSelectedCity('karachi')}
          >
            Karachi
          </button>
        </div>
        
        <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
          <div className={`p-6 ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{currentData.location.name}</h2>
                <p className="text-sm">{currentData.location.region}, {currentData.location.country}</p>
                <p className="text-xs">{currentData.location.localtime}</p>
              </div>
              <div className="flex flex-col items-center">
                {getWeatherIcon(currentData.current.condition.text)}
                <p className="mt-1 text-sm">{currentData.current.condition.text}</p>
              </div>
            </div>
            
            <div className="flex justify-between mb-6">
              <div className="text-center">
                <ThermometerSun className="mx-auto w-6 h-6" />
                <p className="text-3xl font-bold">{currentData.current.temp_c}°C</p>
                <p className="text-xs">Feels like {currentData.current.feelslike_c}°C</p>
              </div>
              <div className="text-center">
                <Wind className="mx-auto w-6 h-6" />
                <p className="text-xl font-bold">{currentData.current.wind_kph} km/h</p>
                <p className="text-xs">{currentData.current.wind_dir}</p>
              </div>
              <div className="text-center">
                <Droplets className="mx-auto w-6 h-6" />
                <p className="text-xl font-bold">{currentData.current.humidity}%</p>
                <p className="text-xs">Humidity</p>
              </div>
            </div>
            
            <div className={`rounded-lg p-3 flex items-center gap-2 ${currentData.current.air_quality["us-epa-index"] > 2 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-green-100 dark:bg-green-900'}`}>
              <AlertTriangle className="w-6 h-6" />
              <div>
                <p className="font-medium">Air Quality: {getAirQualityText(currentData.current.air_quality["us-epa-index"])}</p>
                <p className="text-xs">PM2.5: {currentData.current.air_quality["pm2_5"].toFixed(1)} µg/m³</p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sunset className="w-5 h-5" />
                  <span className="text-sm">Visibility:</span>
                </div>
                <span className="font-medium">{currentData.current.vis_km} km</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}