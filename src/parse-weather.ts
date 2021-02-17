import { Airport } from "./interfaces/Airport";
import { Time } from "./interfaces/Time";
import { InputWeatherData,  WeatherData } from "./interfaces/Weather";
import LocationWeather from "./LocationWeather";
import processDataFromCSV from "./services/csv-parsing-service";

export default async function parseWeather(allowedAirports: Airport[]): Promise<LocationWeather[]> {
    const tempArray: WeatherData[] = []
    let tempAirportName: string = ''
    let tempAirport: Airport
    const locationWeathers = [] as LocationWeather[]
    await processDataFromCSV('./datasets/WeatherEvents_Jan2016-Dec2020.csv', (weatherData: InputWeatherData, stream) => {

        if(tempAirportName !== weatherData.AirportCode) {
            if(tempArray.length !== 0 && tempAirport) {
                locationWeathers.push(new LocationWeather(tempArray.splice(0, tempArray.length), tempAirport))
            }
            tempAirportName = weatherData.AirportCode
            tempAirport = allowedAirports.find(item => item.ident === weatherData.AirportCode)
        }

        if(!tempAirport) return;
        
        const [[year, month, day], [hours, minutes]] = weatherData["StartTime(UTC)"].split(' ').map((item, index) => item.split(index === 0 ? '-' : ':').map(str => parseInt(str)))
        if(year !== 2016) return;
        const time: Time = {
            month,
            day,
            hours, 
            minutes
        }
        const newWeatherData: WeatherData = {
            timeZone: weatherData.TimeZone,
            time,
            ident: weatherData.AirportCode,
            type: weatherData.Type,
            severity: weatherData.Severity
        }

        

        tempArray.push(newWeatherData)
        

        // stream.destroy()
    })
    if(tempAirport) {
        locationWeathers.push(new LocationWeather(tempArray, tempAirport))
    }
    return locationWeathers;
}