export type TimelineDataPoint = {
    dateMoment: moment.Moment
    snapshotId?: string
    date: string
    changes: number
    error: number
    warn: number
}

export type DateRange = {
    to?: moment.Moment
    from: moment.Moment
}
