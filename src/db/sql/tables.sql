
CREATE TABLE IF NOT EXISTS "DimRegion" (
	"regionID" SERIAL PRIMARY KEY,
	"regionName" VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "DimAirport" (
	"airportID" SERIAL PRIMARY KEY,
	"code" VARCHAR(10) UNIQUE,
	"airportName" VARCHAR(255),
	"latitude" REAL,
	"longtitude" REAL,
	"previousName" VARCHAR (255), 
	"effectiveDate" DATE
);

CREATE TABLE IF NOT EXISTS "DimAirline" (
	"airlineID" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS "DimWeather" (
	"weatherID" SERIAL PRIMARY KEY,
	"weatherType" VARCHAR(50),
	"weatherSeverity" VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS "DimDate" (
	"dateID" SERIAL PRIMARY KEY,
	"month" INT,
	"day" INT,
	"year" INT
);

CREATE TABLE IF NOT EXISTS "DimTime" (
	"timeID" SERIAL PRIMARY KEY,
	"hours" INT,
	"minutes" INT
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
	"airlineID" INT REFERENCES "DimAirline",
	"timeZoneID" INT REFERENCES "DimTimeZone",
	"weatherID" INT REFERENCES "DimWeather",
	"delay" REAL,
	"taxiOut" REAL,
	"arrivalDelay" REAL,
	"airTime" REAL,
	"distance" REAL
);


CREATE FUNCTION public."AirportsSCD"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    oldID INT;
BEGIN
    oldID = (SELECT "airportID" FROM "DimAirport" WHERE "code" = NEW."code");
	IF oldID IS NULL 
	THEN RETURN NEW;
	ELSE
		UPDATE "DimAirport"
		SET "airportName" = NEW."airportName",
		"previousName" = (SELECT "airportName" FROM "DimAirport" WHERE "airportID" = oldID),
		"effectiveDate" = NOW()
		WHERE "airportID" = oldID;
		RETURN NULL;
	END IF;
END;
$BODY$;

CREATE TRIGGER "AirportsSCDTrigger" BEFORE INSERT ON "DimAirport"
FOR EACH ROW EXECUTE PROCEDURE "AirportsSCD"();