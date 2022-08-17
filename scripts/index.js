const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
//popup name 
const popupName = document.getElementById('popupName');
const editButtonSmall = document.querySelector('.profile__button_size_small');
const closeButtonName = document.getElementById('closeButtonName');
const saveButton = document.querySelector('.popup__button');
const formElement = document.getElementById('formName');
const titleElement = document.querySelector('.profile__title');
const typeElement = document.querySelector('.profile__subtitle');
const nameField = document.getElementById('personName');
const occupationField = document.getElementById('personOccupation');

//popup place
const popupPlace = document.getElementById('popupPlace');
const editButtonBig = document.querySelector('.profile__button_size_big');
const closeButtonPlace = document.getElementById('closeButtonPlace');
const picNameField = document.getElementById('picName');
const picURLField = document.getElementById('picURL');
const list = document.querySelector('.photo-grid');
const listItem = document.querySelector('.photo-grid__item');
const formPlace = document.getElementById('formPlace');


editButtonSmall.addEventListener('click', function(){
    popupName.classList.add('popup_open');
    nameField.value = titleElement.textContent;
    occupationField.value = typeElement.textContent;
});

editButtonBig.addEventListener('click', function(){
  popupPlace.classList.add('popup_open');
  picNameField.value = 'Название';
  picURLField.value = 'Ссылка на картинку';
});

function closePopup (button, popup) {
    button.addEventListener('click', function(){
        popup.classList.remove('popup_open');
    });
};  

closePopup (closeButtonName, popupName);
closePopup (closeButtonPlace, popupPlace);

formElement.addEventListener('submit', function(event){
    event.preventDefault();
    titleElement.textContent = nameField.value;
    typeElement.textContent = occupationField.value;
    popupName.classList.remove('popup_open');
});


const copy = listItem.cloneNode(true);
formPlace.addEventListener('submit', function(event){
  event.preventDefault();
  let rectangle = null;
  let name = null;
  let photo = null;
  for (let i = 0; i < copy.childNodes.length; i++) {
      if (copy.childNodes[i].className == "photo-grid__photo") {
        photo = copy.childNodes[i];
        break;
      }       
  }
  for (let i = 0; i < copy.childNodes.length; i++) {
    if (copy.childNodes[i].className == "photo-grid__rectangle") {
      rectangle = copy.childNodes[i];
      break;
    }        
  }
  for (let i = 0; i < rectangle.childNodes.length; i++) {
    if (rectangle.childNodes[i].className == "photo-grid__title") {
      name = rectangle.childNodes[i];
      break;
    }        
  }
  photo.src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
  name.textContent = 'jghg';
  list.prepend(copy);
  //typeElement.textContent = occupationField.value;
  popupName.classList.remove('popup_open');
});



