import useDatabaseQuery from "../services/pg.service";
import { Airport } from "../interfaces/Airport";

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export default async function uploadAirports (airports: Airport[]) {
    const request = `INSERT INTO "DimAirport" ("code", "airportName", "latitude", "longtitude") VALUES
    ${airports.map(({code, name, latitude, longitude}) => `('${code}', '${replaceAll(name, "'", "''")}', ${latitude}, ${longitude})`).join(',')}`
    await useDatabaseQuery(request)
}