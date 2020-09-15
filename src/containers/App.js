import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
