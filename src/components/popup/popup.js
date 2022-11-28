import React from 'react';
import './popup.less';
import dayjs from 'dayjs';
import FileLoader from '../file-loader/file-loader';

function Popup({
  name,
  title,
  submitButtonText,
  isTitleInput,
  isDescriptionInput,
  isDateCompleteInput,
  isFiles,
  isDrag,
  handleChangeInputTitle,
  handleChangeInputDescription,
  handleChangeInputDateComplete,
  handleChangeInputFiles,
  dragFile,
  isOpen,
  onSubmit,
  onClose,
}) {

  return (
    <div
      className={`popup ${isOpen && 'popup_active'}`}
      onMouseDown={onClose.overlayClick.bind(onClose)}
    >
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <p className='popup__subtitle'>* - обязательные поля</p>
        <form
          className='popup__form'
          name={`${name}-form`}
          onSubmit={onSubmit}
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

          <div className='popup__control'>
            <input
              className='popup__btn'
              type='submit'
              value={submitButtonText}
            />
            <input
              className='popup__btn'
              type='button'
              value='Отмена'
              onClick={onClose.allPopupToBtnClick}
            />
          </div>
        </form>
        <button
          className='popup__close'
          type='button'
          onClick={onClose.allPopupToBtnClick}
        />
      </div>
    </div>
  );
}

export default React.memo(Popup);