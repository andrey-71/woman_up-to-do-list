import React from 'react';
import './app.less';
import Header from '../header/header';
import List from '../list/list';
import Control from '../control/control';
import AddListPopup from '../add-list-popup/add-list-popup';
import EditListPopup from '../edit-list-popup/edit-list-popup';
import InfoPopup from '../info-popup/info-popup';

function App() {

  return (
    <div className='page'>
      <Header />
      <main>
        <Control />
        <List />
      </main>
      <AddListPopup />
      <EditListPopup />
      <InfoPopup />
    </div>
  );
}

export default App;
