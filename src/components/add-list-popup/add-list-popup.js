import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Popup from '../popup/popup';
import FileLoader from '../file-loader/file-loader';

function AddListPopup({isOpen, onClose, addListItem}) {
  // Инпуты
  const [isTitleInput, setIsTitleInput] = useState('');
  const [isDescriptionInput, setIsDescriptionInput] = useState('');
  const [isDateCompleteInput, setIsDateCompleteInput] = useState('');
  // Загруженные файлы
  const [isFiles, setIsFiles] = useState([]);
  // Поле для перетаскивания файлов
  const [isDrag, setIsDrag] = useState(false);

  // Очистка инпута при закрытии попапа
  useEffect(() => {
    if (!isOpen) {
      setIsTitleInput('');
      setIsDescriptionInput('');
      setIsDateCompleteInput('');
      setIsFiles([]);
    }
  }, [isOpen]);

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
    const listFileName = isFiles.map(file => {
      return { name: file.name };
    });

    addListItem(
      {
        title: isTitleInput,
        description: isDescriptionInput,
        dateComplete: isDateCompleteInput,
        files: listFileName.length > 0 ? listFileName : '',
      }
    );
    onClose.allPopupToBtnClick();
  }

  return (
    <Popup
      name='add-list'
      title='Новая задача'
      submitButtonText='Добавить'
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label className='popup__input-container'>
        Название*
        <input
          className='popup__input'
          name='add-list-input'
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
          name='add-list-description'
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
          name='add-list-date'
          type='date'
          min={dayjs().format('YYYY-MM-DD')}
          placeholder='Укажите сроки выполнения'
          required
          value={isDateCompleteInput}
          onChange={handleChangeInputDateComplete}
        />
      </label>
      <label className='popup__input-container'>
        Файлы
        <FileLoader
          name='add-list'
          isFiles={isFiles}
          isDrag={isDrag}
          onDrag={dragFile}
          onAddFiles={handleChangeInputFiles}
        />
      </label>

    </Popup>

  );
}

export default React.memo(AddListPopup);