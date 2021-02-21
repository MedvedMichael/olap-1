import useDatabaseQuery from "../services/pg.service"


export async function uploadDefaultTimeZones() {
    const zones = ['US/Central', 'US/Eastern', 'US/Mountain', 'US/Pacific']
    await uploadTimeZones(zones)
}

export default async function uploadTimeZones(zones: string[]) {
    const request = `INSERT INTO "DimTimeZone" ("name") VALUES
    ${zones.map(zone => `('${zone}')`).join(',')}`
    await useDatabaseQuery(request)
}