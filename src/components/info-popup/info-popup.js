import React from 'react';
import './info-popup.less';
import dayjs from 'dayjs';

function InfoPopup({ isOpen, onClose, selectedListItem }) {
  console.log(selectedListItem);
  return (
    <div className={`info-popup ${isOpen && 'info-popup_active'}`}
         onMouseDown={onClose.overlayClick.bind(onClose)}

    >
      <div className='info-popup__container'>
        <h2 className='info-popup__title'>{selectedListItem.title}</h2>
        <h3 className='info-popup__subtitle'>Описание:</h3>
        <p className='info-popup__text'>{selectedListItem.description}</p>
        <p className='info-popup__text info-popup__text_type_date'>Дата завершения:&nbsp;
          <span className='info-popup__date info-popup__date_expired'>
            {selectedListItem.dateComplete &&
              dayjs(selectedListItem.dateComplete, 'YYYY-MM-DD').format('DD.MM.YYYY')
            }
          </span>
        </p>
        <div className='info-popup__file-container'>
          <p className='info-popup__text info-popup__text_type_file'>
            Приложенные файлы ({selectedListItem?.files?.length}):
          </p>
          <div className='info-popup__file-list'>
            {selectedListItem?.files?.length > 0 ?
              selectedListItem.files.map((file, index) =>
                <p key={index} className='info-popup__file' title={file.name}>{file.name}</p>
              )
              :
              <p className='info-popup__file'>Файлы отсутствуют</p>
            }
          </div>
        </div>
        <button
          className='info-popup__close'
          type='button'
          onClick={onClose.allPopupToBtnClick}
        />
      </div>
    </div>
  );
}

export default React.memo(InfoPopup);