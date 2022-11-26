import React, {useState, useEffect} from 'react';
import './app.less';
import Header from '../header/header';
import List from '../list/list';
import Control from '../control/control';
import AddListPopup from '../add-list-popup/add-list-popup';
import EditListPopup from '../edit-list-popup/edit-list-popup';
import InfoPopup from '../info-popup/info-popup';

function App() {

  // Попапы
  const [isAddListPopupOpen, setIsAddListPopupOpen] = useState(false);
  const [isEditListPopupOpen, setIsEditListPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  // Данные списка задач
  const [isDataToDoList, setIsDataToDoList] = useState([]);
  // Выбранный для редактирования элемент списка
  const [isSelectedListItem, setIsSelectedListItem] = useState({});

  // Проверка наличия данных в localStorage и запись в стейт
  useEffect(() => {
    list.getData();
  }, []);

  // Обработчик нажатия Esc
  useEffect(() => {
    if (isAddListPopupOpen || isEditListPopupOpen) {
      document.addEventListener('keyup', closePopup.escClick.bind(closePopup));

      return () => {
        document.removeEventListener('keyup', closePopup.escClick.bind(closePopup));
      }
    }
  }, [isAddListPopupOpen, isEditListPopupOpen]);

  // Управление списком дел
  const list = {
    toDoList: JSON.parse(localStorage.getItem('toDoList')),
    // - получение данных
    getData() {
      this.toDoList?.length > 0 && setIsDataToDoList(this.toDoList);
    },
    // - добавление нового элемента
    addItem(newListItem) {
      if (this.toDoList) {
        this.toDoList.push(
          {
            title: newListItem.title,
            description: newListItem.description,
            dateComplete: newListItem.dateComplete,
            files: newListItem.files,
            completed: false
          }
        );
        localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
        setIsDataToDoList(this.toDoList);
      } else {
        localStorage.setItem('toDoList', JSON.stringify([{text: newListItem, completed: false}]));
        setIsDataToDoList([{text: newListItem, completed: false}]);
      }
    },
    // - поставить/снять отметку о выполнении
    toggleMarkExecute(index) {
      const completedListItem = this.toDoList.find((item, itemIndex) => itemIndex === index);
      completedListItem.completed = !completedListItem.completed;
      localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
      setIsDataToDoList(this.toDoList);
    },
    // - удаление элемента списка
    removeItem(index) {
      this.toDoList.splice(index, 1);
      localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
      setIsDataToDoList(this.toDoList);
    },
    // - редактировать элемент списка
    editItem(index, newItemData) {
      const editedListItem = this.toDoList.find((item, itemIndex) => itemIndex === index);
      editedListItem.title = newItemData.title;
      editedListItem.description = newItemData.description;
      editedListItem.dateComplete = newItemData.dateComplete;
      editedListItem.files = newItemData.files;
      localStorage.setItem('toDoList', JSON.stringify(this.toDoList));
      setIsDataToDoList(this.toDoList);
    },
  }

  // Открытие попапа
  const openPopup = {
    addList() {
      setIsAddListPopupOpen(true);
    },
    editList(indexSelectedItem, selectedItem) {
      setIsEditListPopupOpen(true);
      setIsSelectedListItem({index: indexSelectedItem, ...selectedItem});
    },
    info(selectedItem) {
      setIsInfoPopupOpen(true);
      setIsSelectedListItem(selectedItem);
    }
  }

  // Закрытие попапа
  const closePopup = {
    allPopupToBtnClick() {
      setIsAddListPopupOpen(false);
      setIsEditListPopupOpen(false);
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
          isDataToDoList={isDataToDoList}
          toggleMarkExecute={list.toggleMarkExecute.bind(list)}
          removeItem={list.removeItem.bind(list)}
          openEditPopup={openPopup.editList}
          openInfoPopup={openPopup.info}
        />
      </main>
      <AddListPopup
        isOpen={isAddListPopupOpen}
        onClose={closePopup}
        addListItem={list.addItem.bind(list)}
      />
      <EditListPopup
        isOpen={isEditListPopupOpen}
        onClose={closePopup}
        editListItem={list.editItem.bind(list)}
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
