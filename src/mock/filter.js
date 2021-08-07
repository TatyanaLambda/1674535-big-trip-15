import {isFutureOrPastEvent} from '../helpers/date_helper.js';

const eventToFilterMap = {
  everything: (points) => points.filter((point) => point).length,
  future: (points) => points
    .filter((point) => isFutureOrPastEvent(point.dateFrom)).length,
  past: (tasks) => tasks
    .filter((point) => !isFutureOrPastEvent(point.dateTo)).length,
  favorites: (tasks) => tasks
    .filter((point) => point.isFavorite).length,
};

export const generateFilter = (points) => Object.entries(eventToFilterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(points),
  }),
);
