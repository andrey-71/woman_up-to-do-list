import React from 'react';
import './list.less';
import ListHeader from '../list-header/list-header';
import ListItem from '../list-item/list-item';

function List() {

  return (
    <section className='list page__list'>
      <ListHeader />
      <ListItem
        index='1.'
        item={{
          title: 'Название',
          description: 'Описание',
          dateComplete: '31.12.2022',
          files: '-',
          completed: true
        }}
      />

      <h2 className='list__description'>
        Ваш список дел пока пуст. Добавьте первую запись.
      </h2>

    </section>
  );
}

export default React.memo(List);