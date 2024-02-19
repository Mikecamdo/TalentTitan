import {
  Avatar,
  Text,
  Group,
  Card,
  Container,
  Button,
  Grid,
  TextInput,
  Modal,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPhoneCall, IconAt, IconUser, IconHome } from "@tabler/icons-react";
import classes from "../../css_modules/ProfilePage.module.css";
import { useState, useEffect, useRef } from "react";
import Employer from "../../types/Employer";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const ALPHABET_REGEX = /[a-zA-Z]/;
const NUMERIC_REGEX = /\d/;
const SPECIAL_REGEX = /[!@#$%^&*()_+]/;
const LENGTH_REGEX = /^.{8,}$/;

export const EmployerProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  const [employer, setEmployer] = useState<Employer>({
    companyName: "Walmart",
    address: "702 SW 8th Street",
    city: "Bentonville",
    state: "Arkansas",
    zipCode: "72716",
    contactFirstName: "Doug",
    contactLastName: "McMillon",
    contactPhoneNumber: "(479) 273-4000",
    contactEmail: "dmcmillon@walmart.com",
    username: "WalmartIsCool",
  });

  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<any>(null);

  const [updatePasswordOpened, handlePasswordOpened] = useDisclosure(false);
  const [requestDeletionOpened, handleDeletionOpened] = useDisclosure(false);

  const [disableButton, setDisableButton] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
    if (
      employer.contactFirstName &&
      employer.contactLastName &&
      employer.contactEmail &&
      employer.contactPhoneNumber &&
      employer.address &&
      employer.city &&
      employer.state &&
      employer.zipCode &&
      !emailError &&
      !phoneError
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [employer, emailError, phoneError]);

  useEffect(() => {
    if (editProfile) {
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

    if (
      employer.contactPhoneNumber.length === 14 ||
      !employer.contactPhoneNumber
    ) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [employer.contactPhoneNumber]);

  useEffect(() => {
    if (!newPassword || !confirmPassword || !oldPassword) {
      setDisableButton(true);
    } else if (newPasswordError || confirmPasswordError) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [newPasswordError, confirmPasswordError, oldPassword]);

  useEffect(() => {
    if (newPassword) {
      if (!ALPHABET_REGEX.test(newPassword)) {
        setNewPasswordError("Password must contain an alphabet character");
      } else if (!NUMERIC_REGEX.test(newPassword)) {
        setNewPasswordError("Password must contain a numeric character");
      } else if (!SPECIAL_REGEX.test(newPassword)) {
        setNewPasswordError("Password must contain a special character");
      } else if (!LENGTH_REGEX.test(newPassword)) {
        setNewPasswordError("Password must be at least 8 characters long");
      } else {
        setNewPasswordError("");
      }
    } else {
      setNewPasswordError("");
    }

    if (confirmPassword === newPassword || !confirmPassword) {
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("Passwords don't match");
    }
  }, [newPassword, confirmPassword]);

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

    setEmployer({ ...employer, contactPhoneNumber: formatPhoneNumber(input) });
  };

  const updatePassword = () => {
    // Call backend and update password
    handlePasswordOpened.close();
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!employer) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container size="md">
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={4}>
              <Avatar
                src="https://assets-global.website-files.com/64248e7fd5f30d79c9e57d64/64e6177329c2d71389b1b219_walmart.png"
                size={125}
                radius="md"
                mx="auto"
              />

              <Text
                ta="center"
                fz="xl"
                fw={500}
                mt={5}
                className={classes.name}
              >
                {employer.companyName}
              </Text>

              <Text
                ta="center"
                fz="sm"
                fw={500}
                c="dimmed"
                className={classes.name}
              >
                {employer.username}
              </Text>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text fz="lg" fw={500} className={classes.name}>
                Contact Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <>
                    <TextInput
                      label="First Name"
                      placeholder="Enter contact first name"
                      value={employer.contactFirstName}
                      onChange={(delta) => {
                        setEmployer({
                          ...employer,
                          contactFirstName: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />

                    <TextInput
                      label="Last Name"
                      placeholder="Enter contact last name"
                      value={employer.contactLastName}
                      onChange={(delta) => {
                        setEmployer({
                          ...employer,
                          contactLastName: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />
                  </>
                ) : (
                  <Text fz="sm" c="dimmed">
                    {employer.contactFirstName} {employer.contactLastName}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <TextInput
                    label="Email"
                    placeholder="Enter email"
                    value={employer.contactEmail}
                    onChange={(delta) => {
                      setEmployer({
                        ...employer,
                        contactEmail: delta.target.value,
                      });
                    }}
                    required
                    error={emailError}
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {employer.contactEmail}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                {editProfile ? (
                  <TextInput
                    label="Phone"
                    placeholder="Enter phone number"
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
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {employer.contactPhoneNumber}
                  </Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text fz="lg" fw={500} className={classes.name}>
                Address
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconHome stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <TextInput
                    label="Address Line"
                    placeholder="Enter address line"
                    value={employer.address}
                    onChange={(delta) => {
                      setEmployer({
                        ...employer,
                        address: delta.target.value,
                      });
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {employer.address}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconHome stroke={1.5} size="1rem" className={classes.hidden} />
                {editProfile ? (
                  <>
                    <TextInput
                      label="City"
                      placeholder="Enter city"
                      value={employer.city}
                      onChange={(delta) => {
                        setEmployer({
                          ...employer,
                          city: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />

                    <TextInput
                      label="State"
                      placeholder="Enter state"
                      value={employer.state}
                      onChange={(delta) => {
                        setEmployer({
                          ...employer,
                          state: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />
                  </>
                ) : (
                  <Text fz="sm" c="dimmed">
                    {employer.city}, {employer.state}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconHome stroke={1.5} size="1rem" className={classes.hidden} />
                {editProfile ? (
                  <TextInput
                    type="number"
                    label="Zip Code"
                    placeholder="Enter zip code"
                    value={employer.zipCode}
                    onChange={(delta) => {
                      setEmployer({
                        ...employer,
                        zipCode: delta.target.value,
                      });
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {employer.zipCode}
                  </Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>

          <Card.Section>
            <Grid px="xl" pb="lg" pt="xs">
              <Grid.Col>
                <Text fz="lg" fw={500} className={classes.name} ta="center">
                  Transaction History
                </Text>
                <Text fz="sm">February 11, 2024: Paid $50 to Bob Smith</Text>
                <Text fz="sm" mt="xs">
                  January 17, 2024: Paid $10 to Talent Titan (subscription fee)
                </Text>
              </Grid.Col>
            </Grid>
          </Card.Section>

          {editProfile ? (
            <Group justify="center" mt="md">
              <Button
                onClick={() => {
                  setEditProfile(false);
                }}
                disabled={disableSave}
              >
                Save Profile
              </Button>
            </Group>
          ) : (
            <Group justify="center" mt="md">
              <Button onClick={handleDeletionOpened.open}>
                Request Account Deletion
              </Button>
              <Button>Payment Options</Button>
              <Button onClick={handlePasswordOpened.open}>
                Update Password
              </Button>
              <Button
                onClick={() => {
                  setEditProfile(true);
                }}
              >
                Edit Profile
              </Button>
            </Group>
          )}
        </Card>
      </Container>

      <Modal
        opened={updatePasswordOpened}
        onClose={handlePasswordOpened.close}
        title="Update Password"
        centered
      >
        <TextInput
          required
          type="password"
          label="Old Password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(delta) => {
            setOldPassword(delta.target.value);
          }}
        />

        <TextInput
          required
          type="password"
          label="New Password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(delta) => {
            setNewPassword(delta.target.value);
          }}
          error={newPasswordError}
        />

        <TextInput
          required
          type="password"
          mt="md"
          label="Confirm New Password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(delta) => {
            setConfirmPassword(delta.target.value);
          }}
          error={confirmPasswordError}
        />

        <Button
          fullWidth
          mt="xl"
          disabled={disableButton}
          onClick={() => {
            updatePassword();
          }}
        >
          Update password
        </Button>
      </Modal>

      <Modal
        opened={requestDeletionOpened}
        onClose={handleDeletionOpened.close}
        title="Delete Account"
        centered
      >
        <Title order={3} className={classes.name} ta="center">
          Are you sure you want to delete your account?
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt="xs">
          Please note that your account won't be deleted until our staff
          approves your request
        </Text>

        <Grid mt="lg">
          <Grid.Col span={6}>
            <Button
              fullWidth
              onClick={() => {
                handleDeletionOpened.close();
              }}
            >
              No, keep my account
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              fullWidth
              onClick={() => {
                //request to delete account in backend
                handleDeletionOpened.close();
              }}
            >
              Yes, delete my account
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
};
