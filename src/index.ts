import parseAirports from './parse-airports';
import parseFlights from './parse-flights';
import parseWeather from './parse-weather';
import getDeltaBetweenDates from './services/time-calculator';


(async () => {
    const airports = await parseAirports()
    const locationWeathers = await parseWeather(airports)
    const codes = locationWeathers.map(item => item.airport.code)
    const flights = await parseFlights(codes)
    const location = locationWeathers.find(item => item.airport.code === flights[0].origin)
    const weather = location.findWeatherByTime(flights[6].expectedDepartureTime)
    console.log(flights[6])
    console.log(weather)
    // console.log(getDeltaBetweenDates( { month: 1, day: 1, hours: 13, minutes: 20 },  { month: 1, day: 1, hours: 14, minutes: 53 }))
    // const arr = [1,2,3,4,5]
    // console.log(arr.slice(0,4))
    // console.log(locationWeathers[0])
    // console.log(locationWeathers[1])
    // console.log(locationWeathers[2])
    // console.log(locationWeathers[3])
    // console.log(locationWeathers[4])
})()