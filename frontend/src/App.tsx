import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { CustomNavbar } from './components/CustomNavbar';
import User from './types/User';
import { AccountRequestsPage } from './pages/AccountRequestsPage';

interface UserContextProps { //TODO might need to move this to its own file
  currentUser: string | undefined;
  setCurrentUser: (user: string | undefined) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

function App() {
  const [ currentUser, setCurrentUser ] = useState<string | undefined>(undefined);
  //const _setCurrentUser = (user: string | undefined) => setCurrentUser(user);

  //TODO probably will update this in the future
  //the following useEffects allow for user persistence (so if the page is reloaded, you aren't logged out)
  useEffect(() => { 
    const temp: string | null = window.localStorage.getItem('CURRENT_USER');
    if (temp !== 'undefined' && temp !== null) setCurrentUser(JSON.parse(temp));
  }, []);

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem('CURRENT_USER');
    }
    
  }, [currentUser]);

  // if (!currentUser) {
  //   return (
  //     <>
  //       <Router>
  //         <CustomNavbar/>
  
  //         <Routes>
  //           <Route path='/' element={ <LandingPage/> } />
  //           <Route path='/signIn' element={ <SignInPage/> } />
  //           <Route path='/signUp' element={ <SignUpPage/> } />
  //         </Routes>
  //       </Router>
  //     </>
  //   );
  // }

  return (
    <>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <Router>
          <CustomNavbar/>
  
          <Routes>
            <Route path='/' element={ <LandingPage/> } />
            <Route path='/signIn' element={ <SignInPage/> } />
            <Route path='/signUp' element={ <SignUpPage/> } />
            <Route path='/accountRequests' element={ <AccountRequestsPage/> } />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
