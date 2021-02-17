import { Airport } from "./interfaces/Airport";
import { Time } from "./interfaces/Time";
import { Weather, WeatherData } from "./interfaces/Weather";
import getDeltaBetweenDates from "./services/time-calculator";


export default class LocationWeather {
    code: string
    timeZone: string
    weather: Weather[]
    constructor(weatherData: WeatherData[], public airport: Airport){
        this.code = weatherData[0].ident
        this.timeZone = weatherData[0].timeZone
        this.weather = weatherData.map(({time, type, severity}) => ({time, type, severity}))
    }

    findWeatherByTime(time: Time): Weather {
        return this.findWeatherRecursive(time, this.weather)
    }  

    private findWeatherRecursive(time: Time, arr: Weather[]): Weather {
        if(arr.length === 1) return arr[0]

        if (arr.length === 2) {
            const delta1 = Math.abs(getDeltaBetweenDates(time, arr[0].time))
            const delta2 = Math.abs(getDeltaBetweenDates(time, arr[1].time))
            return Math.min(delta1, delta2) === delta1 ? arr[0] : arr[1]
        }

        const middleIndex = Math.floor(arr.length / 2)
        const middle = arr[middleIndex]
        const delta = getDeltaBetweenDates(time, middle.time)

        if(Math.abs(delta) < 30) return middle;

        if(delta < 0) return this.findWeatherRecursive(time, arr.slice(middleIndex)) || arr[0]
        else return this.findWeatherRecursive(time, arr.slice(0, middleIndex)) || arr[0]
    }

}