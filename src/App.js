import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from './Components/SideBar/SideBar';
import './App.css';

function App() {
   const [valueOfsearch, setValueSearch] = useState("");
   const [weathervalues, setWeathervalues] = useState(null); 
   useEffect(()=>{
      
   },[valueOfsearch])

   async function getWeatherData(searchValue) {
      if (!searchValue) return; // Avoid fetching if searchValue is empty

      try {
          const { data } = await axios.get(
            `http://api.weatherapi.com/v1/forecast.json?key=493c8478737e4f96aa6232205231408&q=${searchValue}&days=10&aqi=yes&alerts=yes`
          );
          console.log(data);
          setWeathervalues(data); // Set the fetched data
      } catch (error) {
          console.error("Invalid City:", error);
      }
  }

  useEffect(() => {
      if (valueOfsearch) {
          getWeatherData(valueOfsearch); // Call only if search value exists
      }
  }, [valueOfsearch]);

   return (
      <div className="container">
         <div className='title text-center text-white mt-5'>
             <h3>Weather App</h3>
         </div>
         <div className='findlocation mt-5'>
            <form>
               <input 
                  type="text"
                  value={valueOfsearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                  placeholder="Find your location..."
                  className="search form-control"
               />
            </form>
         </div>
         {weathervalues ? (
            <div className="container mt-2">
               <div className="row">
                  <div className="col-md-8">
                     <div className='todayweather'>
                        <div className="row d-flex align-items-center">
                           <div className="col-md-6">
                              <h2 className='text-white'>{weathervalues.location.name}</h2>
                              <p>"{weathervalues.current.condition.text}"</p>
                              <h4 className='text-white'>{weathervalues.current.temp_c}<sup>o</sup>C</h4>
                           </div>
                           <div className="col-md-6">
                              <img src={weathervalues.current.condition.icon} className='imgweather' alt="Weather Icon" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-4">
                     <SideBar forecastDays={weathervalues.forecast.forecastday} />
                  </div>
               </div>
            </div>
         ) : (
            <h3></h3>
         )}
      </div>
   );
}

export default App;
