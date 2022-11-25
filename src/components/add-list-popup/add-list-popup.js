import React from 'react';
import Popup from '../popup/popup';
import FileLoader from '../file-loader/file-loader';

function AddListPopup() {

  return (
    <Popup
      name='add-list'
      title='Новая задача'
      submitButtonText='Добавить'
    >
      <label className='popup__input-container'>
        Название
        <input
          className='popup__input'
          name='add-list-input'
          type='text'
          placeholder='Введите название'
          maxLength='40'
        />
      </label>
      <label className='popup__input-container'>
        Описание
        <textarea
          className='popup__input popup__input_type_description'
          name='add-list-description'
          placeholder='Опишите задачу'
          maxLength='200'
        ></textarea>
      </label>
      <label className='popup__input-container'>
        Дата выполнения
        <input
          className='popup__input'
          name='add-list-date'
          type='date'
          placeholder='Укажите сроки выполнения'
        />
      </label>
      <label className='popup__input-container'>
        Файлы
        <FileLoader />
      </label>

    </Popup>

  );
}

export default React.memo(AddListPopup);