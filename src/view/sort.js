import AbstractView from './abstract.js';
import {SORT_FIELDS} from '../const.js';

const createSortItemTemplate = (field, isChecked) => (
  `
  <div class="trip-sort__item  trip-sort__item--${field}">
    <input id="sort-${field}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${field}" ${isChecked ? 'checked' : ''} ${field==='event' || field==='offer' ?'disabled':''}>
    <label class="trip-sort__btn" for="sort-${field}">${field}</label>
  </div>
  `
);

const createSortTemplate = (currentSortType) => {

  const sortTemplate = Object.values(SORT_FIELDS).map((field) =>createSortItemTemplate(field, field === currentSortType)).join('');

  return`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortTemplate}
  </form>
`;};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    this._callback.sortTypeChange(evt.target.value);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('change', this._sortTypeChangeHandler);
  }
}
