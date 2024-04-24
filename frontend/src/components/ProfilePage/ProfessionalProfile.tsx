import {
  Avatar,
  Text,
  Group,
  Card,
  Container,
  Button,
  Table,
  Grid,
  TextInput,
  CloseButton,
  Modal,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconPhoneCall,
  IconAt,
  IconUser,
  IconHome,
  IconCertificate,
  IconSchool,
  IconCalendar,
} from "@tabler/icons-react";
import classes from "../../css_modules/ProfilePage.module.css";
import Qualification from "../../types/Qualification";
import { useState, useEffect, useRef, useContext } from "react";
import Professional from "../../types/Professional";
import { ProfileProps } from "../../pages/ProfilePage";
import { UserContext } from "../../App";
import { displayTransactions } from "../../api/transactionsApi";
import { getProfessional, updateProfessional } from "../../api/professionalApi";
import { notifications } from "@mantine/notifications";
import { updatePassword as updateThePassword } from "../../api/userApi";
import { requestDeleteProfessional } from "../../api/deleteProfessionalRequestApi";
import {
  getQualificationsByProfessional,
  updateQualifications,
} from "../../api/qualificationApi";

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

export const ProfessionalProfile: React.FC<ProfileProps> = ({
  currentlyViewing,
}) => {
  const [editProfile, setEditProfile] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  const [disableAdd, setDisableAdd] = useState(true);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");

  const [professional, setProfessional] = useState<Professional>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    username: "",
    schoolName: "",
    degreeName: "",
    completionDate: new Date(),
    qualifications: [],
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

  useEffect(() => {
    if (category && keywords) {
      setDisableAdd(false);
    } else {
      setDisableAdd(true);
    }
  }, [category, keywords]);

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
    if (
      professional.email &&
      professional.phoneNumber &&
      professional.address &&
      professional.city &&
      professional.state &&
      professional.zipCode &&
      professional.schoolName &&
      professional.degreeName &&
      professional.completionDate &&
      professional.qualifications.length >= 2 &&
      !emailError &&
      !phoneError
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [professional, emailError, phoneError]);

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
      professional.phoneNumber &&
      (professional.phoneNumber.length === 14 || !professional.phoneNumber)
    ) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [professional.phoneNumber]);

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

    setProfessional({ ...professional, phoneNumber: formatPhoneNumber(input) });
  };

  const setCreditCardNumber = (input: string) => {
    setCreditCard(formatCreditCard(input));
  };

  const updatePassword = () => {
    updateThePassword({
      username: professional.username,
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
    handlePaymentOpened.close();
    setCreditCard("");
    setPayAmount("");
  };

  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;

  useEffect(() => {
    if (currentUser) {
      getProfessional(currentUser).then((response: any) => {
        if (response) {
          getQualificationsByProfessional(currentUser).then(
            (response2: any) => {
              if (typeof response2 === "string") {
                notifications.show({
                  color: "red",
                  title: "Error!",
                  message: "Error while retrieving qualifications",
                });
              } else if (response2.categories) {
                let quals = [];

                for (let i = 0; i < response2.categories.length; i++) {
                  quals.push({
                    category: response2.categories[i],
                    keywords: response2.keywords[i],
                  });
                }

                setProfessional({
                  firstName: response.firstName,
                  lastName: response.lastName,
                  address: response.addressLine,
                  city: response.city,
                  state: response.state,
                  zipCode: response.zipCode,
                  phoneNumber: response.phone,
                  email: response.email,
                  username: response.username,
                  schoolName: response.schoolName,
                  degreeName: response.degreeName,
                  completionDate: new Date(response.completionDate),
                  qualifications: quals,
                });
              }
            }
          );
        } else {
          notifications.show({
            color: "red",
            title: "Uh Oh!",
            message: "It looks like this user doesn't exist.",
          });
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (!creditCard || !payAmount || creditCardError) {
      setDisablePay(true);
    } else {
      setDisablePay(false);
    }
  }, [creditCardError, payAmount]);

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

  if (!currentUser || !professional || !professional.firstName) {
    return <div>Loading...</div>;
  }

  const rows = professional.qualifications.map(
    (qualification: Qualification, index: number) => (
      <Table.Tr>
        <Table.Td>{qualification.category}</Table.Td>
        <Table.Td>
          {qualification.keywords}
          {editProfile && (
            <CloseButton
              variant="transparent"
              size="xs"
              onClick={() => {
                const data = professional.qualifications;
                data.splice(index, 1);
                setProfessional({ ...professional, qualifications: data });
              }}
            />
          )}
        </Table.Td>
      </Table.Tr>
    )
  );

  const transaction = () => {
    displayTransactions().then((response: any) => {
      if (typeof response === "string") {
        console.log(response);
      }
    });
  };

  return (
    <>
      <Container size="md">
        <Card shadow="md" padding="lg" radius="md" withBorder>
          <Grid>
            <Grid.Col span={3}>
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
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
                {professional.username}
              </Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <Text fz="lg" fw={500} className={classes.name}>
                Personal Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="sm" c="dimmed">
                  {professional.firstName} {professional.lastName}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <TextInput
                    label="Email"
                    placeholder="Enter email"
                    value={professional.email}
                    onChange={(delta) => {
                      setProfessional({
                        ...professional,
                        email: delta.target.value,
                      });
                    }}
                    required
                    error={emailError}
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.email}
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
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.phoneNumber}
                  </Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={3}>
              <Text fz="lg" fw={500} className={classes.name}>
                Address
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconHome stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <TextInput
                    label="Address Line"
                    placeholder="Enter address line"
                    value={professional.address}
                    onChange={(delta) => {
                      setProfessional({
                        ...professional,
                        address: delta.target.value,
                      });
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.address}
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
                      value={professional.city}
                      onChange={(delta) => {
                        setProfessional({
                          ...professional,
                          city: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />

                    <TextInput
                      label="State"
                      placeholder="Enter state"
                      value={professional.state}
                      onChange={(delta) => {
                        setProfessional({
                          ...professional,
                          state: delta.target.value,
                        });
                      }}
                      required
                      size="xs"
                    />
                  </>
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.city}, {professional.state}
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
                    value={professional.zipCode}
                    onChange={(delta) => {
                      setProfessional({
                        ...professional,
                        zipCode: delta.target.value,
                      });
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.zipCode}
                  </Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={3}>
              <Text fz="lg" fw={500} className={classes.name}>
                Degree Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconSchool stroke={1.5} size="1rem" className={classes.icon} />
                {editProfile ? (
                  <TextInput
                    label="School Name"
                    placeholder="Enter school name"
                    value={professional.schoolName}
                    onChange={(delta) => {
                      setProfessional({
                        ...professional,
                        schoolName: delta.target.value,
                      });
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.schoolName}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconCertificate
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                {editProfile ? (
                  <TextInput
                    label="Degree Name"
                    placeholder="Enter degree name"
                    value={professional.degreeName}
                    onChange={(delta) => {
                      setProfessional({
                        ...professional,
                        degreeName: delta.target.value,
                      });
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.degreeName}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconCalendar
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                {editProfile ? (
                  <DateInput
                    label="Completion Date"
                    placeholder="Enter completion date"
                    value={professional.completionDate}
                    onChange={(date) => {
                      if (date) {
                        setProfessional({
                          ...professional,
                          completionDate: date,
                        });
                      }
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {professional.completionDate.toDateString()}
                  </Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>

          <Card.Section>
            <Grid px="xs" pb="lg" pt="xs">
              <Grid.Col span={6}>
                <Text fz="lg" fw={500} className={classes.name} ta="center">
                  Qualifications
                </Text>
                <Table highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Keywords/Key phrases</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                {editProfile && (
                  <>
                    <Grid>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Category"
                          placeholder="Enter category"
                          value={category}
                          onChange={(delta) => {
                            setCategory(delta.target.value);
                          }}
                          required
                          size="xs"
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Keyword(s)"
                          placeholder="Enter keyword(s)"
                          value={keywords}
                          onChange={(delta) => {
                            setKeywords(delta.target.value);
                          }}
                          required
                          size="xs"
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Button
                          fullWidth
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
                      </Grid.Col>
                    </Grid>
                  </>
                )}
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fz="lg" fw={500} className={classes.name} ta="center">
                  Transaction History
                </Text>
                <Text fz="sm">
                  February 11, 2024: Received $50 from Walmart
                </Text>
                <Text fz="sm" mt="xs">
                  February 1, 2024: Paid $10 to Talent Titan (subscription fee)
                </Text>
              </Grid.Col>
            </Grid>
          </Card.Section>

          {editProfile ? (
            <Group justify="center" mt="md">
              <Button
                onClick={() => {
                  updateProfessional(professional.username, {
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
                    if (response.name === "") {
                      notifications.show({
                        color: "red",
                        title: "Error!",
                        message: "There was an error updating the profile.",
                      });
                    } else {
                      updateQualifications({
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
                        if (
                          response === "Successfully updated qualifications"
                        ) {
                          notifications.show({
                            color: "green",
                            title: "Success!",
                            message: "User updated successfully.",
                          });
                          setEditProfile(false);
                        } else {
                          console.log("RESPONSE");
                          console.log(response);
                          notifications.show({
                            color: "red",
                            title: "Error!",
                            message: response,
                          });
                        }
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
              {(currentUser === currentlyViewing ||
                currentUser === "Staff") && (
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
                requestDeleteProfessional(professional.username).then(
                  (response: any) => {
                    if (
                      response === "Professional Deletion Request successful"
                    ) {
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
          Amount due: $40
        </Title>

        <TextInput
          required
          label="Credit Card"
          placeholder="Enter credit card details"
          value={creditCard}
          onChange={(delta) => {
            //setCreditCard(delta.target.value);
            setCreditCardNumber(delta.target.value);
          }}
          error={creditCardError}
        />

        <TextInput
          type="number"
          required
          mt="md"
          label="Payment Amount"
          placeholder="Enter payment amount"
          value={payAmount}
          onChange={(delta) => {
            // TODO: change this to make it dynamic (can't pay more than the total amount due)
            if (parseInt(delta.target.value) > 40) {
              setPayAmount("40");
            } else {
              setPayAmount(delta.target.value);
            }
          }}
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
