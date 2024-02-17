import { Button, Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import Employer from "../../types/Employer";

interface EmployerProps {
  employer: Employer;
  setEmployer: any;
  setCurrentStep: any;
}

export const EmployerStep1: React.FC<EmployerProps> = ({
  employer,
  setEmployer,
  setCurrentStep,
}) => {
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (employer.companyName && employer.username) {
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
        value={employer.username}
        onChange={(delta) => {
          setEmployer({ ...employer, username: delta.target.value });
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