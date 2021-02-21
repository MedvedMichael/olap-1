import uploadFacts from "../db/fact-delays";
import LocationWeather from "../LocationWeather";
import { Airport } from "../interfaces/Airport";
import { Flight, InputFlightData } from "../interfaces/Flight";
import { Time } from "../interfaces/Time";
import processDataFromCSV from "../services/csv-parsing-service";
import { PgService } from "../services/pg.service";
import parseCSVByLines from "../services/csv-parser";



export default async function parseFlights(locationWeathers: LocationWeather[]): Promise<void> {
    const pgService = new PgService()
    let flight: Flight, flightWithWeather, currentLocation: LocationWeather

    await parseCSVByLines('./datasets/2016.csv', async (flightData: InputFlightData) => {
        currentLocation = locationWeathers.find(locationWeather => locationWeather.airport.code === flightData.ORIGIN)
        if (!currentLocation) return;
        
        const [_, month, day] = flightData.FL_DATE.split('-').map(str => parseInt(str))

        const hours = parseInt(flightData.CRS_DEP_TIME.slice(0, flightData.CRS_DEP_TIME.length - 2)) || 0
        const minutes = parseInt(flightData.CRS_DEP_TIME.slice(flightData.CRS_DEP_TIME.length - 2, flightData.CRS_DEP_TIME.length))
        const newTime: Time = {
            month,
            day,
            hours,
            minutes
        }
        flight = {
            airline: flightData.OP_CARRIER,
            flightNumber: parseInt(flightData.OP_CARRIER_FL_NUM),
            origin: flightData.ORIGIN,
            destination: flightData.DEST,
            expectedDepartureTime: newTime,
            delay: parseFloat(flightData.DEP_DELAY),
            region: currentLocation.airport.region,
            taxiOut: parseFloat(flightData.TAXI_OUT),
            arrivalDelay: parseFloat(flightData.ARR_DELAY),
            airTime: parseFloat(flightData.AIR_TIME),
            distance: parseFloat(flightData.DISTANCE)
        }
        // console.log(mappedData)
        // flights.push(flight)
        flightWithWeather = {
            flight,
            weather: locationWeathers.find(item => item.airport.code === flight.origin).findWeatherByTime(flight.expectedDepartureTime)
        }
        try {
            await uploadFacts(flightWithWeather, pgService)
        }
        catch (error) {
            console.log(flightWithWeather)
            console.log(error)
            // stream.destroy()
        }
    })
    await pgService.stop()
}