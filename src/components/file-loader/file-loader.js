import React from 'react';
import './file-loader.less';

function FileLoader() {

  return (
    <div className='file-loader'>
      <div className='file-loader__drag-files'>
        <div className='file-loader__drag-icon'></div>
        <p className='file-loader__drag-text'>Перетащите файлы в эту область</p>
      </div>
      <div className='file-loader__load-files'>
        <input
          className='file-loader__input'
          type='file' id='input_file'
          multiple
        />
        <label className='file-loader__btn' htmlFor='input_file'>
          Загрузить файлы
        </label>
        <p className='file-loader__file-name' title='Имя файла'>Имя файла</p>
      </div>

    </div>
  );
}

export default React.memo(FileLoader);