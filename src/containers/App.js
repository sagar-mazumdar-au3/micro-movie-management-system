import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router } from "react-router-dom";
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container>
      <Router>
        <Main />
      </Router>
    </Container>
  );
}

export default App;
