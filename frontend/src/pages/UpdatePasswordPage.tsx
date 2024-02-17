import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';
import classes from '../css_modules/SignInPage.module.css';

const formValues = {
  newPassword: "",
  confirmPassword: "",
};

export const UpdatePasswordPage = () => {

  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [values, setValues] = useState(formValues);

  useEffect(() => {
    if (values.newPassword && values.confirmPassword) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [values]);

  const userContext = useContext(UserContext);
  const setCurrentUser = userContext?.setCurrentUser;

  if (!setCurrentUser) {
    return <div>Loading...</div>;
  }

  const updatePassword = () => {
    // Call backend and update password
    navigate("/job-search");
  };

  return (
    <Container size={500} my={40}>
      <Title ta="center" className={classes.title}>
        You need to update your password!
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Since this is your first time logging in, we ask that you reset your password for security purposes
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput required
                   type="password"
                   label="New Password"
                   placeholder="Enter new password"
                   value={values.newPassword}
                   onChange={(delta) => {
                    setValues({ ...values, newPassword: delta.target.value });
                   }}
        />

        <TextInput required
                   type="password"
                   mt="md"
                   label="Confirm Password"
                   placeholder="Confirm new password"
                   value={values.confirmPassword}
                   onChange={(delta) => {
                    setValues({ ...values, confirmPassword: delta.target.value });
                   }}
        />

        <Button fullWidth 
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
}
