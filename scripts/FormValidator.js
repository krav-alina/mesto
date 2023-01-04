
export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._popupSaveButton = this._formElement.querySelector(this._config.submitButtonSelector);
  }


  _showInputError (inputElement, errorMessage) {
    
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  
  hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement, errorMessage) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }; 
  
  _setEventListeners () {
    
    this._toggleButtonState (this._inputList, this._popupSaveButton);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, inputElement.validationMessage);
        this._toggleButtonState (this._inputList, this._popupSaveButton);
      });
    });
  };
  
  enableValidation () {
    this._formElement.addEventListener('submit', function (evt){
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
