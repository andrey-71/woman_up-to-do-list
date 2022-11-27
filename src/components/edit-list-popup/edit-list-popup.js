import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Popup from '../popup/popup';
import FileLoader from '../file-loader/file-loader';

function EditListPopup({ isOpen, onClose, editListItem, selectedListItem }) {

  // Инпуты
  const [isTitleInput, setIsTitleInput] = useState('');
  const [isDescriptionInput, setIsDescriptionInput] = useState('');
  const [isDateCompleteInput, setIsDateCompleteInput] = useState('');
  // Загруженные файлы
  const [isFiles, setIsFiles] = useState([]);
  // Поле для перетаскивания файлов
  const [isDrag, setIsDrag] = useState(false);

// Обработчик изменения инпутов
  function handleChangeInputTitle(evt) {
    setIsTitleInput(evt.target.value);
  }
  function handleChangeInputDescription(evt) {
    setIsDescriptionInput(evt.target.value);
  }
  function handleChangeInputDateComplete(evt) {
    setIsDateCompleteInput(evt.target.value);
  }
  function handleChangeInputFiles(evt) {
    setIsFiles([...evt.target.files]);
    console.log(evt.target.files);
  }

  // Очистка инпута при закрытии попапа
  useEffect(() => {
    if (isOpen) {
      setIsTitleInput(selectedListItem.title);
      setIsDescriptionInput(selectedListItem.description);
      setIsDateCompleteInput(selectedListItem.dateComplete);
      setIsFiles(selectedListItem.files);
    } else {
      setIsTitleInput('');
      setIsDescriptionInput('');
      setIsDateCompleteInput('');
      setIsFiles([]);
    }
  }, [isOpen]);

  // Обработчик загрузки файлов (добавляемые перетаскиванием)
  const dragFile = {
    dropHandler(evt) {
      evt.preventDefault();
      setIsFiles([...evt.dataTransfer.files]);
      setIsDrag(false);
    },
    startHandler(evt) {
      evt.preventDefault();
      setIsDrag(true);
    },
    leaveHandler(evt) {
      evt.preventDefault();
      setIsDrag(false);
    }
  }
  console.log(isFiles);
  // Сабмит формы
  function handleSubmit(evt) {
    evt.preventDefault();
    // Список файлов
    const listFileName = isFiles?.map(file => {
      return { name: file.name };
    })

    editListItem({
      id: selectedListItem.id,
      completed: selectedListItem.completed,
      title: isTitleInput,
      description: isDescriptionInput,
      dateComplete: isDateCompleteInput,
      files: listFileName.length > 0 ? listFileName : ''
    });
    onClose.allPopupToBtnClick();
  }

  return (
    <Popup
      name='edit-list'
      title='Изменение информации'
      submitButtonText='Сохранить'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className='popup__input-container'>
        Название*
        <input
          className='popup__input'
          name='edit-list-input'
          type='text'
          placeholder='Введите название'
          value={isTitleInput}
          required
          maxLength='40'
          onChange={handleChangeInputTitle}
        />
      </label>
      <label className='popup__input-container'>
        Описание
        <textarea
          className='popup__input popup__input_type_description'
          name='edit-list-description'
          placeholder='Опишите задачу'
          value={isDescriptionInput}
          maxLength='200'
          onChange={handleChangeInputDescription}
        ></textarea>
      </label>
      <label className='popup__input-container'>
        Дата выполнения*
        <input
          className='popup__input'
          name='edit-list-date'
          type='date'
          required
          min={dayjs().format('YYYY-MM-DD')}
          placeholder='Укажите сроки выполнения'
          value={isDateCompleteInput}
          onChange={handleChangeInputDateComplete}
        />
      </label>
      <label className='popup__input-container' htmlFor='input_file'>
        Файлы
        <FileLoader
          name='edit-list'
          isFiles={isFiles}
          isDrag={isDrag}
          onDrag={dragFile}
          onAddFiles={handleChangeInputFiles}
        />
      </label>
    </Popup>

  );
}

export default React.memo(EditListPopup);