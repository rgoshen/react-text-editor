import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css';
import DOMPurify from 'dompurify';

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  console.log(convertedContent);

  return (
    <div className='App'>
      <header className='App-header'>Rich Text Editor</header>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
            'remove',
            'history',
          ],
        }}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'JavaScript', value: 'javascript', url: 'js' },
            { text: 'Golang', value: 'golang', url: 'go' },
          ],
        }}
      />
      <div
        className='preview'
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
}

function createMarkup(html) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

export default App;
