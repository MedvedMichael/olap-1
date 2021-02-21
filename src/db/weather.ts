import useDatabaseQuery from "../services/pg.service"


export async function uploadDefaultWeather () {
    const weatherTypes = ['Snow', 'Fog', 'Cold', 'Storm', 'Rain', 'Precipitation', 'Hail']
    const weatherSeverities = ['Light', 'Severe', 'Moderate', 'Heavy', 'UNK', 'Other']
    const crossJoin = weatherTypes.reduce((prev, type) => [...prev, ...weatherSeverities.map(severity => ({type, severity}))], [])
    uploadWeather(crossJoin)
}

export default async function uploadWeather(weather: {type: string, severity: string}[]) {
    const request = `INSERT INTO "DimWeather" ("weatherType", "weatherSeverity") VALUES
    ${weather.reduce((prev, {type, severity}) => [...prev, `('${type}', '${severity}')`],[])}`

    await useDatabaseQuery(request)
}