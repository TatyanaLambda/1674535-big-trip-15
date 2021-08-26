import InfoView from '../view/info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import EmptyMessageView from '../view/empty-message.js';
import TripEventsView from '../view/trip-events.js';
import {render, RenderPosition} from '../utils/render.js';
import {SORT_FIELDS} from '../const.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';
const POINT_COUNT = 4;

export default class Trip {
  constructor(bodyContainer, siteMainContainer, info) {
    this._bodyContainer = bodyContainer;
    this._siteMainContainer = siteMainContainer;
    this._infoComponent = new InfoView(info);
    this._sortComponent = new SortView(SORT_FIELDS);
    this._eventListComponent = new EventListView();
    this._emptyMessageComponent = new EmptyMessageView();
    this._tripEventsComponent = new TripEventsView();
    this._pointPresenter = new Map();
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._renderTrip(this._tripPoints);
  }

  _renderInfo() {
    render(this._siteMainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._tripEventsComponent, this._sortComponent);
  }

  _renderEventList() {
    render(this._tripEventsComponent, this._eventListComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints(from, to) {
    this._tripPoints
      .slice(from, to)
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPointList() {
    this._renderPoints(0, POINT_COUNT-1);
  }

  _renderEmptyMessage() {
    render(this._tripEventsComponent, this._emptyMessageComponent);
  }

  _renderTripEvents() {
    render(this._bodyContainer, this._tripEventsComponent);
  }

  _renderTrip(points) {
    if (points.length===0){
      this._renderEmptyMessage();
    }
    else{
      this._renderInfo(points);
      this._renderTripEvents();
      this._renderSort();
      this._renderEventList();
      this._renderPoints(points);
    }
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }
}
