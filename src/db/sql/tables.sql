
CREATE TABLE IF NOT EXISTS "DimRegion" (
	"regionID" SERIAL PRIMARY KEY,
	"regionName" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "DimAirport" (
	"airportID" SERIAL PRIMARY KEY,
	"code" VARCHAR(10),
	"airportName" VARCHAR(255),
	"latitude" REAL,
	"longtitude" REAL
);

CREATE TABLE IF NOT EXISTS "DimAirline" (
	"airlineID" SERIAL PRIMARY KEY,
	"name" VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS "DimWeather" (
	"weatherID" SERIAL PRIMARY KEY,
	"weatherType" VARCHAR(50),
	"weatherSeverity" VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "DimDate" (
	"dateID" SERIAL PRIMARY KEY,
	"month" INT,
	"day" INT
);

CREATE TABLE IF NOT EXISTS "DimTime" (
	"timeID" SERIAL PRIMARY KEY,
	"hours" INT,
	"minutes" INT
);

CREATE TABLE "DimYear"(
	"yearID" SERIAL PRIMARY KEY,
	"yearNumber" INT UNIQUE
);

CREATE TABLE IF NOT EXISTS "DimTimeZone" (
	"timeZoneID" SERIAL PRIMARY KEY,
	"name" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "DimFlight" (
	"flightID" SERIAL PRIMARY KEY,
	"flightNumber" INT
);

CREATE TABLE IF NOT EXISTS "FactDelays" (
	"delayID" SERIAL PRIMARY KEY,
	"destinationID" INT REFERENCES "DimAirport",
	"originID"  INT REFERENCES "DimAirport",
	"flightID" INT REFERENCES "DimFlight",
	"regionID" INT REFERENCES "DimRegion",
	"expectedDepartureTimeID" INT REFERENCES "DimTime",
	"dateID" INT REFERENCES "DimDate",
	"yearID" INT REFERENCES "DimYear",
	"airlineID" INT REFERENCES "DimAirline",
	"timeZoneID" INT REFERENCES "DimTimeZone",
	"weatherID" INT REFERENCES "DimWeather",
	"delay" REAL,
	"taxiOut" REAL,
	"arrivalDelay" REAL,
	"airTime" REAL,
	"distance" REAL
);
