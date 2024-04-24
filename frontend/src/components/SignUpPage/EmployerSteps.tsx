import { Button, Group, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Employer from "../../types/Employer";
import { registerNewEmployer } from "../../api/newEmployerRequestApi";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

interface EmployerProps {
  employer: Employer;
  setEmployer: any;
  setCurrentStep: any;
}

const STARTS_WITH_ALPHABET_REGEX = /^[a-zA-Z]/;
const LENGTH_REGEX = /^.{8,}$/;
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const EmployerStep1: React.FC<EmployerProps> = ({
  employer,
  setEmployer,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (employer.companyName && employer.username && !usernameError) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [employer, usernameError]);

  useEffect(() => {
    if (employer.username) {
      if (!STARTS_WITH_ALPHABET_REGEX.test(employer.username)) {
        setUsernameError("Username must start with an alphabet character");
      } else if (!LENGTH_REGEX.test(employer.username)) {
        setUsernameError("Username must be at least 8 characters long");
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [employer.username]);

  return (
    <>
      <TextInput
        label="Company Name"
        placeholder="Enter company name"
        value={employer.companyName}
        onChange={(delta) => {
          setEmployer({ ...employer, companyName: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="Username"
        placeholder="Enter username"
        value={employer.username}
        onChange={(delta) => {
          setEmployer({ ...employer, username: delta.target.value });
        }}
        required
        error={usernameError}
      />

      <Group grow justify="center">
        <Button
          mt="xl"
          onClick={() => {
            setCurrentStep(0);
          }}
        >
          Back
        </Button>

        <Button
          mt="xl"
          disabled={disableNext}
          onClick={() => {
            setCurrentStep(2);
          }}
        >
          Next
        </Button>
      </Group>
    </>
  );
};

export const EmployerStep2: React.FC<EmployerProps> = ({
  employer,
  setEmployer,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (
      employer.address &&
      employer.city &&
      employer.state &&
      employer.zipCode
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [employer]);

  return (
    <>
      <TextInput
        label="Address Line"
        placeholder="Enter address line"
        value={employer.address}
        onChange={(delta) => {
          setEmployer({ ...employer, address: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="City"
        placeholder="Enter city"
        value={employer.city}
        onChange={(delta) => {
          setEmployer({ ...employer, city: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="State"
        placeholder="Enter state"
        value={employer.state}
        onChange={(delta) => {
          setEmployer({ ...employer, state: delta.target.value });
        }}
        required
      />

      <TextInput
      type="number"
        mt="md"
        label="Zip Code"
        placeholder="Enter zip code"
        value={employer.zipCode}
        onChange={(delta) => {
          setEmployer({ ...employer, zipCode: delta.target.value });
        }}
        required
      />

      <Group grow justify="center">
        <Button
          mt="xl"
          onClick={() => {
            setCurrentStep(1);
          }}
        >
          Back
        </Button>

        <Button
          mt="xl"
          disabled={disableNext}
          onClick={() => {
            setCurrentStep(3);
          }}
        >
          Next
        </Button>
      </Group>
    </>
  );
};

export const EmployerStep3: React.FC<EmployerProps> = ({
  employer,
  setEmployer,
  setCurrentStep,
}) => {
  const navigate = useNavigate();

  const [disableSignUp, setDisableSignUp] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (
      employer.contactFirstName &&
      employer.contactLastName &&
      employer.contactPhoneNumber &&
      employer.contactEmail &&
      !phoneError &&
      !emailError
    ) {
      setDisableSignUp(false);
    } else {
      setDisableSignUp(true);
    }
  }, [employer, phoneError, emailError]);

  useEffect(() => {
    if (employer.contactEmail) {
      if (!EMAIL_REGEX.test(employer.contactEmail)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [employer.contactEmail]);

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

    if (employer.contactPhoneNumber.length === 14 || !employer.contactPhoneNumber) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [employer.contactPhoneNumber]);

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

    console.log("Formatted:", formattedString);

    return formattedString;
  };

  const setPhoneNumber = (input: string) => {
    setCursorPosition(inputRef.current.selectionStart);

    setEmployer({ ...employer, contactPhoneNumber: formatPhoneNumber(input) });
  };

  const signUp = () => {
    registerNewEmployer({
      username: employer.username,
      companyName: employer.companyName,
      addressLine: employer.address,
      city: employer.city,
      state: employer.state,
      zipCode: employer.zipCode,
      contactFirstName: employer.contactFirstName,
      contactLastName: employer.contactLastName,
      contactPhone: employer.contactPhoneNumber,
      contactEmail: employer.contactEmail
    }).then((response: any) => {
      if (response === "New Employer Requests registered successfully") {
        notifications.show({
          color: "green",
          title: "Success!",
          message: "New account request successful",
        });
        navigate("/signIn");
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: response,
        });
      }
    });
    console.log("Signing up!");
  };

  return (
    <>
      <TextInput
        label="Contact First Name"
        placeholder="Enter contact first name"
        value={employer.contactFirstName}
        onChange={(delta) => {
          setEmployer({ ...employer, contactFirstName: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="Contact Last Name"
        placeholder="Enter contact last name"
        value={employer.contactLastName}
        onChange={(delta) => {
          setEmployer({ ...employer, contactLastName: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="Contact Phone Number"
        placeholder="Enter contact phone number"
        value={employer.contactPhoneNumber}
        onChange={(delta) => {
          if (delta.target.selectionStart) {
            setCursorPosition(delta.target.selectionStart);
          }
          setPhoneNumber(delta.target.value);
        }}
        required
        error={phoneError}
        ref={inputRef}
      />

      <TextInput
        mt="md"
        label="Contact Email"
        placeholder="Enter contact email"
        value={employer.contactEmail}
        onChange={(delta) => {
          setEmployer({
            ...employer,
            contactEmail: delta.target.value,
          });
        }}
        required
        error={emailError}
      />

      <Group grow justify="center">
        <Button
          mt="xl"
          onClick={() => {
            setCurrentStep(2);
          }}
        >
          Back
        </Button>

        <Button
          fullWidth
          mt="xl"
          disabled={disableSignUp}
          onClick={() => {
            signUp();
          }}
        >
          Sign up
        </Button>
      </Group>
    </>
  );
};
