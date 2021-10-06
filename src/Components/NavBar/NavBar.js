import "./NavBar.css";
import { format } from "date-fns";

const NavBar = (props) => {
  const { weather } = props;
  const temp = (weather.main.feels_like - 273.15).toFixed(1) + "\u00B0 Celsius";
  const city = weather.name;
  const desc = weather.weather[0].description;
  return (
    <div className="row">
      <div className="col-md-3">
        <h2 id="logo">Kaidu</h2>
      </div>
      <div className="col-md-3" id="page-name">
        <h2>Retail</h2>
      </div>
      <div className="col-md-2" id="store-name">
        <p>Hollister Fairview Mall 31183</p>
      </div>
      <div className="col-md-2" id="admin-name">
        <p>Lucas Pinheiro</p>
      </div>
      <div className="col-md-2" id="date-dislayed">
        <p>{format(new Date(), "eeee, MMM do yyyy")}</p>
      </div>
      <p id="weather-forecast">
        {city}, {temp}, {desc}
      </p>
    </div>
  );
};
export default NavBar;
