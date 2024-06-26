import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { CustomHeader } from "./components/CustomHeader";
import { ProfilePage } from "./pages/ProfilePage";
import { JobPostingPage } from "./pages/JobPostingPage";
import { ViewPostedJobsPage } from "./pages/ViewPostedJobsPage";
import { ViewAccountsPage } from "./pages/ViewAccountsPage";
import { AddStaffAccountPage } from "./pages/AddStaffAccountPage";
import { ViewAccountRequestsPage } from "./pages/ViewAccountRequestsPage";
import { JobPage } from "./pages/JobPage";
import { UpdatePasswordPage } from "./pages/UpdatePasswordPage";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { _404Page } from "./pages/_404Page";

interface UserContextProps {
  //TODO might need to move this to its own file
  currentUser: string | undefined;
  userType: string | undefined;

  setCurrentUser: (user: string | undefined) => void;
  setUserType: (userType: string | undefined) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

function App() {
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [opened, { toggle }] = useDisclosure();

  //the following useEffects allow for user persistence (so if the page is reloaded, you aren't logged out)
  useEffect(() => {
    let temp: string | null = window.localStorage.getItem("CURRENT_USER");
    if (temp !== "undefined" && temp !== null) setCurrentUser(JSON.parse(temp));

    temp = window.localStorage.getItem("USER_TYPE");
    if (temp !== "undefined" && temp !== null) setUserType(JSON.parse(temp));
  }, []);

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
    } else {
      window.localStorage.removeItem("CURRENT_USER");
    }
  }, [currentUser]);

  useEffect(() => {
    if (userType) {
      window.localStorage.setItem("USER_TYPE", JSON.stringify(userType));
    } else {
      window.localStorage.removeItem("USER_TYPE");
    }
  }, [userType]);

  return (
    <>
      <UserContext.Provider value={{ currentUser, userType, setCurrentUser, setUserType }}>
        <Router>
          <AppShell
            header={{ height: 100 }}
            padding="md"
          >
            <AppShell.Header>
              <CustomHeader />
            </AppShell.Header>
            <AppShell.Main>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                {!currentUser && (
                  <>
                    <Route path="/signIn" element={<SignInPage />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                  </>
                )}

                {currentUser && (
                  <><Route path="/profile/:username" element={<ProfilePage />} /></>
                )}
                
                <Route path="/job-posting" element={<JobPostingPage />} />
                <Route path="/job-search" element={<ViewPostedJobsPage />} />
                <Route path="/account-search" element={<ViewAccountsPage />} />
                <Route path="/add-staff" element={<AddStaffAccountPage />} />
                <Route
                  path="/account-requests"
                  element={<ViewAccountRequestsPage />}
                />
                <Route path="/job/:employerId/:jobId" element={<JobPage />} />
                <Route
                  path="/update-password"
                  element={<UpdatePasswordPage />}
                />

                <Route path="*" element={<_404Page/>}/>
              </Routes>
            </AppShell.Main>
          </AppShell>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
