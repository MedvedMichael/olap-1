import { Time } from "./Time";

export interface InputFlightData {
    FL_DATE: string
    OP_CARRIER: string
    OP_CARRIER_FL_NUM: string
    ORIGIN: string
    DEST: string
    CRS_DEP_TIME: string
    DEP_TIME: string
    DEP_DELAY: string
    TAXI_OUT: string
    WHEELS_OFF: string
    WHEELS_ON: string
    TAXI_IN: string
    CRS_ARR_TIME: string
    ARR_TIME: string,
    ARR_DELAY: string
    CANCELLED: string,
    CANCELLATION_CODE: string
    DIVERTED: string
    CRS_ELAPSED_TIME: string,
    ACTUAL_ELAPSED_TIME: string
    AIR_TIME: string,
    DISTANCE: string,
    CARRIER_DELAY: string
    WEATHER_DELAY: string
    NAS_DELAY: string
    SECURITY_DELAY: string
    LATE_AIRCRAFT_DELAY: string
}

export interface Flight {
    airline: string
    flightNumber: number
    origin: string
    destination: string
    expectedDepartureTime: Time,
    delay: number,
    taxiOut: number,
    arrivalDelay: number,
    airTime: number,
    distance: number
    region: string
}