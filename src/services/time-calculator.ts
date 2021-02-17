import { Time } from "../interfaces/Time";

export default function getDeltaBetweenDates(time1: Time, time2: Time) {
    const oneMinute = 1000 * 60;

    const date1 = new Date(Date.UTC(2016, time1.month, time1.day, time1.hours, time1.minutes))
    const date2 = new Date(Date.UTC(2016, time2.month, time2.day, time2.hours, time2.minutes))
    
    const difference_ms = date2.getTime() - date1.getTime()
    return Math.round(difference_ms / oneMinute);
}