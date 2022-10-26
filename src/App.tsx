import { useEffect, useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import { City, WeatherData } from "./types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const cities: { [key: string]: City } = {
  ottawa: {
    lat: 45.4235,
    lon: -75.6979,
  },
  moscow: {
    lat: 55.7558,
    lon: 37.6176,
  },
  tokyo: {
    lat: 35.6785,
    lon: 139.6823,
  },
};

function App() {
  const [selectedCity, setSelectedCity] = useState<string>("ottawa");
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  async function fetchCityWeather(city: string) {
    const url = `${BASE_URL}?latitude=${cities[city].lat}&longitude=${cities[city].lon}&daily=weathercode,temperature_2m_min&timezone=auto`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data["daily"]);
      const newData = data["daily"]["time"].map((_: string, index: number) => {
        return {
          temperature: data["daily"]["temperature_2m_min"][index],
          weatherCode: data["daily"]["weathercode"][index],
        };
      });

      setWeatherData(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchCityWeather(selectedCity);
  }, [selectedCity]);

  return (
    <div className="App">
      <div className="cities-list">
        {Object.keys(cities).map((city: string) => (
          <div
            className={`city ${city === selectedCity ? "active" : ""}`}
            key={city}
            onClick={(_) => setSelectedCity(city)}
          >
            {city.toUpperCase()}
          </div>
        ))}
      </div>
      {loading ? (
        <div className="loading__container">
          <div className="loader"></div>
        </div>
      ) : (
        <Weather data={weatherData} />
      )}
    </div>
  );
}

export default App;
