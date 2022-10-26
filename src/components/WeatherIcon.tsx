import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
import {
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function getWeatherIcon(code: number): IconProp {
  if (code >= 80) return faCloudShowersHeavy;
  if (code >= 71) return faSnowflake;
  if (code >= 61) return faCloudRain;
  if (code >= 51) return faCloud;
  if (code >= 1) return faCloudSun;
  return faSun;
}

interface IWeatherIconProps {
  weatherCode: number;
  size: SizeProp;
}

export default function WeatherIcon(props: IWeatherIconProps) {
  return (
    <FontAwesomeIcon
      color="#5fb0e8"
      size={props.size}
      icon={getWeatherIcon(props.weatherCode)}
    />
  );
}
