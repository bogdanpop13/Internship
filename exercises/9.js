const time = "01:05:03AM";

const time24 = (time) => {
    let hour, minutes, seconds;
    hour = time.slice(0,2);
    minutes = time.slice(3,5);
    seconds = time.slice(6,8);
    if (time.includes("A") && hour === 12) {
        hour = "00";
    } else if (time.includes("P")) {
        hour = parseInt(hour);
        hour = hour%12;
        hour += 12;
    }
    console.log(hour + ":" + minutes + ":" + seconds);
    return time;

}
time24(time)