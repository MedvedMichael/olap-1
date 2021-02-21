import parseAirports from './parsers/parse-airports';
import parseFlights from './parsers/parse-flights';
import parseWeather from './parsers/parse-weather';
import * as dotenv from 'dotenv';
import uploadAirports from './db/airports';
import { PgService } from './services/pg.service';
import { uploadDefaultWeather } from './db/weather';
import uploadDefaultTimes from './db/times';
import { uploadDefaultTimeZones } from './db/time-zones';
import { uploadDefaultRegions } from './db/regions';
import filterArrayFromDublicates from './services/array-distinct'
import uploadFacts from './db/fact-delays';
import { Weather } from './interfaces/Weather';
import { Flight } from './interfaces/Flight';
import { uploadDefaultAirlines } from './db/airlines';
import { uploadDefaultFlights } from './db/flights';
import parseCSVByLines from './services/csv-parser';

dotenv.config();


(async () => {
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

    const locationWeathers = await parseWeather(airports)
    console.log("Weather parsed")
    await parseFlights(locationWeathers)
})()