import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import classes from "../css_modules/SignInPage.module.css";
import { updatePassword as updateThePassword } from "../api/userApi";
import { notifications } from "@mantine/notifications";

const ALPHABET_REGEX = /[a-zA-Z]/;
const NUMERIC_REGEX = /\d/;
const SPECIAL_REGEX = /[!@#$%^&*()_+?]/;
const LENGTH_REGEX = /^.{8,}$/;

export const UpdatePasswordPage = () => {
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const location = useLocation();

  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    setOldPassword(location.state.oldPassword);
  }, [location]);

  useEffect(() => {
    if (!newPassword || !confirmPassword) {
      setDisableButton(true);
    } else if (newPasswordError || confirmPasswordError) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [newPasswordError, confirmPasswordError]);

  useEffect(() => {
    if (newPassword) {
      if (!ALPHABET_REGEX.test(newPassword)) {
        setNewPasswordError("Password must contain an alphabet character");
      } else if (!NUMERIC_REGEX.test(newPassword)) {
        setNewPasswordError("Password must contain a numeric character");
      } else if (!SPECIAL_REGEX.test(newPassword)) {
        setNewPasswordError("Password must contain a special character");
      } else if (!LENGTH_REGEX.test(newPassword)) {
        setNewPasswordError("Password must be at least 8 characters long");
      } else {
        setNewPasswordError("");
      }
    } else {
      setNewPasswordError("");
    }

    if (confirmPassword === newPassword || !confirmPassword) {
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("Passwords don't match");
    }
  }, [newPassword, confirmPassword]);

  const userContext = useContext(UserContext);

  const currentUser = userContext?.currentUser;
  const userType = userContext?.userType;

  const setCurrentUser = userContext?.setCurrentUser;
  const setUserType = userContext?.setUserType;

  if (!setCurrentUser) {
    return <div>Loading...</div>;
  }

  const updatePassword = () => {
    // TODO: Call backend and update password
    updateThePassword({
      username: currentUser,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }).then((response: any) => {
      if (response === "Updated password") {
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });

        if (userType === "staff") {
          navigate("/account-search");
        } else {
          navigate("/job-search");
        }
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: response,
        });
      }
    });
  };

  return (
    <Container size={500} my={40}>
      <Title ta="center" className={classes.title}>
        You need to update your password!
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Since this is your first time logging in, we ask that you reset your
        password for security purposes
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          required
          type="password"
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(delta) => {
            setNewPassword(delta.target.value);
          }}
          error={newPasswordError}
        />

        <TextInput
          required
          type="password"
          mt="md"
          label="Confirm Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(delta) => {
            setConfirmPassword(delta.target.value);
          }}
          error={confirmPasswordError}
        />

        <Button
          fullWidth
          mt="xl"
          disabled={disableButton}
          onClick={() => {
            updatePassword();
          }}
        >
          Update password
        </Button>
      </Paper>
    </Container>
  );
};
