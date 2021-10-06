import "./App.css";
// import SideBar from "./Components/SideBar/SideBar";
import NavBar from "./Components/NavBar/NavBar";
import Page from "./Components/Page/Page";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);

  const fetchData = () => {
    const weatherForecastAPI =
      "https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=b548a761b0f38e76065c2798f9341320";
    const getWeather = axios.get(weatherForecastAPI);

    axios.all([getWeather]).then(
      axios.spread((...allData) => {
        const allDataWeather = allData[0].data;
        setWeather(allDataWeather);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=".container-fluid">
      <div className="row">
        <div id="nav-bar">{weather && <NavBar weather={weather} />}</div>
      </div>
      <div className="row">
        <Page />
      </div>
    </div>
  );
}

export default App;
