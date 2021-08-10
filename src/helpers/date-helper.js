import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
const HOUR = 60;
const DAY = 24*HOUR;

dayjs.extend(duration);

export const getDateWithTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
export const getTimeFromDate = (date) => dayjs(date).format('HH:mm');
export const getShortDate = (date) => dayjs(date).format('MMM DD');
export const getLongDate = (date) => dayjs(date).format('YYYY-MM-DD');
export const getDateForEditForm = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const getDateDifference = (dateFrom, dateTo) => {
  const dateDiff = dayjs(dateTo).diff(dateFrom, 'minute');
  if (dateDiff<HOUR){
    return dayjs.duration(dateDiff,'minutes').format('mm[M]');
  }
  if (dateDiff<DAY){
    return dayjs.duration(dateDiff,'minutes').format('HH[H] mm[M]');
  }
  return dayjs.duration(dateDiff,'minutes').format('DD[D] HH[H] mm[M]');
};

export const isPastEvent = (dueDate) => dayjs(dueDate).isBefore(dayjs(), 'D');
