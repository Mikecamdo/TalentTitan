import { useRef } from "react";
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
import Staff from "../types/Staff";
import classes from "../css_modules/AddStaffAccountPage.module.css";
import { attemptRegister } from "../api/staffApi";

const STARTS_WITH_ALPHABET_REGEX = /^[a-zA-Z]/;
const LENGTH_REGEX = /^.{8,}$/;
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const AddStaffAccountPage = () => {
  const navigate = useNavigate();

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
    console.log("Adding new Staff Account");
    setNewStaff({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      username: "",
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
            attemptRegister(addNewStaffAccount());
            attemptRegister(newStaff);
          }}
        >
          Add Account
        </Button>
      </Paper>
    </Container>
  );
};

// import { useContext, useEffect } from "react";
// import { UserContext } from "../App";
// import { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/esm/Button";
// import Container from "react-bootstrap/esm/Container";
// import { useNavigate } from "react-router-dom";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

// export const AddStaffAccountPage = () => {
//     const userContext = useContext(UserContext);

//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [username, setUsername] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");
//     const [email, setEmail] = useState("");

//     const [disableButton, setDisableButton] = useState(true);

//     const addAccount = () => {
//         console.log("Adding account!");
//     }

//     useEffect(() => {
//         if (firstName && lastName && phoneNumber && email) {
//         setDisableButton(false);
//         } else {
//         setDisableButton(true);
//         }
//     }, [firstName, lastName, phoneNumber, email]);

//     return (
//         <>
//         <Container className="mt-3 mb-3">
//             <div className="card">
//             <div className="card-header py-3 button-bg text-light">
//                 <h1 className="fs-2 p-0 my-2 text-light" id="header">Add a New Staff Account</h1>
//             </div>
//             <div className="card-body">
//                 <Form>
//                 <Row className="mb-3">
//                     <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
//                     <Form.Group controlId="amount_requested">
//                         <Form.Label id="header">First Name</Form.Label>
//                         <Form.Control
//                         type="text"
//                         placeholder="Enter first name"
//                         value={firstName}
//                         onChange={(delta) => {
//                             setFirstName(delta.target.value);
//                         }}
//                         />
//                     </Form.Group>
//                     </Col>

//                     <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
//                     <Form.Group controlId="amount_requested">
//                         <Form.Label id="header">Last Name</Form.Label>
//                         <Form.Control
//                         type="text"
//                         placeholder="Enter last name"
//                         value={lastName}
//                         onChange={(delta) => {
//                             setLastName(delta.target.value);
//                         }}
//                         />
//                     </Form.Group>
//                     </Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
//                     <Form.Group controlId="amount_requested">
//                         <Form.Label id="header">Phone Number</Form.Label>
//                         <Form.Control
//                         type="text"
//                         placeholder="Enter phone number"
//                         value={phoneNumber}
//                         onChange={(delta) => {
//                             setPhoneNumber(delta.target.value);
//                         }}
//                         />
//                     </Form.Group>
//                     </Col>

//                     <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
//                     <Form.Group controlId="amount_requested">
//                         <Form.Label id="header">Email</Form.Label>
//                         <Form.Control
//                         type="text"
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={(delta) => {
//                             setEmail(delta.target.value);
//                         }}
//                         />
//                     </Form.Group>
//                     </Col>
//                 </Row>

//                 <Row className="mb-3">
//                     <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
//                     <Form.Group controlId="amount_requested">
//                         <Form.Label id="header">Username</Form.Label>
//                         <Form.Control
//                         type="text"
//                         placeholder="Enter username"
//                         value={username}
//                         onChange={(delta) => {
//                             setUsername(delta.target.value);
//                         }}
//                         />
//                     </Form.Group>
//                     </Col>
//                 </Row>
//                 </Form>

//                 <Button
//                 disabled={disableButton}
//                 type="button"
//                 onClick={() => {
//                     addAccount();
//                 }}
//                 >
//                 Add Account
//                 </Button>
//             </div>
//             </div>
//         </Container>
//         </>
//     );
// };
