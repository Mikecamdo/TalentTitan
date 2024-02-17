import { Button, Group, Table, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import Qualification from "../../types/Qualification";
import Professional from "../../types/Professional";

interface ProfessionalProps {
  professional: Professional;
  setProfessional: any;
  setCurrentStep: any;
}

export const ProfessionalStep1: React.FC<ProfessionalProps> = ({
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

  useEffect(() => {
    if (
      professional.username &&
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
        value={professional.username}
        onChange={(delta) => {
          setProfessional({ ...professional, username: delta.target.value });
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

export const ProfessionalStep4: React.FC<ProfessionalProps> = ({
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
