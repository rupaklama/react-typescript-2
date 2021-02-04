import 'bulmaswatch/superhero/bulmaswatch.min.css';

import ReactDOM from 'react-dom';
import CodeCell from './components/code-shell';

const App = () => {
  return (
    <div>
      <CodeCell />
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
