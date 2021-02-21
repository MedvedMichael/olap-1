import useDatabaseQuery from "../services/pg.service"

const getArrayAutoIncremented = (length: number, gap: number = 1) => Array.from({ length }, (v, k) => k + gap)

export default async function uploadDefaultTimes() {
    const months = getArrayAutoIncremented(12)
    const dates = months.reduce((prev, month) => {
        const numberOfDays = [1, 3, 5, 7, 8, 10, 12].find(item => item === month) ? 31 : (month === 2 ? 28 : 30)
        const arrayOfDays = Array.from({ length: numberOfDays }, (v, k) => ({ month, day: k + 1 }))
        return [...prev, ...arrayOfDays]
    }, [] as { month: number, day: number }[])
    const requestForDates = `INSERT INTO "DimDate" ("month", "day") VALUES
    ${dates.map(({ month, day }) => `('${month}', '${day}')`)}`

    const hours = getArrayAutoIncremented(24, 0)
    const minutes = getArrayAutoIncremented(60, 0)

    const times = hours.reduce((prev, hours) => [...prev, ...minutes.map(minutes => ({ hours, minutes }))], [] as { minutes: number, hours: number }[])
    const requestForTimes = `INSERT INTO "DimTime" ("hours", "minutes") VALUES
    ${times.map(({ minutes, hours }) => `('${hours}', '${minutes}')`)}`

    await Promise.all([useDatabaseQuery(`${requestForDates}; ${requestForTimes}`)])
}