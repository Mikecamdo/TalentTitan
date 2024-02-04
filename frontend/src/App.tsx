import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <LandingPage/> } />
        <Route path='/signIn' element={ <SignInPage/> } />
        <Route path='/signUp' element={ <SignUpPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
