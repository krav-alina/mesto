
export class Card {
  constructor(name, link, templateSelector) {
      this._templateSelector = templateSelector;
      this._name = name;
      this._link = link;
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
    const basket = this._element.querySelector('.photo-grid__basket').closest('.photo-grid__item');
    basket.remove();
  }
  _handlePictureClick () {
    const popup = document.getElementById('popupPic');
    popup.classList.add('popup_open');
    popup.querySelector('.popup__photo').src = this._link;
    popup.querySelector('.popup__photo').alt = this._name;
    popup.querySelector('.popup__title_color_white').textContent = this._name;
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




