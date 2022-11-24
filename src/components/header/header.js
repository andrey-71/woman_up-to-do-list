import React from 'react';
import './header.less';

function Header() {

  return (
    <header className='header page__header'>
      <h1 className='header__title'>ToDo List</h1>
    </header>
  );
}

export default React.memo(Header);