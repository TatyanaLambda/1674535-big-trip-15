import {FILTER_NAME} from '../const.js';

const createFilterItemTemplate = (filter, isChecked) => (`
  <div class="trip-filters__filter">
  <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${isChecked ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
  </div>
`);

export const createFilterTemplate = () => {
  const filterItemsTemplate = FILTER_NAME
    .map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return `
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
