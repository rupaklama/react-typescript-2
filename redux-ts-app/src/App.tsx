import React from 'react';

import './App.css';
import RepositoriesList from './components/RepositoriesList';

function App() {
  return (
    <div className="App">
      <h1>Search For a Package</h1>
      <RepositoriesList />
    </div>
  );
}

export default App;
