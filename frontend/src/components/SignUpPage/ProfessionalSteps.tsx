import { Button, Group, Table, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import Qualification from "../../types/Qualification";
import Professional from "../../types/Professional";
import { registerNewProfessional } from "../../api/newProfessionalRequestApi";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { addQualifications } from "../../api/qualificationApi";

interface ProfessionalProps {
  professional: Professional;
  setProfessional: any;
  setCurrentStep: any;
}

const STARTS_WITH_ALPHABET_REGEX = /^[a-zA-Z]/;
const LENGTH_REGEX = /^.{8,}$/;
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const ProfessionalStep1: React.FC<ProfessionalProps> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (
      professional.firstName &&
      professional.lastName &&
      professional.phoneNumber &&
      professional.email &&
      !phoneError &&
      !emailError
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [professional, phoneError, emailError]);

  useEffect(() => {
    if (professional.email) {
      if (!EMAIL_REGEX.test(professional.email)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [professional.email]);

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

    if (professional.phoneNumber.length === 14 || !professional.phoneNumber) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [professional.phoneNumber]);

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

    setProfessional({ ...professional, phoneNumber: formatPhoneNumber(input) });
  };

  return (
    <>
      <TextInput
        label="First Name"
        placeholder="Enter first name"
        value={professional.firstName}
        onChange={(delta) => {
          setProfessional({ ...professional, firstName: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="Last Name"
        placeholder="Enter last name"
        value={professional.lastName}
        onChange={(delta) => {
          setProfessional({ ...professional, lastName: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="Phone"
        placeholder="Enter phone number"
        value={professional.phoneNumber}
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
        label="Email"
        placeholder="Enter email"
        value={professional.email}
        onChange={(delta) => {
          setProfessional({ ...professional, email: delta.target.value });
        }}
        required
        error={emailError}
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

export const ProfessionalStep2: React.FC<ProfessionalProps> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (
      professional.address &&
      professional.city &&
      professional.state &&
      professional.zipCode
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [professional]);

  return (
    <>
      <TextInput
        label="Address Line"
        placeholder="Enter address line"
        value={professional.address}
        onChange={(delta) => {
          setProfessional({ ...professional, address: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="City"
        placeholder="Enter city"
        value={professional.city}
        onChange={(delta) => {
          setProfessional({ ...professional, city: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="State"
        placeholder="Enter state"
        value={professional.state}
        onChange={(delta) => {
          setProfessional({ ...professional, state: delta.target.value });
        }}
        required
      />

      <TextInput
        type="number"
        mt="md"
        label="Zip Code"
        placeholder="Enter zip code"
        value={professional.zipCode}
        onChange={(delta) => {
          setProfessional({ ...professional, zipCode: delta.target.value });
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

export const ProfessionalStep3: React.FC<ProfessionalProps> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    if (
      professional.username &&
      professional.schoolName &&
      professional.degreeName &&
      professional.completionDate &&
      !usernameError
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [professional, usernameError]);

  useEffect(() => {
    if (professional.username) {
      if (!STARTS_WITH_ALPHABET_REGEX.test(professional.username)) {
        setUsernameError("Username must start with an alphabet character");
      } else if (!LENGTH_REGEX.test(professional.username)) {
        setUsernameError("Username must be at least 8 characters long");
      } else {
        setUsernameError("");
      }
    } else {
      setUsernameError("");
    }
  }, [professional.username]);

  return (
    <>
      <TextInput
        label="Username"
        placeholder="Enter username"
        value={professional.username}
        onChange={(delta) => {
          setProfessional({ ...professional, username: delta.target.value });
        }}
        required
        error={usernameError}
      />

      <TextInput
        mt="md"
        label="School Name"
        placeholder="Enter school name"
        value={professional.schoolName}
        onChange={(delta) => {
          setProfessional({ ...professional, schoolName: delta.target.value });
        }}
        required
      />

      <TextInput
        mt="md"
        label="Degree Name"
        placeholder="Enter degree name"
        value={professional.degreeName}
        onChange={(delta) => {
          setProfessional({ ...professional, degreeName: delta.target.value });
        }}
        required
      />

      <DateInput
        mt="md"
        label="Completion Date"
        placeholder="Enter completion date"
        value={professional.completionDate}
        onChange={(date) => {
          setProfessional({
            ...professional,
            completionDate: date,
          });
        }}
        required
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
          mt="xl"
          disabled={disableNext}
          onClick={() => {
            setCurrentStep(4);
          }}
        >
          Next
        </Button>
      </Group>
    </>
  );
};

export const ProfessionalStep4: React.FC<ProfessionalProps> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
  const navigate = useNavigate();

  const [disableAdd, setDisableAdd] = useState(true);
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");

  const rows = professional.qualifications.map(
    (qualification: Qualification) => (
      <Table.Tr>
        <Table.Td>{qualification.category}</Table.Td>
        <Table.Td>{qualification.keywords}</Table.Td>
      </Table.Tr>
    )
  );

  useEffect(() => {
    if (professional.qualifications.length > 1) {
      setDisableSignUp(false);
    } else {
      setDisableSignUp(true);
    }
  }, [professional]);

  useEffect(() => {
    if (category && keywords) {
      setDisableAdd(false);
    } else {
      setDisableAdd(true);
    }
  }, [category, keywords]);

  const signUp = () => {
    registerNewProfessional({
      username: professional.username,
      firstName: professional.firstName,
      lastName: professional.lastName,
      phone: professional.phoneNumber,
      email: professional.email,
      addressLine: professional.address,
      city: professional.city,
      state: professional.state,
      zipCode: professional.zipCode,
      schoolName: professional.schoolName,
      degreeName: professional.degreeName,
      completionDate: professional.completionDate,
    }).then((response: any) => {
      if (response === "New Professional Request registered successfully") {
        addQualifications({
          employerId: null,
          companyJobId: null,
          professionalUsername: professional.username,
          categories: professional.qualifications.map(
            (qualification) => qualification.category
          ),
          keywords: professional.qualifications.map(
            (qualification) => qualification.keywords
          ),
        }).then((response: any) => {
          if (response === "Successfully added qualifications") {
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
    <>
      <TextInput
        label="Category"
        placeholder="Enter category"
        value={category}
        onChange={(delta) => {
          setCategory(delta.target.value);
        }}
        required
      />

      <TextInput
        mt="md"
        label="Keyword(s)"
        placeholder="Enter keyword(s)"
        value={keywords}
        onChange={(delta) => {
          setKeywords(delta.target.value);
        }}
        required
      />

      <Button
        disabled={disableAdd}
        onClick={() => {
          setProfessional({
            ...professional,
            qualifications: [
              ...professional.qualifications,
              { category, keywords },
            ],
          });
          setCategory("");
          setKeywords("");
        }}
      >
        Add Qualification
      </Button>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Category</Table.Th>
            <Table.Th>Keywords/Key phrases</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Group grow justify="center">
        <Button
          mt="xl"
          onClick={() => {
            setCurrentStep(3);
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
