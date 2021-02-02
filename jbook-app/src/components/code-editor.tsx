import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  // void function with argument - 'value' of type string
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  // Signature: function(getEditorValue: func, editor: object) => void
  // getValue is the func to get the current value from the editor, annotation - func returning string
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    // when content in the editor is updated
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    // setting tab position to 2 spaces
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
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
  );
};

export default CodeEditor;
