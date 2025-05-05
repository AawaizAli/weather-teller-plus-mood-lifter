// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { format, parseISO } from "date-fns";

export default async (req, res) => {
  try {
    // Fetch forecast data for 5 days
    const result = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Lahore&days=5&aqi=no&alerts=no`
    );

    const { location, current, forecast } = result.data;

    // Process forecast days
    const days = forecast.forecastday.map(day => {
      return {
        icon: day.day.condition.text,
        desc: day.day.condition.text,
        date: format(parseISO(day.date), "MM/dd"),
        date_full: format(parseISO(day.date), "MMMM dd, yyyy"),
        details: {
          humidity: day.day.avghumidity,
          rain: day.day.totalprecip_mm,
          wind: day.day.maxwind_kph,
          chance_of_rain: day.day.daily_chance_of_rain
        },
        feels: {
          day: day.day.avgtemp_c,
          night: day.day.mintemp_c,
          morn: day.day.mintemp_c, // Using min temp for morning
          even: day.day.maxtemp_c  // Using max temp for evening
        },
        temp: {
          day: day.day.maxtemp_c,
          night: day.day.mintemp_c,
          morn: day.day.mintemp_c, // Using min temp for morning
          even: day.day.maxtemp_c  // Using max temp for evening
        },
        hourly: day.hour.map(hour => ({
          time: format(parseISO(hour.time), "HH:mm"),
          temp: hour.temp_c,
          condition: hour.condition.text,
          chance_of_rain: hour.chance_of_rain
        }))
      };
    });

    const weatherData = {
      location: {
        name: location.name,
        region: location.region,
        country: location.country,
        localtime: location.localtime,
      },
      current: {
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        condition: {
          text: current.condition.text,
          icon: current.condition.icon,
        },
        wind_kph: current.wind_kph,
        wind_dir: current.wind_dir,
        humidity: current.humidity,
        feelslike_c: current.feelslike_c,
        feelslike_f: current.feelslike_f,
        uv: current.uv,
        gust_kph: current.gust_kph,
        precip_mm: current.precip_mm,
        pressure_mb: current.pressure_mb
      },
      forecast: {
        days
      }
    };

    res.statusCode = 200;
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.statusCode = 500;
    res.json({ error: "Failed to fetch weather data" });
  }
};