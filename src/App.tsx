import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Content from './components/Content/Content';
import {ContextProvider} from './components/context/Context'
import Header from './components/Header/Header';

function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="App">
          <Header></Header>
          <Content></Content>
        </div>
      </Router>
    </ContextProvider> 
  );
}

export default App;
