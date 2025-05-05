// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
  const cities = ["Lahore", "Karachi"];

  try {
    // Fetch weather data for both cities in parallel
    const responses = await Promise.all(
      cities.map(city =>
        axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=yes`
        )
      )
    );

    // Process each city's data
    const weatherData = {};

    responses.forEach((result, index) => {
      const { location, current } = result.data;

      weatherData[cities[index].toLowerCase()] = {
        location: {
          name: location.name,
          region: location.region,
          country: location.country,
          lat: location.lat,
          lon: location.lon,
          tz_id: location.tz_id,
          localtime: location.localtime,
          localtime_epoch: location.localtime_epoch
        },
        current: {
          last_updated_epoch: current.last_updated_epoch,
          last_updated: current.last_updated,
          temp_c: current.temp_c,
          temp_f: current.temp_f,
          is_day: current.is_day === 1,
          condition: {
            text: current.condition.text,
            icon: current.condition.icon,
            code: current.condition.code
          },
          wind_mph: current.wind_mph,
          wind_kph: current.wind_kph,
          wind_degree: current.wind_degree,
          wind_dir: current.wind_dir,
          pressure_mb: current.pressure_mb,
          pressure_in: current.pressure_in,
          precip_mm: current.precip_mm,
          precip_in: current.precip_in,
          humidity: current.humidity,
          cloud: current.cloud,
          feelslike_c: current.feelslike_c,
          feelslike_f: current.feelslike_f,
          windchill_c: current.windchill_c,
          heatindex_c: current.heatindex_c,
          dewpoint_c: current.dewpoint_c,
          vis_km: current.vis_km,
          vis_miles: current.vis_miles,
          uv: current.uv,
          gust_mph: current.gust_mph,
          gust_kph: current.gust_kph,
          air_quality: current.air_quality
        }
      };
    });

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      error: "Failed to fetch weather data",
      message: error.message,
      ...(error.response && { apiError: error.response.data })
    });
  }
};
