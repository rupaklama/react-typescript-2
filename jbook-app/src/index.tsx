import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';

// additional package require for react-redux to work with typescript: npm i --save-dev @types/react-redux
// type definition file
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
