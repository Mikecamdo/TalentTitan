import { Group, Box, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "../css_modules/CustomNavbar.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export const CustomNavbar = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;
    const setCurrentUser = userContext?.setCurrentUser;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);



  return (
    <Box pb={120} mt="md">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to={"/"}>
            <Image src="/TalentTitanLogo.png" h={70} w="auto" fit="contain" />
          </Link>

          {currentUser &&
            currentUser != "Employer" &&
            currentUser != "Staff" && (
              <>
                <Group h="100%">
                  <Link to={"/job-search"} className={classes.link}>
                                        View Posted Jobs
                  </Link>
                </Group>
              </>
            )}

          {currentUser == "Employer" && (
            <>
              <Group h="100%">
                <Link to={"/job-posting"} className={classes.link}>
                  Post New Job
                </Link>

                <Link to={"/job-search"} className={classes.link}>
                                        View Posted Jobs
                </Link>
              </Group>
            </>
          )}
                        
          {currentUser == "Staff" && (
            <>
              <Group h="100%">
                <Link to={"/account-requests"} className={classes.link}>
                                        View Account Requests
                </Link>

                <Link to={"/account-search"} className={classes.link}>
                                        View Accounts
                </Link>

                <Link to={"/add-staff"} className={classes.link}>
                                        Add New Staff Account
                </Link>
              </Group>
            </>
          )}
                    
          {!currentUser && (
            <Group>
              <Link to={"/signIn"} className={classes.link}>
                Sign In
              </Link>
              /
              <Link to={"/signUp"} className={classes.link}>
                Sign Up
              </Link>
            </Group>
          )}

          {currentUser && (
            <>
              <Group>
                <Link to={"/profile"} className={classes.link}>
                  {currentUser}
                </Link>
                            /
                <Link
                  to={"/"}
                  className={classes.link}
                  onClick={() => {
                    setCurrentUser(undefined);
                  }}
                >
                            Sign Out
                            </Link>
              </Group>
        </>
          )}
        </Group>
      </header>
    </Box>
    );
};
