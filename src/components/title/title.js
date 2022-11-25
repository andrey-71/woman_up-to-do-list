import React from 'react';
import './title.less';

function Title({ text }) {
  return (
    <h2 className='title'>{text}</h2>
  );
}

export default React.memo(Title);
