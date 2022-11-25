import React from 'react';
import './info-popup.less';

function InfoPopup() {

  return (
    <div className='info-popup'>
      <div className='info-popup__container'>
        <h2 className='info-popup__title'></h2>
        <h3 className='info-popup__subtitle'>Описание:</h3>
        <p className='info-popup__text'></p>
        <p className='info-popup__text info-popup__text_type_date'>Дата завершения:&nbsp;
          <span className='info-popup__date info-popup__date_expired'></span>
        </p>
        <div className='info-popup__file-container'>
          <p className='info-popup__text info-popup__text_type_file'>
            Приложенные файлы:
          </p>
          <div className='info-popup__file-list'>
            <p className='info-popup__file'>Файлы отсутствуют</p>
          </div>
        </div>
        <button
          className='info-popup__close'
          type='button'
        />
      </div>
    </div>
  );
}

export default React.memo(InfoPopup);