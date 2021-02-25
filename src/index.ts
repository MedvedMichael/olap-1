import parseAirports from './parsers/parse-airports';
import parseFlights from './parsers/parse-flights';
import parseWeather from './parsers/parse-weather';
import * as dotenv from 'dotenv';
import uploadAirports from './db/airports';
import { uploadDefaultWeather } from './db/weather';
import uploadDefaultTimes from './db/times';
import { uploadDefaultTimeZones } from './db/time-zones';
import { uploadDefaultRegions } from './db/regions';
import { uploadDefaultAirlines } from './db/airlines';
import { uploadDefaultFlights } from './db/flights';

import readline from 'readline';
import readConsole from './services/read-console';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

dotenv.config();


(async () => {
    const year = await readConsole(rl, 'Input year for uploading flights: ')
    const airports = await parseAirports()
    console.log("Airports parsed")
    // await uploadDefaultWeather() //done
    // await uploadAirports(airports) //done
    // await uploadDefaultTimes() //done
    // await uploadDefaultTimeZones() //done
    // await uploadDefaultRegions() //done
    // await uploadDefaultAirlines() //done
    // await uploadDefaultFlights() //done
    // console.log("Defaults uploaded")

    const locationWeathers = await parseWeather(airports, parseInt(year))
    console.log("Weather parsed")
    await parseFlights(year, locationWeathers)
    console.log('Done')
})()