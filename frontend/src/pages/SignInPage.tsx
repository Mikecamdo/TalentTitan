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
  username: "",
  password: "",
};

export const SignInPage = () => {

  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [values, setValues] = useState(formValues);

  useEffect(() => {
    if (values.username && values.password) {
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

  const login = () => {
    setCurrentUser(values.username);
    if (values.username === "root") {
      navigate("/add-staff");
    } else {
      navigate("/update-password");
    }
  };

  return (
    <Container size={500} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account?{' '}
        <Anchor size="sm" component="button">
          <Link to="/signUp">Sign up</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username"
                   placeholder="Enter username"
                   value={values.username}
                   onChange={(delta) => {
                    setValues({ ...values, username: delta.target.value });
                   }}
        />

        <TextInput type="password"
                   mt="md"
                   label="Password"
                   placeholder="Enter password"
                   value={values.password}
                   onChange={(delta) => {
                    setValues({ ...values, password: delta.target.value });
                   }}
        />

        <Button fullWidth 
                mt="xl"
                disabled={disableButton}
                onClick={() => {
                  login();
                }}
                >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
