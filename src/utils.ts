import moment from "moment"

const todayStr: string = moment(new Date()).format("YYYY-MM-DD")

export function formatDate(date: Date | d3.NumberValue): string {
    const validDate = Number(date)
    const dayStr: string = moment(validDate).format("YYYY-MM-DD")
    const timeStr: string = moment(validDate).format("hh:mm:ss A")
    if (todayStr === dayStr) {
        return timeStr
    } else {
        return dayStr + " " + timeStr
    }
}
