import {createSiteMenuTemplate} from './view/menu.js';
import {createInfoTemplate} from './view/info.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createContentTemplate} from './view/content.js';
import {createEditTemplate} from './view/edit.js';
import {createPointTemplate} from './view/point.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const siteEventsElement = document.querySelector('.trip-events');

render(siteHeaderElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createInfoTemplate(), 'afterbegin');
render(siteFilterElement, createFilterTemplate(), 'beforeend');
render(siteEventsElement, createSortTemplate(), 'beforeend');
render(siteEventsElement, createContentTemplate(), 'beforeend');

const siteContentElement = document.querySelector('.trip-events__list');
render(siteContentElement, createEditTemplate(), 'beforeend');
for (let i = 0; i < 3; i++) {
  render(siteContentElement, createPointTemplate(), 'beforeend');
}

