import React from 'react';
import './file-loader.less';

function FileLoader({ name, isFiles, isDrag, onDrag, onAddFiles }) {

  return (
    <div className='file-loader'>
      <div
        className={isDrag ? 'file-loader__drag-files file-loader__drag-files_drop-area' : 'file-loader__drag-files'}
        onDragStart = {evt => onDrag.startHandler(evt)}
        onDragLeave={evt => onDrag.leaveHandler(evt)}
        onDragOver={evt => onDrag.startHandler(evt)}
        onDrop={evt => onDrag.dropHandler(evt)}
      >
        <div className='file-loader__drag-icon'></div>
        <p className='file-loader__drag-text'>Перетащите файлы в эту область</p>
      </div>
      <div className='file-loader__load-files'>
        <input
          className='file-loader__input'
          name={`${name}-file`}
          type='file' id='input_file'
          onChange={evt => onAddFiles(evt)}
          multiple
        />
        <label className='file-loader__btn' htmlFor='input_file'>
          Загрузить файлы
        </label>
        {isFiles.map((file, index) =>
          <p key={index} className='file-loader__file-name' title={file.name}>{file.name}</p>
        )}
      </div>

    </div>
  );
}

export default React.memo(FileLoader);