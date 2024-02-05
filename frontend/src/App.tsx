import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { CustomNavbar } from './components/CustomNavbar';

function App() {
  return (
    <>
      <Router>
        <CustomNavbar/>

        <Routes>
          <Route path='/' element={ <LandingPage/> } />
          <Route path='/signIn' element={ <SignInPage/> } />
          <Route path='/signUp' element={ <SignUpPage/> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
