import React from 'react';
import './list.less';
import ListHeader from '../list-header/list-header';
import ListItem from '../list-item/list-item';

function List({ isToDoList, toggleMarkExecute, removeListItem, openEditPopup, openInfoPopup }) {

  return (
    <section className='list page__list'>
      <ListHeader />
      {isToDoList.length > 0 ?
        isToDoList.map( (listItem, index) =>
          <ListItem
            index={index}
            item={listItem}
            key={index}
            toggleMarkExecute={toggleMarkExecute}
            removeListItem={removeListItem}
            openEditPopup={openEditPopup}
            openInfoPopup={openInfoPopup}
          />
        )
      :
        <h2 className='list__description'>
          Ваш список дел пока пуст. Добавьте первую запись.
        </h2>
      }

    </section>
  );
}

export default React.memo(List);