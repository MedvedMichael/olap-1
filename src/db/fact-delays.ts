import { Weather } from "../interfaces/Weather";
import { Flight } from "../interfaces/Flight";
import { PgService } from "../services/pg.service";

export default async function uploadFact({ flight, weather }: { flight: Flight, weather: Weather }, pgService: PgService) {
    const request = `INSERT INTO "FactDelays" (
	    "destinationID",
	    "originID",
	    "flightID",
	    "regionID",
	    "expectedDepartureTimeID",
	    "dateID",
	    "airlineID",
	    "timeZoneID",
	    "weatherID",
	    "delay",
	    "taxiOut",
	    "arrivalDelay",
	    "airTime",
	    "distance") VALUES (
                (SELECT "airportID" FROM "DimAirport" WHERE "code" = $1),
                (SELECT "airportID" FROM "DimAirport" WHERE "code" = $2),
                (SELECT "flightID" FROM "DimFlight" WHERE "flightNumber" = $3),
                (SELECT "regionID" FROM "DimRegion" WHERE "regionName" = $4),
                (SELECT "timeID" FROM "DimTime" WHERE "hours" = $5 AND "minutes" = $6),
                (SELECT "dateID" FROM "DimDate" WHERE "month" = $7 AND "day" = $8 AND "year" = $9),
                (SELECT "airlineID" FROM "DimAirline" WHERE "name" = $10),
                (SELECT "timeZoneID" FROM "DimTimeZone" WHERE "name" = $11),
                (SELECT "weatherID" FROM "DimWeather" WHERE "weatherType" = $12 AND "weatherSeverity" = $13),
                $14,
                $15,
                $16,
                $17,
                $18
        )`
        await pgService.useQuery(request, [
            flight.destination, 
            flight.origin, 
            flight.flightNumber, 
            flight.region, 
            flight.expectedDepartureTime.hours, 
            flight.expectedDepartureTime.minutes, 
            flight.expectedDepartureTime.month, 
            flight.expectedDepartureTime.day,
            flight.expectedDepartureTime.year,
            flight.airline,
            weather.timeZone,
            weather.type,
            weather.severity,
            flight.delay,
            flight.taxiOut,
            flight.arrivalDelay,
            flight.airTime,
            flight.distance
        ])
}