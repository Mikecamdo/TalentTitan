import { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import {
  TextInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import Staff from "../types/Staff";
import classes from "../css_modules/AddStaffAccountPage.module.css";
import { attemptRegister } from "../api/staffApi";
import { notifications } from "@mantine/notifications";

const STARTS_WITH_ALPHABET_REGEX = /^[a-zA-Z]/;
const LENGTH_REGEX = /^.{8,}$/;
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const AddStaffAccountPage = () => {
  const [disableButton, setDisableButton] = useState(true);
  const [newStaff, setNewStaff] = useState<Staff>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    username: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (
      newStaff.firstName &&
      newStaff.lastName &&
      newStaff.phoneNumber &&
      newStaff.email &&
      newStaff.username &&
      !phoneError &&
      !emailError &&
      !usernameError
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [newStaff, phoneError, emailError, usernameError]);

  useEffect(() => {
    if (newStaff.email) {
      if (!EMAIL_REGEX.test(newStaff.email)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [newStaff.email]);

  useEffect(() => {
    if (inputRef.current) {
      if (cursorPosition === 1) {
        inputRef.current.setSelectionRange(2, 2);
      } else if (cursorPosition === 5) {
        inputRef.current.setSelectionRange(7, 7);
      } else if (cursorPosition === 6) {
        inputRef.current.setSelectionRange(4, 4);
      } else if (cursorPosition === 10) {
        inputRef.current.setSelectionRange(11, 11);
      } else {
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }

    if (newStaff.phoneNumber.length === 14 || !newStaff.phoneNumber) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [newStaff.phoneNumber]);

  useEffect(() => {
    if (newStaff.username) {
      if (!STARTS_WITH_ALPHABET_REGEX.test(newStaff.username)) {
        setUsernameError("Username must start with an alphabet character");
      } else if (!LENGTH_REGEX.test(newStaff.username)) {
        setUsernameError("Username must be at least 8 characters long");
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [newStaff.username]);

  const formatPhoneNumber = (textInput: string) => {
    // Regular expression to match digits
    const regex = /\d+/g;

    // Use match() to extract numbers from the string
    const numbersArray = textInput.match(regex);

    // Join the extracted numbers into a single string
    const numbersString = numbersArray ? numbersArray.join("") : "";

    let formattedString = "";

    if (!numbersString) {
      // return empty string
      return formattedString;
    }

    if (numbersString.length <= 3) {
      formattedString = "(" + numbersString + ")";
    } else if (numbersString.length <= 6) {
      formattedString =
        "(" + numbersString.slice(0, 3) + ") " + numbersString.slice(3);
    } else {
      formattedString =
        "(" +
        numbersString.slice(0, 3) +
        ") " +
        numbersString.slice(3, 6) +
        "-" +
        numbersString.slice(6, 10);
    }

    return formattedString;
  };

  const setPhoneNumber = (input: string) => {
    setCursorPosition(inputRef.current.selectionStart);

    setNewStaff({ ...newStaff, phoneNumber: formatPhoneNumber(input) });
  };

  const userContext = useContext(UserContext);
  const setCurrentUser = userContext?.setCurrentUser;

  if (!setCurrentUser) {
    return <div>Loading...</div>;
  }

  const addNewStaffAccount = () => {
    attemptRegister(newStaff).then((response: any) => {
      if (response === "Staff member registered successfully") {
        notifications.show({
          color: 'green',
          title: 'Success!',
          message: response,
        });
        
        setNewStaff({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          username: "",
        });
      } else {
        notifications.show({
          color: 'red',
          title: 'Error!',
          message: response,
        });
      }
    });

    
  };

  return (
    <Container size={500} my={20}>
      <Title ta="center" className={classes.title}>
        Add a Staff Account
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="First Name"
          placeholder="Enter first name"
          value={newStaff.firstName}
          onChange={(delta) => {
            setNewStaff({ ...newStaff, firstName: delta.target.value });
          }}
          required
        />

        <TextInput
          label="Last Name"
          placeholder="Enter last name"
          value={newStaff.lastName}
          onChange={(delta) => {
            setNewStaff({ ...newStaff, lastName: delta.target.value });
          }}
          required
        />

        <TextInput
          label="Username"
          placeholder="Enter username"
          value={newStaff.username}
          onChange={(delta) => {
            setNewStaff({ ...newStaff, username: delta.target.value });
          }}
          required
          error={usernameError}
        />

        <TextInput
          label="Phone Number"
          placeholder="Enter phone number"
          value={newStaff.phoneNumber}
          onChange={(delta) => {
            if (delta.target.selectionStart) {
              setCursorPosition(delta.target.selectionStart);
            }
            setPhoneNumber(delta.target.value);
          }}
          required
          ref={inputRef}
          error={phoneError}
        />

        <TextInput
          label="Email"
          placeholder="Enter email"
          value={newStaff.email}
          onChange={(delta) => {
            setNewStaff({ ...newStaff, email: delta.target.value });
          }}
          required
          error={emailError}
        />

        <Button
          fullWidth
          mt="xl"
          disabled={disableButton}
          onClick={() => {
            addNewStaffAccount();
          }}
        >
          Add Account
        </Button>
      </Paper>
    </Container>
  );
};