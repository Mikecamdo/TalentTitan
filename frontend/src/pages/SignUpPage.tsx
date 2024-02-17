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
  Stepper,
  Group,
  Table,
} from "@mantine/core";
import classes from "../css_modules/SignInPage.module.css";
import Qualification from "../types/Qualification";

const professionalValues = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  email: "",
  userName: "",
  schoolName: "",
  degreeName: "",
  completionDate: "",
  qualifications: [],
};

const employerValues = {
  companyName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  contactFirstName: "",
  contactLastName: "",
  contactPhoneNumber: "",
  contactEmail: "",
  userName: "",
};

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");
  const [professional, setProfessional] = useState(professionalValues);
  const [employer, setEmployer] = useState(employerValues);

  const [currentStep, setCurrentStep] = useState(0);

  const userContext = useContext(UserContext);
  const setCurrentUser = userContext?.setCurrentUser;

  if (!setCurrentUser) {
    return <div>Loading...</div>;
  }

  const signUp = () => {
    console.log("Signing up!");
  };

  return (
    <>
      <Container size={750} my={40}>
        <Title ta="center" className={classes.title}>
          Join us today!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component="button">
            <Link to="/signIn">Sign in</Link>
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {currentStep == 0 && (
            <Step0
              setAccountType={setAccountType}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 1 && (
            <ProfessionalStep1
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 2 && (
            <ProfessionalStep2
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 3 && (
            <ProfessionalStep3
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 4 && (
            <ProfessionalStep4
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Employer" && currentStep == 1 && (
            <EmployerStep1
              employer={employer}
              setEmployer={setEmployer}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Employer" && currentStep == 2 && (
            <EmployerStep2
              employer={employer}
              setEmployer={setEmployer}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Employer" && currentStep == 3 && (
            <EmployerStep3
              employer={employer}
              setEmployer={setEmployer}
              setCurrentStep={setCurrentStep}
            />
          )}
        </Paper>
      </Container>
    </>
  );
};

interface Step0Components {
  setAccountType: any;
  setCurrentStep: any;
}

const Step0: React.FC<Step0Components> = ({
  setAccountType,
  setCurrentStep,
}) => {
  return (
    <>
      <Title ta="center" className={classes.title} order={3}>
        Choose Account Type
      </Title>

      <Group grow justify="center">
        <Paper withBorder shadow="none" p={10} mt={15} radius="md" ta="center">
          <Title className={classes.title} order={4}>
            Professional
          </Title>

          <Text mt="sm">For those looking to get hired.</Text>

          <Button
            mt="sm"
            onClick={() => {
              setAccountType("Professional");
              setCurrentStep(1);
            }}
          >
            Sign up as Professional
          </Button>
        </Paper>

        <Paper withBorder shadow="none" p={10} mt={15} radius="md" ta="center">
          <Title className={classes.title} order={4}>
            Employer
          </Title>

          <Text mt="sm">For those looking to hire others.</Text>

          <Button
            mt="sm"
            onClick={() => {
              setAccountType("Employer");
              setCurrentStep(1);
            }}
          >
            Sign up as Employer
          </Button>
        </Paper>
      </Group>
    </>
  );
};

interface ProfessionalComponents {
  professional: any;
  setProfessional: any;
  setCurrentStep: any;
}

const ProfessionalStep1: React.FC<ProfessionalComponents> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (
      professional.firstName &&
      professional.lastName &&
      professional.phoneNumber &&
      professional.email
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [professional]);

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
          setProfessional({ ...professional, phoneNumber: delta.target.value });
        }}
        required
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

const ProfessionalStep2: React.FC<ProfessionalComponents> = ({
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

const ProfessionalStep3: React.FC<ProfessionalComponents> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (
      professional.userName &&
      professional.schoolName &&
      professional.degreeName &&
      professional.completionDate
    ) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [professional]);

  return (
    <>
      <TextInput
        label="Username"
        placeholder="Enter username"
        value={professional.userName}
        onChange={(delta) => {
          setProfessional({ ...professional, userName: delta.target.value });
        }}
        required
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

      <TextInput
        mt="md"
        label="Completion Date"
        placeholder="Enter completion date"
        value={professional.completionDate}
        onChange={(delta) => {
          setProfessional({
            ...professional,
            completionDate: delta.target.value,
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

const ProfessionalStep4: React.FC<ProfessionalComponents> = ({
  professional,
  setProfessional,
  setCurrentStep,
}) => {
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
    console.log("Signing up!");
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

interface EmployerComponents {
  employer: any;
  setEmployer: any;
  setCurrentStep: any;
}

const EmployerStep1: React.FC<EmployerComponents> = ({
  employer,
  setEmployer,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (employer.companyName && employer.userName) {
      setDisableNext(false);
    } else {
      setDisableNext(true);
    }
  }, [employer]);

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
        value={employer.userName}
        onChange={(delta) => {
          setEmployer({ ...employer, userName: delta.target.value });
        }}
        required
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

const EmployerStep2: React.FC<EmployerComponents> = ({
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

const EmployerStep3: React.FC<EmployerComponents> = ({
  employer,
  setEmployer,
  setCurrentStep,
}) => {
  const [disableSignUp, setDisableSignUp] = useState(true);

  useEffect(() => {
    if (
      employer.contactFirstName &&
      employer.contactLastName &&
      employer.contactPhoneNumber &&
      employer.contactEmail
    ) {
      setDisableSignUp(false);
    } else {
      setDisableSignUp(true);
    }
  }, [employer]);

  const signUp = () => {
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
          setEmployer({ ...employer, contactPhoneNumber: delta.target.value });
        }}
        required
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
