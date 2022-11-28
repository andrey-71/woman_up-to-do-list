import React from 'react';
import './list-item.less';
import dayjs from 'dayjs';

function ListItem( { index, item, toggleMarkExecute, removeListItem, openEditPopup, openInfoPopup }) {

  const currentDate = dayjs().unix();
  const dateComplete = dayjs(item.dateComplete, 'YYYY-MM-DD').unix();
  const dateClassName = currentDate <= dateComplete ?
    'list-item__data-element list-item__data-element_type_date-complete'
    :
    'list-item__data-element list-item__data-element_type_date-complete list-item__data-element_type_date-complete-extended';

  return (
    <section className='list-item'>
      <ul className='list-item__info' onClick={() => openInfoPopup(item)}>
        <li className='list-item__data-element list-item__data-element_type_index'>
          {index+1.}
        </li>
        <li className='list-item__data-element list-item__data-element_type_title'>
          {item.title ? item.title : '-'}
        </li>
        <li className='list-item__data-element list-item__data-element_type_description'>
          {item.description ? item.description : '-'}
        </li>
        <li className={dateClassName}>
          {item.dateComplete ? dayjs(item.dateComplete, 'YYYY-MM-DD').format('DD.MM.YYYY') : '-'}
        </li>
        {item?.files?.length > 0 ?
          <li className='list-item__data-element list-item__data-element_type_files'>
            <span className='list-item__file'>{item.files[0].name}</span>
            {item.files.length > 1 &&
              <span className='list-item__file list-item__file_number'>И ещё {item.files.length - 1}</span>
            }
          </li>
          :
          <li className='list-item__data-element list-item__data-element_type_files'>-</li>
        }

      </ul>
      <div className='list-item__control'>
        <button
          className={`list-item__btn list-item__btn_type_completed ${item.completed &&
          'list-item__btn_type_completed-active'}`}
          title='Отметить как выполненный'
          onClick={() => toggleMarkExecute(item.id, !item.completed)}
        ></button>
        <button
          className='list-item__btn list-item__btn_type_edit'
          title='Редактировать'
          onClick={() => openEditPopup(item)}
        ></button>
        <button
          className='list-item__btn list-item__btn_type_delete'
          title='Удалить'
          onClick={() => removeListItem(item.id)}
        ></button>
      </div>

    </section>
  );
}

export default React.memo(ListItem);