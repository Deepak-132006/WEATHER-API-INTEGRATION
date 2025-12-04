import React,{useRef,useEffect,useState} from "react"; // Importing React core, useRef for DOM reference, useEffect for lifecycle, and useState for managing state
import "./Weather.css" // Importing component-specific CSS styles
import cloud_icon from '../assets/cloud.png' // Cloud icon
import clear_icon from '../assets/clear.png' // Clear sky icon
import drizzle_icon from '../assets/drizzle.png' // Drizzle icon
import humidity_icon from '../assets/humidity.png' // Humidity icon
import rain_icon from '../assets/rain.png' // Rain icon
import search_icon from '../assets/search.png' // Search icon
import snow_icon from '../assets/snow.png' // Snow icon
import wind_icon from '../assets/wind.png' // Wind icon

const Weather = () => { // Main functional component

  const inputRef=useRef() // Ref to access the input DOM element
  const[weatherData,setWeatherData]=useState(false) // State to store fetched weather data

  const allIcons ={ // Mapping weather condition codes to corresponding icons
    "01d":clear_icon,
    "01n": clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,

  }
const search = async (city) => { // Function to fetch weather data for a given city
    if (city === "") { // Alert if input is empty
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`; // API URL with city and API key
         const response = await fetch(url); // Fetching data
          const data = await response.json(); // Parsing JSON

      if (!response.ok) { // Handling API errors
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon; // Fallback to clear icon if code not found
      setWeatherData({ // Updating state with weather data
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) { // Catch any network or runtime error
      setWeatherData(false);
      console.log("Error in fetching data");
    }
  };

  useEffect(() => { // On mount, fetch weather for default city "London"
    search("London");
  }, []);

  return (
    <div>
      <h1>WEATHER</h1>
      <div className="card">
        <div className="weather">
                     <div className="search-bar"> {/* Input bar with search icon */}
                    <input ref={inputRef} type="text" placeholder="Search" />
            <img src={search_icon} onClick={() => search(inputRef.current.value)} alt="" />
          </div>

          {weatherData ? ( // Render only if weather data exists
            <>
  <img src={weatherData.icon} className='weather-icon' alt="" /> {/* Weather condition icon */}
              <p className='temperature'>{weatherData.temperature}°C</p> {/* Temperature display */}
                      <p className='location'> {weatherData.location}</p> {/* Location display */}
              <div className="weather-data"> {/* Additional weather metrics */}
          <div className="col">
       <img src={humidity_icon} alt="" /> {/* Humidity icon */}
                  <div>
              <p>{weatherData.humidity}%</p>
      <span>Humidity</span>
                  </div>
        </div>
        <div className="col">
                                   <img src={wind_icon} alt="" /> {/* Wind speed icon */}
                  <div>
                    <p>{weatherData.windSpeed}Km/h</p>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </>
          ) : null} {/* If no data, render nothing */}
        </div>
      </div>
    </div>
  );
};
export default Weather // Exporting the Weather component
