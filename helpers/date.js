const date_ob = new Date();
let day = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

const dateToday = year + "-" + month + "-" + day;
const timeToday = hours + ":" + minutes + ":" + seconds;
const dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;


module.exports = {
    dateToday,
    timeToday,
    dateTime
}