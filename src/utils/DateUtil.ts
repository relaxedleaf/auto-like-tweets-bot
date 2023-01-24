import { utcToZonedTime } from 'date-fns-tz'

export const timezonedDate = (date: Date) => {
    return utcToZonedTime(date, 'America/New_York')
}

