import { Flight } from "../interfaces/Flight"
import useDatabaseQuery from "../services/pg.service"

export default async function uploadAirlines(airlines: string[]) {
    const request = `INSERT INTO "DimAirline" ("name") VALUES
    ${airlines.map(num => `('${num}')`)}`
    await useDatabaseQuery(request)
}

export async function uploadDefaultAirlines(){
    const airlines = ["DL", "AS", "EV", "F9", "WN", "OO", "HA", "NK", "UA", "VX", "AA", "B6"]
    await uploadAirlines(airlines)
}