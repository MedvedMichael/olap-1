import { Flight, InputFlightData } from "./interfaces/Flight";
import { Time } from "./interfaces/Time";
import processDataFromCSV from "./services/csv-parsing-service";



export default async function parseFlights(allowedCodes: string[]): Promise<Flight[]> {
    const flights: Flight[] = []
    await processDataFromCSV('./datasets/2016.csv', (flightData: InputFlightData, stream) => {
        if(!allowedCodes.find(item => item === flightData.ORIGIN)) return;
        const [_, month, day] = flightData.FL_DATE.split('-').map(str => parseInt(str))
        
        const hours = parseInt(flightData.CRS_DEP_TIME.slice(0, flightData.CRS_DEP_TIME.length - 2)) || 0
        const minutes = parseInt(flightData.CRS_DEP_TIME.slice(flightData.CRS_DEP_TIME.length - 2, flightData.CRS_DEP_TIME.length))
        const newTime: Time = {
            month,
            day,
            hours, 
            minutes
        }
        const mappedData: Flight = {
            airline: flightData.OP_CARRIER,
            flightNumber: flightData.OP_CARRIER_FL_NUM,
            origin: flightData.ORIGIN,
            destination: flightData.DEST,
            expectedDepartureTime: newTime,
            delay: parseFloat(flightData.DEP_DELAY)
        }
        // console.log(mappedData)
        flights.push(mappedData)

        // stream.destroy()
    })

    return flights
}