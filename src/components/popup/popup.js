import React from 'react';
import './popup.less';

function Popup({ name, title, submitButtonText, isOpen, onSubmit, onClose, children }) {

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
          {children}
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