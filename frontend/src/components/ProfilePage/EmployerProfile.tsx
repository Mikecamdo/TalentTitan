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
import Employer from "../../types/Employer";
import { ProfileProps } from "../../pages/ProfilePage";
import { UserContext } from "../../App";
import { getEmployerByUsername, updateEmployer } from "../../api/employerApi";
import { notifications } from "@mantine/notifications";
import { updatePassword as updateThePassword } from "../../api/userApi";
import { requestDeleteEmployer } from "../../api/deleteEmployerRequestApi";
import { getBalance, payBalance } from "../../api/balancesApi";
import { getUserTransactions } from "../../api/transactionsApi";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const ALPHABET_REGEX = /[a-zA-Z]/;
const NUMERIC_REGEX = /\d/;
const SPECIAL_REGEX = /[!@#$%^&*()_+?]/;
const LENGTH_REGEX = /^.{8,}$/;

// Credit Card Regex:
const VISA_REGEX = /^4\d{12}(?:\d{3})?$/;
const MASTERCARD_REGEX = /^5\d{15}$/;
const AMEX_REGEX = /^3[47]\d{13}$/;
const DISCOVER_REGEX = /^6\d{15}$/;

export const EmployerProfile: React.FC<ProfileProps> = ({
  currentlyViewing,
}) => {
  const [editProfile, setEditProfile] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  const [employer, setEmployer] = useState<Employer>({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    contactFirstName: "",
    contactLastName: "",
    contactPhoneNumber: "",
    contactEmail: "",
    username: "",
  });

  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<any>(null);

  const [updatePasswordOpened, handlePasswordOpened] = useDisclosure(false);
  const [requestDeletionOpened, handleDeletionOpened] = useDisclosure(false);
  const [paymentOpened, handlePaymentOpened] = useDisclosure(false);

  const [disableButton, setDisableButton] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [disablePay, setDisablePay] = useState(true);
  const [creditCard, setCreditCard] = useState("");
  const [payAmount, setPayAmount] = useState("");

  const [creditCardError, setCreditCardError] = useState("");

  const [balance, setBalance] = useState<any>();
  const [transactions, setTransactions] = useState<any>();

  useEffect(() => {
    getEmployerByUsername(currentlyViewing).then((response: any) => {
      if (response.name === "AxiosError") {
        console.log(response);
        notifications.show({
          color: "red",
          title: "Uh Oh!",
          message: "It looks like this user doesn't exist.",
        });
      } else {
        getBalance(response.username).then((response: any) => {
          if (response.username) {
            setBalance(response);
          } else {
            notifications.show({
              color: "red",
              title: "Error!",
              message: "Error while retrieving the user's balance",
            });
          }
        });

        getUserTransactions(response.username).then((response: any) => {
          if (response.length >= 0) {
            setTransactions(response);
          } else {
            notifications.show({
              color: "red",
              title: "Error!",
              message: "Error while retrieving the user's transactions",
            });
          }
        });

        setEmployer({
          companyName: response.companyName,
          address: response.addressLine,
          city: response.city,
          state: response.state,
          zipCode: response.zipCode,
          contactFirstName: response.contactFirstName,
          contactLastName: response.contactLastName,
          contactPhoneNumber: response.contactPhone,
          contactEmail: response.contactEmail,
          username: response.username,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (employer && employer.contactEmail) {
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
      employer &&
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
      employer &&
      (employer.contactPhoneNumber.length === 14 ||
        !employer.contactPhoneNumber)
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

  const formatCreditCard = (textInput: string) => {
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

    if (numbersString[0] === "3") {
      // Mastercard
      formattedString = numbersString.slice(0, 4);
      if (numbersString[4]) {
        formattedString += "-" + numbersString.slice(4, 10);
        if (numbersString[10]) {
          formattedString += "-" + numbersString.slice(10, 15);
        }
      }
    } else {
      // Everything else
      formattedString = numbersString.slice(0, 4);
      if (numbersString[4]) {
        formattedString += "-" + numbersString.slice(4, 8);
        if (numbersString[8]) {
          formattedString += "-" + numbersString.slice(8, 12);
          if (numbersString[12]) {
            formattedString += "-" + numbersString.slice(12, 16);
          }
        }
      }
    }

    return formattedString;
  };

  const setPhoneNumber = (input: string) => {
    setCursorPosition(inputRef.current.selectionStart);

    if (employer) {
      setEmployer({
        ...employer,
        contactPhoneNumber: formatPhoneNumber(input),
      });
    }
  };

  const setCreditCardNumber = (input: string) => {
    setCreditCard(formatCreditCard(input));
  };

  const updatePassword = () => {
    updateThePassword({
      username: employer.username,
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

  const submitPayment = () => {
    // Call backend and submit payment
    payBalance({
      username: currentUser,
      paymentAmount: payAmount,
    }).then((response: any) => {
      if (response.dueDate) {
        getUserTransactions(currentlyViewing).then((response: any) => {
          if (response.length >= 0) {
            setTransactions(response);
          }
        });
        notifications.show({
          color: "green",
          title: "Success!",
          message: "Payment successful",
        });
        handlePaymentOpened.close();
        setCreditCard("");
        setPayAmount("");
        setBalance(response);
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Error while making payment",
        });
      }
    });
  };

  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;
  const userType = userContext?.userType;

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (!creditCard || !payAmount || creditCardError) {
      setDisablePay(true);
    } else {
      setDisablePay(false);
    }
  }, [creditCardError, payAmount]);

  const [disablePayment, setDisablePayment] = useState(false);

  useEffect(() => {
    if (balance && parseFloat(balance.amountDue) == 0) {
      setDisablePayment(true);
    } else {
      setDisablePayment(false);
    }
  }, [balance]);

  useEffect(() => {
    const numbersArray = creditCard.match(/\d+/g);
    const creditCardNumbers = numbersArray ? numbersArray.join("") : "";

    if (
      creditCard &&
      !VISA_REGEX.test(creditCardNumbers) &&
      !MASTERCARD_REGEX.test(creditCardNumbers) &&
      !AMEX_REGEX.test(creditCardNumbers) &&
      !DISCOVER_REGEX.test(creditCardNumbers)
    ) {
      setCreditCardError("Invalid credit card");
    } else {
      setCreditCardError("");
    }
  }, [creditCard]);

  if (
    !currentUser ||
    !employer.username ||
    !userType ||
    !balance ||
    !transactions
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container size="md">
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={4}>
              <Avatar size={125} radius="md" mx="auto" />

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
                {transactions.length > 0 ? (
                  <>
                    {transactions.map((transaction: any, index: number) => {
                      return (
                        <Text fz="sm" mt="xs" key={index}>
                          {new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(
                            new Date(
                              transaction.transactionDate + "T00:00:00.000"
                            )
                          )}
                          : Paid ${transaction.amountPaid} to Talent Titan
                        </Text>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {currentUser === currentlyViewing ? (
                      <Text fz="sm" mt="xs" ta="center">
                        Looks like you haven't made any transactions yet...
                      </Text>
                    ) : (
                      <Text fz="sm" mt="xs" ta="center">
                        Looks like they haven't made any transactions yet...
                      </Text>
                    )}
                  </>
                )}
              </Grid.Col>
            </Grid>
          </Card.Section>

          {editProfile ? (
            <Group justify="center" mt="md">
              <Button
                onClick={() => {
                  updateEmployer(employer.username, {
                    addressLine: employer.address,
                    city: employer.city,
                    state: employer.state,
                    zipCode: employer.zipCode,
                    contactFirstName: employer.contactFirstName,
                    contactLastName: employer.contactLastName,
                    contactPhone: employer.contactPhoneNumber,
                    contactEmail: employer.contactEmail,
                  }).then((response: any) => {
                    if (response.name === "AxiosError") {
                      notifications.show({
                        color: "red",
                        title: "Error!",
                        message: "There was an error updating the profile.",
                      });
                    } else {
                      notifications.show({
                        color: "green",
                        title: "Success!",
                        message: "User updated successfully.",
                      });
                      setEditProfile(false);
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
                  <Button onClick={handleDeletionOpened.open}>
                    Request Account Deletion
                  </Button>
                  <Button onClick={handlePaymentOpened.open}>
                    Payment Options
                  </Button>
                  <Button onClick={handlePasswordOpened.open}>
                    Update Password
                  </Button>
                </>
              )}
              {(currentUser === currentlyViewing || userType === "staff") && (
                <Button
                  onClick={() => {
                    setEditProfile(true);
                  }}
                >
                  Edit Profile
                </Button>
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
                requestDeleteEmployer(employer.username).then(
                  (response: any) => {
                    if (response === "Employer Deletion Request successful") {
                      notifications.show({
                        color: "green",
                        title: "Success!",
                        message: "Deletion request successful",
                      });
                      handleDeletionOpened.close();
                    } else {
                      notifications.show({
                        color: "red",
                        title: "Error!",
                        message: response,
                      });
                    }
                  }
                );
              }}
            >
              Yes, delete my account
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>

      <Modal
        opened={paymentOpened}
        onClose={handlePaymentOpened.close}
        title="Make a Payment"
        centered
      >
        <Title order={3} className={classes.name} ta="center">
          Amount due: ${balance.amountDue}
        </Title>

        <Title order={3} className={classes.name} ta="center">
          Due date:{" "}
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(new Date(balance.dueDate + "T00:00:00.000"))}
        </Title>

        <TextInput
          required
          label="Credit Card"
          placeholder="Enter credit card details"
          value={creditCard}
          onChange={(delta) => {
            setCreditCardNumber(delta.target.value);
          }}
          error={creditCardError}
          disabled={disablePayment}
        />

        <TextInput
          type="number"
          required
          mt="md"
          label="Payment Amount"
          placeholder="Enter payment amount"
          value={payAmount}
          onChange={(delta) => {
            if (
              parseFloat(delta.target.value) > parseFloat(balance.amountDue)
            ) {
              setPayAmount(balance.amountDue);
            } else if (parseFloat(delta.target.value) < 0) {
              setPayAmount("0");
            } else {
              setPayAmount(delta.target.value);
            }
          }}
          disabled={disablePayment}
        />

        <Button
          fullWidth
          mt="xl"
          disabled={disablePay}
          onClick={() => {
            submitPayment();
          }}
        >
          Submit Payment
        </Button>
      </Modal>
    </>
  );
};
