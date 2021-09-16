import dayjs from 'dayjs';
export const sortDateUp = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
export const sortTimeUp = (pointA, pointB) => dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom))-dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
export const sortCostUp = (pointA, pointB) => pointA.basePrice-pointB.basePrice;
