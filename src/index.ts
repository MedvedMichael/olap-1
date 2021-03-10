import parseAirports from './parsers/parse-airports';
import parseFlights from './parsers/parse-flights';
import parseWeather from './parsers/parse-weather';
import * as dotenv from 'dotenv';
import uploadAirports from './db/airports';
import { uploadDefaultWeather } from './db/weather';
import uploadDefaultTimes from './db/times';
import { uploadDefaultTimeZones } from './db/time-zones';
import { uploadDefaultRegions } from './db/regions';
import { updateAirlines, uploadDefaultAirlines } from './db/airlines';
import { uploadDefaultFlights } from './db/flights';

import readline from 'readline';
import readConsole from './services/read-console';
import parseAirlinesUpdates from './parsers/parse-airlines-updates';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

dotenv.config();

const initialInsert = async () => {
  const airports = await parseAirports('./datasets/airports.csv')
  await uploadDefaultWeather() //done
  await uploadAirports(airports) //done
  await uploadDefaultTimes() //done
  await uploadDefaultTimeZones() //done
  await uploadDefaultRegions() //done
  await uploadDefaultAirlines() //done
  await uploadDefaultFlights() //done
  console.log("Defaults uploaded")
}


(async () => {
  const choice = parseInt(await readConsole(rl, 'Mode: initial loading - 0, input new flights - 1, input/update airports - 2, input/update airlines - 3: '))
  if(choice === 0) return await initialInsert()
  
  if (choice === 1) {
    const year = await readConsole(rl, 'Input year for uploading flights: ')
    const airports = await parseAirports('./datasets/airports.csv')
    console.log("Airports parsed")

    const locationWeathers = await parseWeather(airports, parseInt(year))
    console.log("Weather parsed")
    await parseFlights(year, locationWeathers)
  }
  else {
    const filename = './datasets/' + (await readConsole(rl, 'Input filename in folder "datasets": '))

    if (choice === 2) {
      const airports = await parseAirports(filename)
      await uploadAirports(airports)
    }

    else if (choice === 3) {
      const airlines = await parseAirlinesUpdates(filename)
      await updateAirlines(airlines)
    }
  }

  console.log('Done')
  rl.close()
})()