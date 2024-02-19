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
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconPhoneCall,
  IconAt,
  IconUser,
  IconHome,
  IconCertificate,
  IconSchool,
  IconCalendar,
} from "@tabler/icons-react";
import classes from "../css_modules/ProfilePage.module.css";
import Qualification from "../types/Qualification";
import { useState, useEffect, useRef } from "react";
import Professional from "../types/Professional";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const ProfilePage = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [disableSave, setDisableSave] = useState(false);

  const [disableAdd, setDisableAdd] = useState(true);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");

  const [professional, setProfessional] = useState<Professional>({
    firstName: "Bob",
    lastName: "Smith",
    address: "6425 Boaz Lane",
    city: "Dallas",
    state: "Texas",
    zipCode: "75205",
    phoneNumber: "(123) 456-7890",
    email: "bsmith@gmail.com",
    username: "BSmith7",
    schoolName: "SMU",
    degreeName: "B.S. Computer Science",
    completionDate: new Date(2025, 4, 1),
    qualifications: [
      { category: "Languages", keywords: "C, C++, C#, Java, JavaScript" },
      {
        category: "Frameworks",
        keywords: "React, Angular, Vue, Node.js, .NET",
      },
      { category: "Databases", keywords: "PostgreSQL, SQL Server" },
    ],
  });

  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<any>(null);

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

  if (!professional) {
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
                  setEditProfile(false);
                }}
                disabled={disableSave}
              >
                Save Profile
              </Button>
            </Group>
          ) : (
            <Group justify="center" mt="md">
              <Button>Request Account Deletion</Button>
              <Button>Payment Options</Button>
              <Button>Change Password</Button>
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
    </>
  );
};
