const time = "5:30";

const to19 = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const to60 = ["twenty", "thirty", "fourty", "fifty"];

const timeToWords = (time) => {
  let hours, minutes, res;

  if (time.length === 4) {
    hours = time.slice(0, 1);
    minutes = time.slice(2, 4);
  } else {
    hours = time.slice(0, 2);
    minutes = time.slice(3, 5);
  }

  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (minutes === 0) {
    res = to19[hours] + "o'clock";
  }
  if (minutes < 20) {
    if (minutes === 1) {
      res = to19[minutes] + " minute past " + to19[hours];
    } else if (minutes === 15) {
      res = "quarter past " + to19[hours];
    } else {
      res = to19[minutes] + " minutes past " + to19[hours];
    }
  } else if (minutes < 40) {
    if (minutes === 30) {
      res = "half past " + to19[hours];
    } else {
      res =
        to60[Math.floor(minutes / 10) - 2] +
        " " +
        to19[minutes % 10] +
        " minutes past " +
        to19[hours];
    }
  } else {
    minutes = 60 - minutes;
    res = to19[minutes] + " minutes to " + to19[(hours + 1) % 12];
  }
  console.log(res);
};
timeToWords(time);
