import {render} from './utils/render.js';
import {FILTER_NAME} from './const.js';

import {generatePoint} from './mock/point.js';
import {getTotalInfoaboutTrip} from './mock/total.js';
import TripPresenter from './presenter/trip.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';

const POINTS_COUNT = 24;
const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');

const pageMainElement = document.querySelector('.page-main');
const bodyConteinerElement = pageMainElement.querySelector('.page-body__container');

const info = getTotalInfoaboutTrip(points);
const tripPresenter = new TripPresenter(bodyConteinerElement, siteMainElement, info);

render(siteHeaderElement, new MenuView());
render(siteFilterElement, new FilterView(FILTER_NAME));

tripPresenter.init(points);
