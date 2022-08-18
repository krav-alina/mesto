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


function addPlace (titleValue, picValue) {
  const placeGrid = document.querySelector('.photo-grid');

  const placeContainer = document.createElement('div');
  placeContainer.classList.add('photo-grid__item');

  const picElement = document.createElement('img');
  picElement.classList.add('photo-grid__photo');
  picElement.src = picValue; 
  
  const basketButtonElement = document.createElement('button');
  basketButtonElement.classList.add('photo-grid__basket');

  const rectangleElement = document.createElement('div');
  rectangleElement.classList.add('photo-grid__rectangle');

  const titleElement = document.createElement('p');
  titleElement.classList.add('photo-grid__title');
  titleElement.textContent = titleValue;
  
  const likeButtonElement = document.createElement('button');
  likeButtonElement.classList.add('photo-grid__heart');
  rectangleElement.append(titleElement, likeButtonElement);
  rectangleElement.querySelector('.photo-grid__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__heart_active');
  }); 
  placeContainer.append(picElement, basketButtonElement, rectangleElement);
  placeGrid.append(placeContainer);
}

initialCards.forEach (function(item){
  addPlace(item.name, item.link);
});


formPlace.addEventListener('submit', function(event){
  event.preventDefault();
  let name = null;
  const itemTemplate = document.querySelector('#item').content;
  const itemElement = itemTemplate.querySelector('.photo-grid__item').cloneNode(true);
  itemElement.querySelector('.photo-grid__photo').src = picURLField.value;
  let rect = itemElement.querySelector('.photo-grid__rectangle');
  for (let i = 0; i < rect.childNodes.length; i++) {
    if (rect.childNodes[i].className == "photo-grid__title") {
      name = rect.childNodes[i];
      break;
    }        
  }
  name.textContent = picNameField.value;
  itemElement.querySelector('.photo-grid__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__heart_active');
  }); 
  list.prepend(itemElement);
  popupPlace.classList.remove('popup_open');
});

const basket = document.querySelector('.photo-grid__basket');
basket.addEventListener('click', function () {
  const listItem = basket.closest('.photo-grid__item');
  console.log(listItem);
  listItem.remove();
}); 
//basket.addEventListener('click', function(){

//});



