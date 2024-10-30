import React from 'react';
import './SideBar.css';

export default function SideBar({ forecastDays }) {
    console.log(forecastDays)
    // Function to get the day of the week from a date string
    const getDayofWeek = (dateString) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);  // Convert date string to Date object
        return days[date.getDay()];  // Get the day of the week
    };

    // Check if forecastDays exists and has enough data
    const nextFiveDays = Array.isArray(forecastDays) ? forecastDays.slice(0, 5) : [];

    return (
        <>
            <div className="sidebar mt-5">
                <div className="sidetitle" color='#282c34'> 3-Days-Forecast</div>
                {nextFiveDays.length > 0 ? (
                    nextFiveDays.map((day, index) => (
                        <div key={index} className="sidedays  d-flex justify-content-around align-items-center mt-4">
                            <div><span className='text-white'>{getDayofWeek(day.date)}</span></div> 
                            <div className="condition d-flex align-items-center  justify-content-around">
                                <img src={day.day.condition.icon} alt="Weather icon" />
                                <span className='text-white'>{day.day.condition.text}</span>
                            </div>
                            <div className='degree text-white'>{day.day.maxtemp_c}<sup>o</sup>C</div>
                        </div>
                    ))
                ) : (
                    <p>No forecast available</p>  // Show a message if there's no forecast
                )}
            </div>
        </>
    );
}
