import {getShortDate} from '../helpers/date-helper.js';

const getBaseCost = (elements) => elements.reduce((acc, curr) => acc + curr.basePrice, 0);
const getAddCost = (elements) => elements.reduce((acc, curr) => acc + curr.addPrice, 0);

const getTotalCost  = (points) => {
  const baseCost = getBaseCost(points);
  let cost = baseCost;
  points.forEach((element) => {
    const {offers} = element;
    const addCost = getAddCost(offers);
    cost+=addCost;
  });
  return cost;
};

const getPeriod = (points) => {
  const dateFromArray = points.map((item) => item.dateFrom);
  const dateToArray = points.map((item) => item.dateTo);
  return {
    maximumDate: getShortDate(new Date(Math.max.apply(null, dateToArray))),
    minimumDate: getShortDate(new Date(Math.min.apply(null, dateFromArray))),
  };
};

const getPath = (points) => {
  const pathArray = points.map((item) => item.destination.name);
  return pathArray;
};

export const getTotalInfoaboutTrip = (points) => ({
  path: getPath(points),
  period: getPeriod(points),
  cost: getTotalCost(points),
});
