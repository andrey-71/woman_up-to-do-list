import React from 'react';
import './list-item.less';

function ListItem( { index, item }) {

  return (
    <section className='list-item'>
      <ul className='list-item__info'>
        <li className='list-item__data-element list-item__data-element_type_index'>
          {index}
        </li>
        <li className='list-item__data-element list-item__data-element_type_title'>
          {item.title}
        </li>
        <li className='list-item__data-element list-item__data-element_type_description'>
          {item.description}
        </li>
        <li className='list-item__data-element list-item__data-element_type_date-complete'>
          {item.dateComplete}
        </li>
        <li className='list-item__data-element list-item__data-element_type_files'>
          {item.files}
        </li>
      </ul>
      <div className='list-item__control'>
        <button
          className={`list-item__btn list-item__btn_type_completed ${item.completed &&
          'list-item__btn_type_completed-active'}`}
          title='Отметить как выполненный'
        ></button>
        <button
          className='list-item__btn list-item__btn_type_edit'
          title='Редактировать'
        ></button>
        <button
          className='list-item__btn list-item__btn_type_delete'
          title='Удалить'
        ></button>
      </div>

    </section>
  );
}

export default React.memo(ListItem);