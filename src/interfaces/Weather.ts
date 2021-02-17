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

export interface Weather {
    type: WeatherType
    severity: WeatherSeverity
    time: Time,
}

export interface WeatherData extends Weather {
    timeZone: string,
    ident: string,
}

