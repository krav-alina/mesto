
export class Card {
  constructor(name, link, templateSelector, popup, openPopup) {
      this._templateSelector = templateSelector;
      this._name = name;
      this._link = link;
      this._popup = popup;
      this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(); 
    this._element.querySelector('.photo-grid__photo-image').src = this._link;
    this._element.querySelector('.photo-grid__photo-image').alt = this._link;
    this._element.querySelector('.photo-grid__title').textContent = this._name;

    return this._element;
  }

  _handleHeartClick () {
    this._element.querySelector('.photo-grid__heart').classList.toggle('photo-grid__heart_active');
  }
  _handleBasketClick () {
    this._element.remove();
    this._element = null;
  }
  _handlePictureClick () {
    this._openPopup(this._popup);
    this._popup.querySelector('.popup__photo').src = this._link;
    this._popup.querySelector('.popup__photo').alt = this._name;
    this._popup.querySelector('.popup__title_color_white').textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-grid__heart').addEventListener('click', () => {
      this._handleHeartClick();
    });
    this._element.querySelector('.photo-grid__basket').addEventListener('click', () => {
      this._handleBasketClick();
    });
    this._element.querySelector('.photo-grid__photo-image').addEventListener('click', () => {
      this._handlePictureClick();
    });
  }
  
}




