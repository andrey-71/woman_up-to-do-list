import React, {useState, useEffect} from 'react';
import './app.less';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue, push, set, update, remove} from 'firebase/database';
import Header from '../header/header';
import List from '../list/list';
import Control from '../control/control';
import AddPopup from '../add-popup/add-popup';
import EditPopup from '../edit-popup/edit-popup';
import InfoPopup from '../info-popup/info-popup';

function App() {

  // Попапы
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  // Данные списка задач
  const [isToDoList, setIsToDoList] = useState([]);
  // Выбранный для редактирования элемент списка
  const [isSelectedListItem, setIsSelectedListItem] = useState({});

  // Initialize Firebase
  const app = initializeApp({
    databaseURL: "https://todo-list-api-17ea1-default-rtdb.europe-west1.firebasedatabase.app/"
  });
  const db = getDatabase();

  // Загрузка данных
  useEffect(() => {
    handleGetToDoList();
  }, []);

  // Обработчик нажатия Esc
  useEffect(() => {
    if (isAddPopupOpen || isEditPopupOpen) {
      document.addEventListener('keyup', closePopup.escClick.bind(closePopup));

      return () => {
        document.removeEventListener('keyup', closePopup.escClick.bind(closePopup));
      }
    }
  }, [isAddPopupOpen, isEditPopupOpen]);

  // Получение данных
  function handleGetToDoList() {

    onValue(ref(db, 'to-do-list/'), (snapshot) => {
      const toDoList = [];
      snapshot.forEach((childSnapshot) => {
        toDoList.push({
          id: childSnapshot.key,
          files: childSnapshot.val().files === '' ? [] : childSnapshot.val().files,
          title: childSnapshot.val().title,
          description: childSnapshot.val().description,
          dateComplete: childSnapshot.val().dateComplete,
          completed: childSnapshot.val().completed
        });
      })
      setIsToDoList(toDoList);
    })
  }

  // Запись данных
  function handleAddListItem(newListItem) {
    const newListItemRef = push(ref(db, 'to-do-list/'));

    set(newListItemRef, {
      id: newListItemRef.key,
      title: newListItem.title,
      description: newListItem.description,
      dateComplete: newListItem.dateComplete,
      files: newListItem.files,
      completed: false,
    })
  }

  // Обновление данных
  function handleUpdateListItem(updateListItem) {
    const updates = {};
    updates[`/to-do-list/${updateListItem.id}`] = updateListItem;
    return update(ref(db), updates);
  }

  // Отметка о выполнении
  function handleToggleMarkCompleted(id, state) {
    const updates = {};
    updates[`to-do-list/${id}/completed`] = state;
    return update(ref(db), updates);
  }

  // Удаление данных
  function handleRemoveListItem(id) {
    const removeListItemRef = ref(db, `to-do-list/${id}`);
    remove(removeListItemRef)
      .then(() => console.log('Успешно удалено'))
      .catch(err => console.log(err))
  }

  // Открытие попапа
  const openPopup = {
    addList() {
      setIsAddPopupOpen(true);
    },
    editList(selectedItem) {
      setIsEditPopupOpen(true);
      setIsSelectedListItem(selectedItem);
    },
    info(selectedItem) {
      setIsInfoPopupOpen(true);
      setIsSelectedListItem(selectedItem);
    }
  }

  // Закрытие попапа
  const closePopup = {
    allPopupToBtnClick() {
      setIsAddPopupOpen(false);
      setIsEditPopupOpen(false);
      setIsInfoPopupOpen(false)
      setIsSelectedListItem({});
    },
    overlayClick(evt) {
      (evt.target.classList.contains('popup') || evt.target.classList.contains('info-popup'))
      && this.allPopupToBtnClick();
    },
    escClick(evt) {
      evt.key === 'Escape' && this.allPopupToBtnClick();
    }
  }

  return (
    <div className='page'>
      <Header />
      <main>
        <Control onClick={openPopup.addList}/>
        <List
          isToDoList={isToDoList}
          toggleMarkExecute={handleToggleMarkCompleted}
          removeListItem={handleRemoveListItem}
          openEditPopup={openPopup.editList}
          openInfoPopup={openPopup.info}
        />
      </main>
      <AddPopup
        isOpen={isAddPopupOpen}
        onClose={closePopup}
        addListItem={handleAddListItem}
      />
      <EditPopup
        isOpen={isEditPopupOpen}
        onClose={closePopup}
        editListItem={handleUpdateListItem}
        selectedListItem={isSelectedListItem}
      />
      <InfoPopup
        isOpen={isInfoPopupOpen}
        onClose={closePopup}
        selectedListItem={isSelectedListItem}
      />
    </div>
  );
}

export default App;
