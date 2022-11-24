import React from 'react';
import './control.less';

function Control() {

  return (
    <section className='control page__control'>
      <div className='control__add'>
        <button className='control__add-btn'>
          <span className='control__add-icon'></span>
        </button>
        <p className='control__btn-text'>Добавить запись</p>
      </div>
    </section>
  );
}

export default React.memo(Control);