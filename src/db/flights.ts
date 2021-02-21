import { Flight } from "../interfaces/Flight"
import useDatabaseQuery from "../services/pg.service"

export default async function uploadFlights(flightNumbers: number[]) {
    const request = `INSERT INTO "DimFlight" ("flightNumber") VALUES
    ${flightNumbers.map(num => `(${num})`)}`
    await useDatabaseQuery(request)
}

export async function uploadDefaultFlights(){
    const flightNumbers = Array.from({ length: 7000 }, (v, k) => k + 1)
    await uploadFlights(flightNumbers)
}