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
import { useState, useEffect, useRef, useContext } from "react";
import { ProfileProps } from "../../pages/ProfilePage";
import { UserContext } from "../../App";
import Staff from "../../types/Staff";
import { notifications } from "@mantine/notifications";
import { getStaffByUsername, updateStaff } from "../../api/staffApi";
import { updatePassword as updateThePassword } from "../../api/userApi";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const ALPHABET_REGEX = /[a-zA-Z]/;
const NUMERIC_REGEX = /\d/;
const SPECIAL_REGEX = /[!@#$%^&*()_+?]/;
const LENGTH_REGEX = /^.{8,}$/;

export const StaffProfile: React.FC<ProfileProps> = ({ currentlyViewing }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  const [staff, setStaff] = useState<Staff>({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
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
    if (currentlyViewing) {
      getStaffByUsername(currentlyViewing).then((response: any) => {
        if (response) {
          console.log("RESPONSE");
          console.log(response);
          setStaff({
            firstName: response.firstName,
            lastName: response.lastName,
            username: response.username,
            phoneNumber: response.phone,
            email: response.email,
          });
        } else {
          notifications.show({
            color: "red",
            title: "Uh Oh!",
            message: "It looks like this user doesn't exist.",
          });
        }
      });
    }
  }, [currentlyViewing]);

  useEffect(() => {
    if (staff.email) {
      if (!EMAIL_REGEX.test(staff.email)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [staff.email]);

  useEffect(() => {
    if (
      staff.firstName &&
      staff.lastName &&
      staff.email &&
      staff.phoneNumber &&
      !emailError &&
      !phoneError
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [staff, emailError, phoneError]);

  useEffect(() => {
    if (editProfile && inputRef.current) {
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
      staff.phoneNumber &&
      (staff.phoneNumber.length === 14 || !staff.phoneNumber)
    ) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [staff.phoneNumber]);

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
    if (inputRef.current) setCursorPosition(inputRef.current.selectionStart);

    setStaff({ ...staff, phoneNumber: formatPhoneNumber(input) });
  };

  const updatePassword = () => {
    updateThePassword({
      username: staff.username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }).then((response: any) => {
      if (response === "") {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Couldn't find the correct user to update.",
        });
      } else if (response === "Incorrect old password") {
        notifications.show({
          color: "red",
          title: "Error!",
          message: response,
        });
      } else if (response === "Updated password") {
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
        handlePasswordOpened.close();
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "There was an error while trying to update the password.",
        });
      }
    });
  };

  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  if (!currentUser || !staff || !staff.username) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container size="md">
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={4}>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
                size={125}
                radius="md"
                mx="auto"
              />

              <Text
                ta="center"
                fz="md"
                fw={500}
                mt={5}
                className={classes.name}
              >
                {staff.username}
              </Text>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text fz="lg" fw={500} className={classes.name}>
                Personal Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <>
                    <TextInput
                      label="First Name"
                      placeholder="Enter contact first name"
                      value={staff.firstName}
                      onChange={(delta) => {
                        setStaff({
                          ...staff,
                          firstName: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />

                    <TextInput
                      label="Last Name"
                      placeholder="Enter contact last name"
                      value={staff.lastName}
                      onChange={(delta) => {
                        setStaff({
                          ...staff,
                          lastName: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />
                  </>
                ) : (
                  <Text fz="sm" c="dimmed">
                    {staff.firstName} {staff.lastName}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <TextInput
                    label="Email"
                    placeholder="Enter email"
                    value={staff.email}
                    onChange={(delta) => {
                      setStaff({
                        ...staff,
                        email: delta.target.value,
                      });
                    }}
                    required
                    error={emailError}
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {staff.email}
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
                    value={staff.phoneNumber}
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
                    {staff.phoneNumber}
                  </Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>

          {editProfile ? (
            <Group justify="center" mt="md">
              <Button
                onClick={() => {
                  updateStaff({
                    username: staff.username,
                    firstName: staff.firstName,
                    lastName: staff.lastName,
                    phone: staff.phoneNumber,
                    email: staff.email
                  }).then((response: any) => {
                    if (response === "Staff updated successfully") {
                      notifications.show({
                        color: "green",
                        title: "Success!",
                        message: "User updated successfully.",
                      });
                      setEditProfile(false);
                    } else {
                      notifications.show({
                        color: "red",
                        title: "Error!",
                        message: "There was an error updating the profile.",
                      });
                    }
                  });
                }}
                disabled={disableSave}
              >
                Save Profile
              </Button>
            </Group>
          ) : (
            <Group justify="center" mt="md">
              {currentUser === currentlyViewing && (
                <>
                  {/* <Button onClick={handleDeletionOpened.open}>
                    Request Account Deletion
                  </Button> */}
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
                </>
              )}
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
