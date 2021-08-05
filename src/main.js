import {createSiteMenuTemplate} from './view/menu.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__navigation');

render(siteHeaderElement, createSiteMenuTemplate(), 'beforeend');
