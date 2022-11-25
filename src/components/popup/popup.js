import React from 'react';
import './popup.less';

function Popup({ title, submitButtonText, children }) {

  return (
    <div className='popup'>
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <form
          className='popup__form'
          name='add-list-form'
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
            />
          </div>
        </form>
        <button
          className='popup__close'
          type='button'
        />
      </div>
    </div>
  );
}

export default React.memo(Popup);