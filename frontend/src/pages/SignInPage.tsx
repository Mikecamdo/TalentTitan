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
} from "@mantine/core";
import classes from "../css_modules/SignInPage.module.css";

const formValues = {
  username: "",
  password: "",
};

const STARTS_WITH_ALPHABET_REGEX = /^[a-zA-Z]/;
const LENGTH_REGEX = /^.{8,}$/;

const ALPHABET_REGEX = /[a-zA-Z]/;
const NUMERIC_REGEX = /\d/;
const SPECIAL_REGEX = /[!@#$%^&*()_+]/;

export const SignInPage = () => {
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [values, setValues] = useState(formValues);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (
      values.username &&
      values.password &&
      !usernameError &&
      !passwordError
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [values, usernameError, passwordError]);

  useEffect(() => {
    if (values.username) {
      if (
        (!STARTS_WITH_ALPHABET_REGEX.test(values.username) ||
          !LENGTH_REGEX.test(values.username)) &&
        values.username !== "root" &&
        values.username !== "Staff"
      ) {
        setUsernameError("Invalid username");
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [values.username]);

  useEffect(() => {
    if (values.password) {
      if (
        !ALPHABET_REGEX.test(values.password) ||
        !NUMERIC_REGEX.test(values.password) ||
        !SPECIAL_REGEX.test(values.password) ||
        !LENGTH_REGEX.test(values.password)
      ) {
        setPasswordError("Invalid password");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [values.password]);

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
        Don't have an account?{" "}
        <Anchor size="sm" component="button">
          <Link to="/signUp">Sign up</Link>
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="Enter username"
          value={values.username}
          onChange={(delta) => {
            setValues({ ...values, username: delta.target.value });
          }}
          error={usernameError}
        />

        <TextInput
          type="password"
          mt="md"
          label="Password"
          placeholder="Enter password"
          value={values.password}
          onChange={(delta) => {
            setValues({ ...values, password: delta.target.value });
          }}
          error={passwordError}
        />

        <Button
          fullWidth
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
};
