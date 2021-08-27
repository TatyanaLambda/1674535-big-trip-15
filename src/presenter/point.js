import EditView from '../view/edit.js';
import PointView from '../view/point.js';
import {render, replace, remove} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._pointComponent = null;
    this._editComponent = null;
    this._mode = Mode.DEFAULT;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;
    const prevPointComponent = this._pointComponent;
    const prevEditComponent = this._editComponent;
    this._pointComponent = new PointView(point);
    this._editComponent = new EditView(point);
    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._editComponent .setFormSubmitHandler(this._handleFormSubmit);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    if (prevPointComponent === null || prevEditComponent === null) {
      render(this._eventListContainer, this._pointComponent);
      return;
    }
    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._EditComponent, prevEditComponent);
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditFormToPoint();
    }
  }

  _replacePointToEditForm() {
    replace(this._editComponent, this._pointComponent);
    document.addEventListener('keydown', this._handleEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _handleEditClick() {
    this._replacePointToEditForm();
  }

  _replaceEditFormToPoint() {
    replace(this._pointComponent, this._editComponent);
    document.removeEventListener('keydown', this._handleEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceEditFormToPoint();

  }

  _handleEscKeyDown(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditFormToPoint();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}
