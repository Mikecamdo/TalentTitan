import {
  Container,
  Title,
  TextInput,
  NumberInput,
  Button,
  Table,
  Group,
  ActionIcon,
  rem,
  Card,
  Text,
  Grid,
  Avatar,
  Modal,
  CloseButton,
} from "@mantine/core";
import { TimeInput, DateInput } from "@mantine/dates";
import { useState, useRef, useEffect, useContext } from "react";
import Qualification from "../types/Qualification";
import {
  IconClock,
  IconPhoneCall,
  IconAt,
  IconUser,
  IconCalendar,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css_modules/ProfilePage.module.css";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const JobPage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;

  const [positionName, setPositionName] = useState("Software Engineer");
  const [positionId, setPositionId] = useState("");
  const [contactFirstName, setContactFirstName] = useState("John");
  const [contactLastName, setContactLastName] = useState("Jones");
  const [contactPhoneNumber, setContactPhoneNumber] =
    useState("(834) 209-4921");
  const [contactEmail, setContactEmail] = useState("jjones@walmart.com");
  const [startDate, setStartDate] = useState<Date>(new Date("2024-03-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2024-03-15"));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [hourlyRate, setHourlyRate] = useState("30");
  const [companyName, setCompanyName] = useState("Walmart");

  const [qualifications, setQualifications] = useState<Qualification[]>([
    { category: "Languages", keywords: "Java, JavaScript" },
    { category: "Databases", keywords: "MySQL" },
    { category: "Tools", keywords: "Git, GitHub, Jira" },
  ]);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");

  const [disableAdd, setDisableAdd] = useState(true);
  const [disableSave, setDisableSave] = useState(false);

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  const [editJob, setEditJob] = useState(false);

  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const inputRef = useRef<any>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const [deletionOpened, handleDeletionOpened] = useDisclosure(false);

  const startTimeControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => startTimeRef.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const endTimeControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => endTimeRef.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const rows = qualifications.map(
    (qualification: Qualification, index: number) => (
      <Table.Tr>
        <Table.Td>{qualification.category}</Table.Td>
        <Table.Td>
          {qualification.keywords}
          {editJob && (
            <CloseButton
              variant="transparent"
              size="xs"
              onClick={() => {
                const data: Qualification[] = [...qualifications];
                data.splice(index, 1);
                setQualifications(data);
              }}
            />
          )}
        </Table.Td>
      </Table.Tr>
    )
  );

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

    setContactPhoneNumber(formatPhoneNumber(input));
  };

  const convertTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    let period = "AM";
    let formattedHours = hours;
    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        formattedHours -= 12;
      }
    }

    if (formattedHours === 0) {
      formattedHours = 12;
    }

    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
    return formattedTime;
  };

  useEffect(() => {
    if (
      positionName &&
      contactFirstName &&
      contactLastName &&
      contactPhoneNumber &&
      contactEmail &&
      startDate &&
      endDate &&
      startTime &&
      endTime &&
      hourlyRate &&
      qualifications.length > 1 &&
      !phoneError &&
      !emailError &&
      !startDateError &&
      !endDateError &&
      !startTimeError &&
      !endTimeError
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    positionName,
    contactFirstName,
    contactLastName,
    contactPhoneNumber,
    contactEmail,
    startDate,
    endDate,
    startTime,
    endTime,
    hourlyRate,
    qualifications,
    phoneError,
    emailError,
    startDateError,
    endDateError,
    startTimeError,
    endTimeError,
  ]);

  useEffect(() => {
    if (contactEmail) {
      if (!EMAIL_REGEX.test(contactEmail)) {
        setEmailError("Invalid email");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [contactEmail]);

  useEffect(() => {
    // if (cursorPosition === 1) {
    //   inputRef.current.setSelectionRange(2, 2);
    // } else if (cursorPosition === 5) {
    //   inputRef.current.setSelectionRange(7, 7);
    // } else if (cursorPosition === 6) {
    //   inputRef.current.setSelectionRange(4, 4);
    // } else if (cursorPosition === 10) {
    //   inputRef.current.setSelectionRange(11, 11);
    // } else {
    //   inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    // }

    if (contactPhoneNumber.length === 14 || !contactPhoneNumber) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid phone number");
    }
  }, [contactPhoneNumber]);

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate > endDate) {
        setStartDateError("Start date must be before end date");
        setEndDateError("End date must be after start date");
      } else {
        setStartDateError("");
        setEndDateError("");
      }
    } else {
      setStartDateError("");
      setEndDateError("");
    }

    if (startDate) {
      if (new Date() > startDate) {
        setStartDateError("Must enter future date");
      } else if (startDateError !== "Start date must be before end date") {
        setStartDateError("");
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startTime && endTime) {
      const tempStart = new Date("2000-01-01T" + startTime);
      const tempEnd = new Date("2000-01-01T" + endTime);

      if (tempStart > tempEnd) {
        setStartTimeError("Start time must be before end time");
        setEndTimeError("End time must be after start time");
      } else if (!(tempStart < tempEnd)) {
        setStartTimeError("Start time must be different from end time");
        setEndTimeError("End time must be different from start time");
      } else {
        setStartTimeError("");
        setEndTimeError("");
      }
    } else {
      setStartTimeError("");
      setEndTimeError("");
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (category && keywords) {
      setDisableAdd(false);
    } else {
      setDisableAdd(true);
    }
  }, [category, keywords]);

  if (!currentUser) {
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
                {positionName}
              </Text>

              <Text
                ta="center"
                fz="sm"
                fw={500}
                c="dimmed"
                className={classes.name}
              >
                {companyName}
              </Text>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text fz="lg" fw={500} className={classes.name}>
                Contact Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconUser stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="sm" c="dimmed">
                  {contactFirstName} {contactLastName}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                {editJob ? (
                  <TextInput
                    label="Email"
                    placeholder="Enter email"
                    value={contactEmail}
                    onChange={(delta) => {
                      setContactEmail(delta.target.value);
                    }}
                    required
                    error={emailError}
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {contactEmail}
                  </Text>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                {editJob ? (
                  <TextInput
                    label="Phone"
                    placeholder="Enter phone number"
                    value={contactPhoneNumber}
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
                    {contactPhoneNumber}
                  </Text>
                )}
              </Group>
            </Grid.Col>

            <Grid.Col span={4}>
              <Text fz="lg" fw={500} className={classes.name}>
                Job Info
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconCalendar
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                {editJob ? (
                  <>
                    <DateInput
                      label="Start Date"
                      placeholder="Enter start date"
                      value={startDate}
                      onChange={(date) => {
                        if (date) {
                          setStartDate(date);
                        }
                      }}
                      required
                      size="xs"
                      error={startDateError}
                    />

                    <DateInput
                      label="End Date"
                      placeholder="Enter end date"
                      value={endDate}
                      onChange={(date) => {
                        if (date) {
                          setEndDate(date);
                        }
                      }}
                      required
                      size="xs"
                      error={endDateError}
                    />
                  </>
                ) : (
                  <>
                    <Text fz="sm" c="dimmed">
                      {startDate?.toDateString()}
                    </Text>
                    -
                    <Text fz="sm" c="dimmed">
                      {endDate?.toDateString()}
                    </Text>
                  </>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconClock stroke={1.5} size="1rem" className={classes.icon} />
                {editJob ? (
                  <>
                    <TimeInput
                      label="Start Time"
                      placeholder="Enter start time"
                      ref={startTimeRef}
                      rightSection={startTimeControl}
                      value={startTime}
                      onChange={(delta) => {
                        setStartTime(delta.target.value);
                      }}
                      required
                      error={startTimeError}
                      size="xs"
                    />

                    <TimeInput
                      label="End Time"
                      placeholder="Enter end time"
                      ref={endTimeRef}
                      rightSection={endTimeControl}
                      value={endTime}
                      onChange={(delta) => {
                        setEndTime(delta.target.value);
                      }}
                      required
                      error={endTimeError}
                      size="xs"
                    />
                  </>
                ) : (
                  <>
                    <Text fz="sm" c="dimmed">
                      {convertTime(startTime)}
                    </Text>
                    -
                    <Text fz="sm" c="dimmed">
                      {convertTime(endTime)}
                    </Text>
                  </>
                )}
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconCurrencyDollar
                  stroke={1.5}
                  size="1rem"
                  className={classes.icon}
                />
                {editJob ? (
                  <NumberInput
                    label="Hourly Rate"
                    placeholder="Enter hourly rate"
                    min={0}
                    value={hourlyRate}
                    onChange={(rate) => {
                      console.log("THE RATE:", rate);
                      if (typeof rate === "number") {
                        setHourlyRate(rate.toString());
                      } else {
                        setHourlyRate(rate);
                      }
                    }}
                    required
                    size="xs"
                  />
                ) : (
                  <Text fz="sm" c="dimmed">
                    {hourlyRate}/hr
                  </Text>
                )}
              </Group>
            </Grid.Col>
          </Grid>

          <Card.Section>
            <Grid px="xs" pb="lg" pt="xs">
              <Grid.Col span={12}>
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
                {editJob && (
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
                            setQualifications([
                              ...qualifications,
                              { category, keywords },
                            ]);
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
            </Grid>
          </Card.Section>

          {editJob ? (
            <Group justify="center" mt="md">
              <Button
                onClick={() => {
                  setEditJob(false);
                }}
                disabled={disableSave}
              >
                Save Profile
              </Button>
            </Group>
          ) : (
            <Group justify="center" mt="md">
              {currentUser === "Employer" && (
                <>
                  <Button
                    onClick={() => {
                      setEditJob(true);
                    }}
                  >
                    Edit Job Posting
                  </Button>
                  <Button onClick={handleDeletionOpened.open}>
                    Delete Job Posting
                  </Button>
                </>
              )}
            </Group>
          )}
        </Card>
      </Container>

      <Modal
        opened={deletionOpened}
        onClose={handleDeletionOpened.close}
        title="Delete Account"
        centered
      >
        <Title order={3} className={classes.name} ta="center">
          Are you sure you want to delete this job posting?
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt="xs">
          You will not be able to undo this action
        </Text>

        <Grid mt="lg">
          <Grid.Col span={6}>
            <Button
              fullWidth
              onClick={() => {
                handleDeletionOpened.close();
              }}
            >
              No, keep this job
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              fullWidth
              onClick={() => {
                //request to delete job in backend
                handleDeletionOpened.close();
                navigate("/job-search");
              }}
            >
              Yes, delete this job
            </Button>
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
};
