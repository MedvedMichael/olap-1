import useDatabaseQuery from "../services/pg.service"

export async function uploadDefaultRegions() {
    const regions = [
        'US-FL', 'US-AK', 'US-CO', 'US-TX', 'US-MA',
        'US-CA', 'US-AZ', 'US-IN', 'US-WA', 'US-IL',
        'US-MO', 'US-LA', 'US-NY', 'US-OK', 'US-NC',
        'US-PA', 'US-AL', 'US-NJ', 'US-MN', 'US-DC',
        'US-OR', 'US-KY', 'US-CT', 'US-VA', 'US-NV',
        'US-HI', 'US-MT', 'US-IA', 'US-MD', 'US-NE',
        'US-MI', 'US-UT', 'US-WI', 'US-SD', 'US-NM',
        'US-GA', 'US-NH', 'US-WY', 'US-AR', 'US-SC',
        'US-OH', 'US-KS', 'US-TN', 'US-ND', 'US-ME',
        'US-RI', 'US-MS', 'US-WV', 'US-ID', 'US-VT',
        'US-DE'
    ]
    await uploadRegions(regions)
}

export default async function uploadRegions(regions: string[]) {
    const request = `INSERT INTO "DimRegion" ("regionName") VALUES
    ${regions.map(item => `('${item}')`)}`
    await useDatabaseQuery(request)
}