import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherData } from "../types";
import styles from "./Weather.module.css";
import WeatherIcon from "./WeatherIcon";

library.add(faCoffee);

interface IWeatherProps {
  data: WeatherData[];
}

export default function Weather(props: IWeatherProps) {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const d = new Date();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.today}>
          <div className={styles.title}>Today</div>
          <div className={styles.box}>
            <WeatherIcon size="6x" weatherCode={props.data[0].weatherCode} />
            <div className={styles.temperature}>
              {props.data[0].temperature}
            </div>
          </div>
        </div>

        <ul className={styles.week}>
          {props.data
            .slice(1, 5)
            .map((dayWeather: WeatherData, index: number) => (
              <li key={index} className={styles.day}>
                <div className={styles.title}>
                  {weekday[(d.getDay() + 1 + index) % 7]}
                </div>
                <WeatherIcon size="4x" weatherCode={dayWeather.weatherCode} />
                <div className={styles.temperature}>
                  {dayWeather.temperature}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
