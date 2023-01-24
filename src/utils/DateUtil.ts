import { utcToZonedTime } from 'date-fns-tz'

export const timezonedDate = (date: Date) => {
    return utcToZonedTime(date, process.env.TIMEZONE!)
}

