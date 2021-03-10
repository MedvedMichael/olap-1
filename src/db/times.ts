import useDatabaseQuery from "../services/pg.service"

const getArrayAutoIncremented = (length: number, gap: number = 1) => Array.from({ length }, (v, k) => k + gap)

export default async function uploadDefaultTimes() {
    const months = getArrayAutoIncremented(12)
    const years = Array.from({ length: 5 }, (v, k) => k + 2016)
    type TDate = { month: number, day: number, year: number }
    const dates = years.reduce((prevYearArr, year) => [
        ...prevYearArr,
        ...months.reduce((prev, month) => {
            const numberOfDays = [1, 3, 5, 7, 8, 10, 12].find(item => item === month) ? 31 : (month !== 2 ? 30 : (year % 4 === 0 ? 29 : 28))
            const arrayOfDays = Array.from<TDate, TDate>({ length: numberOfDays }, (v, k) => ({ month, day: k + 1, year }))
            return [...prev, ...arrayOfDays]
        }, [] as TDate[])
    ], [] as TDate[])

    const requestForDates = `INSERT INTO "DimDate" ("month", "day", "year") VALUES
    ${dates.map(({ month, day, year }) => `(${month}, ${day}, ${year})`)}`

    const hours = getArrayAutoIncremented(24, 0)
    const minutes = getArrayAutoIncremented(60, 0)
    
    const times = hours.reduce((prev, hours) => [...prev, ...minutes.map(minutes => ({ hours, minutes }))], [] as { minutes: number, hours: number }[])
    const requestForTimes = `INSERT INTO "DimTime" ("hours", "minutes") VALUES
    ${times.map(({ minutes, hours }) => `('${hours}', '${minutes}')`)}`

    await useDatabaseQuery(`${requestForDates}; ${requestForTimes};`)
}