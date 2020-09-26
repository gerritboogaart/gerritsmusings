import { DAYS } from '../Constants/constants';

export const calcTemp = (temp, type) => {
    let deg = 'F';
    if (type === 'C') {
        temp = ((temp - 32) * 5 / 9);
        deg = 'C';
    }

    return { temp: parseInt(temp), deg };
}

export const calcAmPm = (time) => {
    let hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    let ampm = "am";
    if (hours > 12) {
        hours -= 12;
        ampm = "pm";
    }
    return { ampm, hours };
}

export const renderToday = (time, i) => {
    const curtime = `${time.getMonth() + 1}/${time.getDate()}`;
    const dow = DAYS[time.getDay()];
    return i === 0 ? 'Today' : `${dow} ${curtime}`;
}
