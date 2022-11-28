import React, { useState, useEffect } from 'react';
import Popup from '../popup/popup';

function EditPopup({ isOpen, onClose, editListItem, selectedListItem }) {

  // Инпуты
  const [isTitleInput, setIsTitleInput] = useState('');
  const [isDescriptionInput, setIsDescriptionInput] = useState('');
  const [isDateCompleteInput, setIsDateCompleteInput] = useState('');
  // Загруженные файлы
  const [isFiles, setIsFiles] = useState([]);
  // Поле для перетаскивания файлов
  const [isDrag, setIsDrag] = useState(false);

  /** Запись/очистка инпутов при открытии/закрытии попапа */
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

  /**
   * Обработчики изменения инпутов
   * @param {Object} evt - объект события инпута.
   * @param {string} evt.target.value - значение из инпута.
   * @param {Object[]} evt.target.files - список прикрепленных файлов.
   */
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
  }

  /** Загрузка файлов */
  const dragFile = {
    /**
     * Обработчик загрузки файлов (добавляемые перетаскиванием)
     * @param {Object} evt - объект события перетаскивания.
     * @param {Object[]} evt.dataTransfer.files - список прикрепленных файлов.
     */
    dropHandler(evt) {
      evt.preventDefault();
      setIsFiles([...evt.dataTransfer.files]);
      setIsDrag(false);
    },
    /**
     * Обработчик загрузки файлов при перетаскивании в область
     * @param {Object} evt - объект события перетаскивания.
     */
    startHandler(evt) {
      evt.preventDefault();
      setIsDrag(true);
    },
    /**
     * Обработчик загрузки файлов при уходе из области перетаскивания
     * @param {Object} evt - объект события перетаскивания.
     */
    leaveHandler(evt) {
      evt.preventDefault();
      setIsDrag(false);
    }
  }

  /**
   * Сабмит формы и закрытие попапа
   * @param {Object} evt - объект события перетаскивания.
   */
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
    isOpen &&
      <Popup
        name='edit-popup'
        title='Изменение информации'
        submitButtonText='Сохранить'
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

export default React.memo(EditPopup);