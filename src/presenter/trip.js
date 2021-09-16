import InfoView from '../view/info.js';
import SortView from '../view/sort.js';
import EventListView from '../view/event-list.js';
import EmptyMessageView from '../view/empty-message.js';
import TripEventsView from '../view/trip-events.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';
import {sortPointUp} from '../utils/date.js';
import {SORT_FIELDS} from '../const.js';

const DEFAULT_SORT_TYPE = SORT_FIELDS[0];

export default class Trip {
  constructor(bodyContainer, siteMainContainer, info) {
    this._bodyContainer = bodyContainer;
    this._siteMainContainer = siteMainContainer;
    this._infoComponent = new InfoView(info);
    this._sortComponent = new SortView(DEFAULT_SORT_TYPE);
    this._eventListComponent = new EventListView();
    this._emptyMessageComponent = new EmptyMessageView();
    this._tripEventsComponent = new TripEventsView();
    this._pointPresenter = new Map();
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._currentSortType = DEFAULT_SORT_TYPE;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();
    this._renderTrip(this._tripPoints);
  }

  _renderInfo() {
    render(this._siteMainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEventList() {
    render(this._tripEventsComponent, this._eventListComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._tripPoints
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _clearEventList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
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
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _sortPoints(sortType) {
    this._tripPoints.sort(sortPointUp);
    this._tripPoints = this._sourcedTripPoints.slice();
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    //this._clearEventList();
    //this._renderEventList();
    //this._renderPoints();
  }

  _renderSort() {
    render(this._tripEventsComponent, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

}
