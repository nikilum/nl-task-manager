export default function(milliseconds) {
    let days = 0
    let hours = 0
    let minutes = 0
    let seconds = milliseconds / 1000

    while (seconds >= 60) {
        seconds -= 60
        minutes += 1
    }

    while (minutes >= 60) {
        minutes -= 60
        hours += 1
    }

    while (hours >= 24) {
        hours -= 24
        days += 1
    }

    return ((days ? days + "д " : "") + (hours ? hours + "ч " : "") + (minutes ? minutes + "м " : "") + (seconds ? seconds + "с" : "")).trim()
}