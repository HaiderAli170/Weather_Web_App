import React, { useState } from 'react'
import { SlLocationPin } from 'react-icons/sl'
import clearsun from '../assets/gifsun.gif'
import rain from '../assets/gifrain.gif'
import cloud from '../assets/cloudgif.gif'
import sunup from '../assets/sunrise.gif'
import sundown from '../assets/sunset.gif'
import { format, fromUnixTime } from 'date-fns'
function WeatherDetail({ weather, setCountry }: any) {
  const [inputValue, setInputValue] = useState('')

  const temperature = weather?.main?.temp
  const humidity = weather?.main?.humidity
  const sunRise = weather?.sys?.sunrise
  const sunSet = weather?.sys?.sunset

  // Convert the Unix timestamp to a readable time format
  const sunriseTime = sunRise ? format(fromUnixTime(sunRise), 'p') : 'N/A'
  const sunsetTime = sunSet ? format(fromUnixTime(sunSet), 'p') : 'N/A'

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleButtonClick = () => {
    setCountry(inputValue)
  }

  const backgroundMain = () => {
    const sky = weather?.weather?.map((item: any) => item.main);
    console.log(sky)
    if (sky && sky[0] === 'Clouds') {  // Check if sky has data and the first item is 'Clear'
      return cloud;
    }
    if (sky && sky[0] === 'Rain') {  // Check if sky has data and the first item is 'Clear'
      return rain;
    }
    return clearsun;
  };
  return (
    <div className="flex flex-col justify-between">
      <div id="location" className="flex mx-auto ml-28">
        <input
          type="text"
          placeholder="Enter Your City"
          value={inputValue}
          onChange={handleInputChange}
          className="backdrop-blur-md border-0 font-poppins tracking-wider rounded-xl p-3 bg-white/30 focus:outline-none"
        />
        <button
          onClick={handleButtonClick}
          className="ml-2 p-2 hover:bg-white/5 bg-blend-soft-light backdrop-blur-sm border-0 font-poppins tracking-wider rounded-xl  bg-white/30"
        >
          Check Weather
        </button>
        <SlLocationPin size={30} className="mt-2 animate-bounce" />
      </div>
      <div
        id="detail"
        className="w-[130%] flex flex-col  bg-cover bg-blend-soft-light h-[50%] backdrop-blur-sm border-0 font-poppins tracking-wider rounded-xl p-3 bg-white/10"
      >
        <div className="flex justify-center">
          <h1 className="bg-clip-text text-3xl text-transparent bg-gradient-to-r from-violet-900 to-x to-slate-900">
            {weather.name}
          </h1>
        </div>
        <div className="flex text-left mt-12 flex-col items-end mr-16">
          <h2 className="font-medium bg-clip-text text-xl text-transparent bg-gradient-to-r from-slate-900 to-violet-900">
            <label
              htmlFor="Temp"
              className="font-poppins text-pretty tracking-widest"
            >
              Temp:
            </label>
            {temperature}C
          </h2>
          <h2 className="font-medium text-pretty text-left bg-clip-text text-xl text-transparent bg-gradient-to-r from-slate-900 to-violet-900">
            <label htmlFor="Temp" className="font-poppins tracking-widest">
              Humidity:
            </label>
            {humidity}
          </h2>
        </div>
      
          <img
            src={backgroundMain()}
            className="absolute rounded-full bg-blend-darken  top-10 w-[50%] h-[50%]"
            alt="Clear Sun"
          />
  
        <div className="flex flex-col ">
          <div className=" flex absolute top-[60%] right-20 text-pretty  font-medium text-left bg-clip-text text-xl text-transparent bg-gradient-to-r from-slate-900 to-violet-900 ">
          <h1 >
            <span>Sun Set: </span>
            {sunsetTime}
          </h1>
          <div></div>
            <img
              src={sundown}
              className=" absolute  rounded-full"
              alt="Clear Sun"
            />
          </div>
          <h1 className="mt-[9%] text-pretty  font-medium text-left bg-clip-text text-xl text-transparent bg-gradient-to-r from-slate-900 to-violet-900">
            <span>Sun Rises: </span>
            {sunriseTime}
          </h1>
          <img
            src={sunup}
            className=" w-[35%] h-[35%] rounded-full"
            alt="Clear Sun"
          />
        </div>
      </div>
      <div id="for extra wait"></div>
      <div id="weather_day_way_day">
        {/* <p>weather day by day</p> */}
      </div>
    </div>
  )
}

export default WeatherDetail