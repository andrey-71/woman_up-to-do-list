import React, { useState, useEffect } from 'react';
import Popup from '../popup/popup';

function AddPopup({isOpen, onClose, addListItem}) {
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
    isOpen &&
      <Popup
        name='add-popup'
        title='Новая задача'
        submitButtonText='Добавить'
        isTitleInput={isTitleInput}
        isDescriptionInput={isDescriptionInput}
        isDateCompleteInput={isDateCompleteInput}
        isFiles={isFiles}
        isDrag={isDrag}
        handleChangeInputTitle={handleChangeInputTitle}
        handleChangeInputDescription={handleChangeInputDescription}
        handleChangeInputDateComplete={handleChangeInputDateComplete}
        handleChangeInputFiles={handleChangeInputFiles}
        dragFile={dragFile}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={onClose}
      ></Popup>
  );
}

export default React.memo(AddPopup);