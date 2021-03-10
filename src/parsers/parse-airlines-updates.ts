import processDataFromCSV from "../services/csv-parsing-service";
import { AirlineUpdate } from "../interfaces/Airline";

export default async function parseUirlinesUpdates(filename: string) {
    const airlines: AirlineUpdate[] = []
    await processDataFromCSV(filename, async (airline: AirlineUpdate, stream) => {
        airlines.push(airline)
    })
    return airlines
}