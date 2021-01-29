// to access WASM - Web Assembly which runs in browser to transpile & bundle our code
// WASM is going to transpile Go code in the browser as ES build is entirely written in Go Programming Language
import * as esbuild from 'esbuild-wasm';

import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // NOTE: useRef hook is normally use to access DOM elements but it can be also
  // use to keep a reference to any kind a 'javaScript values' inside of a component.
  const ref = useRef<any>(); // ref.current can refer to any type of variable
  console.log(ref);

  const [input, setInput] = useState('');

  // code state is going to be the Output from our ES build tool which is transpile & bundled code
  // that will be display in pre element.
  const [code, setCode] = useState('');

  // function to initialize ES build from file - esbuild.wasm in our public dir
  // esbuild.wasm is a compiled binary file
  const startService = async () => {
    // Service object is what we use to transpile & bundle in our code
    // NOTE: Now, after calling startService we can refer to 'ref.current' anywhere inside of our component
    // for doing transpiling & bundling
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  // initializing on the initial render
  useEffect(() => {
    startService();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Check to make sure that we never attempt to do any transpiling unless we are 100% sure
    // that we have already initialized our service.
    // If there is no ref.current or if the value is undefined or null - falsy
    if (!ref.current) {
      // This will handle a case when a user might start up our application &
      // instantly start clicking on the SUBMIT button.
      // If user click right away before our service is ready, will end up error message
      return;
    }

    // transform func will do ony the transpiling 
    // first arg is the code that we want to transpile
    // second arg is the 'options object' during the transpiling process
    const result = await ref.current.transform(input, {
      loader: 'jsx', // to tell es build what kind a code we are providing to it
      target: 'es2015'
    })

    // 'code' property contains transpile code
    setCode(result.code)

    setInput('');
  };

  return (
    <div>
      <h1>ES build Bundler</h1>

      <textarea
        value={input}
        onChange={handleChange}
        cols={60}
        rows={10}
      ></textarea>

      <div>
        <button onClick={handleClick}>Submit</button>
      </div>

      {/* 'pre' element is nicely format the code & make look like a code.  
          The <pre> tag defines preformatted text.
          The text will be displayed exactly as written in the HTML source code. */}
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
