import {createSiteMenuTemplate} from './view/menu.js';
import {createInfoTemplate} from './view/info.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventListTemplate} from './view/event-list.js';
import {createEditTemplate} from './view/edit.js';
import {createPointTemplate} from './view/point.js';
import {generatePoint} from './mock/point.js';
import {createEmptyListTemplate} from './view/empty-list.js';
import {getTotalInfoaboutTrip} from './mock/total.js';

const POINT_COUNT = 4;
const POINTS_COUNT = 4;

const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');
const info = getTotalInfoaboutTrip(points);
render(siteHeaderElement, createSiteMenuTemplate());
render(siteFilterElement, createFilterTemplate());
if (points.length===0){
  render(siteEventsElement, createEmptyListTemplate());
}
else{
  render(siteMainElement, createInfoTemplate(info), 'afterbegin');
  render(siteEventsElement, createSortTemplate());
  render(siteEventsElement, createEventListTemplate());
  const siteContentElement = document.querySelector('.trip-events__list');
  render(siteContentElement, createEditTemplate(points[0]));
  for (let i = 1; i < POINT_COUNT; i++) {
    render(siteContentElement, createPointTemplate(points[i]));
  }
}


