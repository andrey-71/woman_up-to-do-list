import React from 'react';
import './app.less';
import Header from '../header/header';
import List from '../list/list';
import Control from '../control/control';

function App() {

  return (
    <div className='page'>
      <Header />
      <main>
        <Control />
        <List />
        />
      </main>
    </div>
  );
}

export default App;
