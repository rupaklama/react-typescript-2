import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';

// parser for javascript code
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
  initialValue: string;
  // void function with argument - 'value' of type string
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  // Signature: function(getEditorValue: func, editor: object) => void
  // getValue is the func to get the current value from the editor, annotation - func returning string
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    // using ref to hold/reference values of monacoEditor
    // so that we can access the value anywhere inside of our component
    editorRef.current = monacoEditor;
    // console.log(monacoEditor);
    // Note: we can reference any values like objects, arrays, variables

    // when content in the editor is updated
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    // setting tab position to 2 spaces
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      // regular expression to add new line '\n' at the very end of string
      // & replace with empty string, meaning remove the new line
      // To leave the cursor where we left, not starting to new line
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        // This function will be called right after monaco editor will be mounted and ready to work
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme='dark'
        language='javascript'
        height='500px'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
