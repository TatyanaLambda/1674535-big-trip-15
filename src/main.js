import {render, RenderPosition} from './helpers/utils.js';

import {SORT_FIELDS} from './const.js';
import {FILTER_NAME} from './const.js';

import {generatePoint} from './mock/point.js';
import {getTotalInfoaboutTrip} from './mock/total.js';

import MenuView from './view/menu.js';
import InfoView from './view/info.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import EventListView from './view/event-list.js';
import EditView from './view/edit.js';
import PointView from './view/point.js';
import EmptyMessageView from './view/empty-message.js';
import TripEventsView from './view/trip-events.js';


const POINT_COUNT = 4;
const POINTS_COUNT = 24;

const points = new Array(POINTS_COUNT).fill().map(generatePoint);
const siteMainElement = document.querySelector('.trip-main');
const siteHeaderElement = siteMainElement.querySelector('.trip-controls__navigation');
const siteFilterElement = siteMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const bodyConteinerElement = pageMainElement.querySelector('.page-body__container');
const info = getTotalInfoaboutTrip(points);
const renderPoint = (pointListElement, point) => {
  const pointComponent = new PointView(point);
  const editComponent = new EditView(point);
  const replacePointToEditForm = () => {
    pointListElement.replaceChild(editComponent.getElement(), pointComponent.getElement());
  };

  const replaceEditFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), editComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  render(pointListElement, pointComponent.getElement());
};

render(siteHeaderElement, new MenuView().getElement());
render(siteFilterElement, new FilterView(FILTER_NAME).getElement());
const tripEventsComponent = new TripEventsView();
if (points.every((point) => point.isArchive)){
  render(tripEventsComponent.getElement(), new EmptyMessageView().getElement());
}
else{
  render(siteMainElement, new InfoView(info).getElement(), RenderPosition.AFTERBEGIN);
  render(bodyConteinerElement, tripEventsComponent.getElement());
  render(tripEventsComponent.getElement(), new SortView(SORT_FIELDS).getElement());
  const eventListComponent = new EventListView();
  render(tripEventsComponent.getElement(), eventListComponent.getElement());

  for (let i = 1; i < POINT_COUNT; i++) {
    renderPoint(eventListComponent.getElement(), points[i]);
  }
}


