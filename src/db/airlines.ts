import { AirlineUpdate } from "../interfaces/Airline"
import useDatabaseQuery, { PgService } from "../services/pg.service"

export default async function uploadAirlines(airlines: string[]) {
    if(airlines.length === 0) return;
    const request = `INSERT INTO "DimAirline" ("name") VALUES
    ${airlines.map(num => `('${num}')`)}`
    await useDatabaseQuery(request)
}

export async function updateAirlines(airlines: AirlineUpdate[]) {
    const pgService = new PgService()
    const arrRequest = `${airlines.reduce((prev, curr, index) => [...prev, `SELECT $${index + 1}`], []).join(' UNION ALL ')}`

    const {rows} = await pgService.useQuery(`SELECT * FROM "DimAirline" WHERE "name" IN (${arrRequest})`, airlines.map(item => item.oldName))
    const oldNames = rows.map(item => item.name)
    const newAirlines: AirlineUpdate[] = [], oldAirlines: AirlineUpdate[] = []

    airlines.forEach(airline => {
        const {oldName} = airline
        if(!oldName || !oldNames.find(n => n === oldName)) {
            newAirlines.push(airline)
        }
        else oldAirlines.push(airline)
    })

    await uploadAirlines(newAirlines.map(item => item.name))

    const updateRequest = `${oldAirlines.map(({name, oldName}) => `UPDATE "DimAirline" SET "name"='${name}' WHERE "name"='${oldName}'`).join('; ')}`
    return useDatabaseQuery(updateRequest)
}

export async function uploadDefaultAirlines(){
    const airlines = ["DL", "AS", "EV", "F9", "WN", "OO", "HA", "NK", "UA", "VX", "AA", "B6"]
    await uploadAirlines(airlines)
}