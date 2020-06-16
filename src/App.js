import React from 'react';

import './App.css';
import Header from './components/Header'
import EmployeeList from './containers/EmployeeList'

function App() {
  return (
    <div className="App">
      <Header/>
      <EmployeeList/>
    </div>
  );
}

export default App;
