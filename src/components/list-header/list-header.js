import React from 'react';
import './list-header.less';

function ListHeader() {

  return (
    <section className='list-header list__list-header'>
      <ul className='list-header__info'>
        <li className='list-header__data-element list-header__data-element_type_index'>№</li>
        <li className='list-header__data-element list-header__data-element_type_title'>Название</li>
        <li className='list-header__data-element list-header__data-element_type_description'>Описание</li>
        <li className='list-header__data-element list-header__data-element_type_date-complete'>Дата завершения</li>
        <li className='list-header__data-element list-header__data-element_type_files'>Прикрепленные файлы</li>
      </ul>

    </section>
  );
}

export default React.memo(ListHeader);