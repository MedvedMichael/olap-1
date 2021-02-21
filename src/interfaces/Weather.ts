import { Time } from "./Time";

type WeatherType = 'Snow' | 'Fog' | 'Cold' | 'Storm' | 'Rain' | 'Precipitation' | 'Hail'
type WeatherSeverity =  'Light' | 'Severe' | 'Moderate' | 'Heavy' | 'UNK' | 'Other'

export interface InputWeatherData {
    EventId: string,
    Type: WeatherType
    Severity: WeatherSeverity
    'StartTime(UTC)': string,
    'EndTime(UTC)': string,
    TimeZone: string,
    AirportCode: string,
    LocationLat: string,
    LocationLng: string,
    City: string,
    County: string,
    State: string,
    ZipCode: string
}

export type TimeZone = 'US/Central' | 'US/Eastern' | 'US/Mountain' | 'US/Pacific'
export interface Weather {
    type: WeatherType
    severity: WeatherSeverity
    time: Time,
    timeZone: TimeZone
}

export interface WeatherData extends Weather {
    ident: string,
}

