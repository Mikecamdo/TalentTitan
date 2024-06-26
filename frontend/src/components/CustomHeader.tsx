import { Group, Box, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "../css_modules/CustomHeader.module.css";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export const CustomHeader = () => {
  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;
  const userType = userContext?.userType;

  const setCurrentUser = userContext?.setCurrentUser;
  const setUserType = userContext?.setUserType;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  if (!setCurrentUser || !setUserType) {
    return <div>Loading...</div>;
  }

  return (
    <Box mt="md">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to={"/"}>
            <Image src="/TalentTitanLogo.png" h={70} w="auto" fit="contain" />
          </Link>

          {userType === "professional" && (
            <>
              <Group h="100%">
                <Link to={"/job-search"} className={classes.link}>
                  View Posted Jobs
                </Link>
              </Group>
            </>
          )}

          {userType == "employer" && (
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

          {userType == "staff" && (
            <>
              <Group h="100%">
                <Link to={"/account-requests"} className={classes.link}>
                  View Account Requests
                </Link>

                <Link to={"/account-search"} className={classes.link}>
                  View Accounts
                </Link>

                {currentUser == "root" && (
                  <>
                    <Link to={"/add-staff"} className={classes.link}>
                      Add New Staff Account
                    </Link>
                  </>
                )}
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
                <Link to={`/profile/${currentUser}`} className={classes.link}>
                  {currentUser}
                </Link>
                /
                <Link
                  to={"/"}
                  className={classes.link}
                  onClick={() => {
                    setCurrentUser(undefined);
                    setUserType(undefined);
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
