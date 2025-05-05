import { Circle, Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from "lucide-react";
import { useState } from "react";

export default function Weather({ weatherData }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const { current, location, forecast } = weatherData || {};

  // Create a single "day" object from current weather data
  const currentDay = current ? {
    icon: current.condition.text,
    desc: current.condition.text,
    date: formatDate(location?.localtime),
    date_full: formatFullDate(location?.localtime),
    details: {
      humidity: current.humidity,
      wind: current.wind_kph,
      uv: current.uv,
      gust: current.gust_kph,
    },
    temp: {
      current: current.temp_c,
      feels: current.feelslike_c,
    },
  } : null;

  // Process forecast data if available
  const forecastDays = forecast?.forecastday?.map(day => ({
    icon: day.day.condition.text,
    desc: day.day.condition.text,
    date: formatDate(day.date),
    date_full: formatFullDate(day.date),
    details: {
      humidity: day.day.avghumidity,
      wind: day.day.maxwind_kph,
      uv: day.day.uv,
      chance_of_rain: day.day.daily_chance_of_rain,
      precip: day.day.totalprecip_mm,
    },
    temp: {
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c,
      avg: day.day.avgtemp_c,
    },
    hourly: day.hour,
  })) || [];

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '56rem', 
      margin: '0 auto', 
      padding: '1rem'
    }}>
      <h2 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem', 
        textAlign: 'center' 
      }}>
        Weather in {location?.name || "Loading..."}
      </h2>

      {selectedDay ? (
        <DetailedView 
          dayData={selectedDay} 
          onBack={() => setSelectedDay(null)} 
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Current Weather */}
          {currentDay && (
            <div style={{ 
              backgroundColor: '#eff6ff',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem' 
              }}>
                Current Weather
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ color: '#3b82f6' }}>{getIcon(currentDay.icon)}</div>
                  <div>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {currentDay.temp.current}°C
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                      Feels like {currentDay.temp.feels}°C
                    </p>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: '500' }}>{currentDay.desc}</p>
                  <p style={{ fontSize: '0.875rem' }}>{currentDay.date_full}</p>
                </div>
                <div style={{ marginTop: '0.5rem', width: '100%' }}>
                  <button 
                    onClick={() => setSelectedDay(currentDay)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      borderRadius: '0.375rem',
                      width: '100%',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Forecast */}
          {forecastDays.length > 0 && (
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem' 
              }}>
                Forecast
              </h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {forecastDays.map((day, index) => (
                  <div 
                    key={index} 
                    style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.375rem',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onClick={() => setSelectedDay(day)}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginBottom: '0.5rem'
                    }}>
                      <p style={{ fontWeight: '500' }}>{day.date}</p>
                      <div style={{ color: '#3b82f6' }}>{getIcon(day.icon)}</div>
                    </div>
                    <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{day.desc}</p>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      fontSize: '0.875rem'
                    }}>
                      <span>H: {day.temp.max}°C</span>
                      <span>L: {day.temp.min}°C</span>
                    </div>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: '#6b7280', 
                      marginTop: '0.5rem'
                    }}>
                      Rain: {day.details.chance_of_rain}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Detailed view component
function DetailedView({ dayData, onBack }) {
  return (
    <div style={{ 
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1rem'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{dayData.date_full}</h3>
        <button 
          onClick={onBack}
          style={{
            padding: '0.25rem 0.5rem',
            backgroundColor: '#e5e7eb',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Back
        </button>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        alignItems: 'center', 
        marginBottom: '1rem',
        gap: '1rem'
      }}>
        <div style={{ color: '#3b82f6', marginRight: '1rem' }}>{getIcon(dayData.icon)}</div>
        <div>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {dayData.temp.current ? `${dayData.temp.current}°C` : `${dayData.temp.avg}°C`}
          </p>
          <p style={{ color: '#4b5563' }}>{dayData.desc}</p>
        </div>
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <DetailItem label="Humidity" value={`${dayData.details.humidity}%`} />
        <DetailItem label="Wind" value={`${dayData.details.wind} km/h`} />
        <DetailItem label="UV Index" value={dayData.details.uv} />
        {dayData.details.gust && (
          <DetailItem label="Wind Gust" value={`${dayData.details.gust} km/h`} />
        )}
        {dayData.details.chance_of_rain && (
          <DetailItem label="Chance of Rain" value={`${dayData.details.chance_of_rain}%`} />
        )}
        {dayData.details.precip && (
          <DetailItem label="Precipitation" value={`${dayData.details.precip} mm`} />
        )}
      </div>

      {/* Hourly forecast if available */}
      {dayData.hourly && (
        <div>
          <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Hourly Forecast</h4>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '1rem', paddingBottom: '0.5rem' }}>
              {dayData.hourly.filter((_, i) => i % 3 === 0).map((hour, idx) => (
                <div key={idx} style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '4rem'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {formatTime(hour.time)}
                  </span>
                  <div style={{ color: '#3b82f6', margin: '0.25rem 0' }}>
                    {getIcon(hour.condition.text)}
                  </div>
                  <span style={{ fontWeight: '500' }}>{hour.temp_c}°C</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {hour.chance_of_rain > 0 ? `${hour.chance_of_rain}%` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div style={{ 
      backgroundColor: '#f9fafb',
      padding: '0.5rem',
      borderRadius: '0.375rem'
    }}>
      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{label}</p>
      <p style={{ fontWeight: '500' }}>{value}</p>
    </div>
  );
}

// Helper functions to format dates
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatFullDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(timeString) {
  if (!timeString) return '';
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
}

// Get weather icon based on condition text
function getIcon(iconString) {
  if (!iconString) return <Circle size={24} />;
  
  const lowerCaseIcon = iconString.toLowerCase();
  
  if (lowerCaseIcon.includes('thunder')) {
    return <CloudLightning size={24} />;
  }
  if (lowerCaseIcon.includes('rain')) {
    return <CloudRain size={24} />;
  }
  if (lowerCaseIcon.includes('drizzle')) {
    return <CloudDrizzle size={24} />;
  }
  if (lowerCaseIcon.includes('snow')) {
    return <CloudSnow size={24} />;
  }
  if (lowerCaseIcon.includes('clear')) {
    return <Sun size={24} />;
  }
  if (lowerCaseIcon.includes('cloud')) {
    return <Cloud size={24} />;
  }
  
  return <Circle size={24} />;
}