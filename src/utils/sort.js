import dayjs from 'dayjs';
export const sortDate = (pointA, pointB) => dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
export const sortTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom))-dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
export const sortPrice = (pointA, pointB) => pointB.basePrice-pointA.basePrice;
