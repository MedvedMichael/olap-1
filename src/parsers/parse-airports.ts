import { InputAirportData, Airport } from "../interfaces/Airport";
import processDataFromCSV from "../services/csv-parsing-service";

const filterFunction = (item: InputAirportData) => item.iata_code !== '' && item.iso_country === 'US'

const mapFunction = ({ iata_code, name, latitude_deg, longitude_deg, ident, iso_region }: InputAirportData) =>
    ({ code: iata_code, name, latitude: latitude_deg, longitude: longitude_deg, ident, region: iso_region }) as Airport


export default async function parseAirports(): Promise<Airport[]> {
    const airports: Airport[] = []
    await processDataFromCSV('./datasets/airports.csv', async (airportsData: InputAirportData, stream) => {
        if (!filterFunction(airportsData)) return;
        const mappedData = mapFunction(airportsData)
        airports.push(mappedData)
    })
    return airports
}