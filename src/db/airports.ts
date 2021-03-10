import useDatabaseQuery from "../services/pg.service";
import { Airport } from "../interfaces/Airport";

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export default async function uploadAirports (airports: Airport[]): Promise<void> {
    const request = `INSERT INTO "DimAirport" ("code", "airportName", "latitude", "longtitude") VALUES
    ${airports.map(({code, name, latitude, longitude}) => `('${code}', '${replaceAll(name, "'", "''")}', ${latitude}, ${longitude})`).join(',')}`
    return useDatabaseQuery(request)
}