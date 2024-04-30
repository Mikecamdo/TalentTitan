import {
  Container,
  Title,
  TextInput,
  NumberInput,
  Button,
  Table,
  Paper,
  Group,
  ActionIcon,
  rem,
} from "@mantine/core";
import { TimeInput, DateInput } from "@mantine/dates";
import { useState, useRef, useEffect, useContext } from "react";
import Qualification from "../types/Qualification";
import { IconClock } from "@tabler/icons-react";
import { addJobPost } from "../api/jobPostApi";
import { UserContext } from "../App";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { addQualifications } from "../api/qualificationApi";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

export const JobPostingPage = () => {
  const navigate = useNavigate();

  const [positionName, setPositionName] = useState("");
  const [positionId, setPositionId] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");

  const [disableAdd, setDisableAdd] = useState(true);
  const [disablePost, setDisablePost] = useState(true);

  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const inputRef = useRef<any>(null);
  const [cursorPosition, setCursorPosition] = useState(0);

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

  const rows = qualifications.map((qualification: Qualification) => (
    <Table.Tr>
      <Table.Td>{qualification.category}</Table.Td>
      <Table.Td>{qualification.keywords}</Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    if (
      positionName &&
      positionId &&
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
      setDisablePost(false);
    } else {
      setDisablePost(true);
    }
  }, [
    positionName,
    positionId,
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
    if (inputRef.current) {
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
      } else {
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

  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;

  if (!currentUser) {
    return <div>Loading...</div>;
  }

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

  const postJob = () => {
    addJobPost({
      employerId: currentUser,
      jobName: positionName,
      companyJobId: positionId,
      contactFirstName: contactFirstName,
      contactLastName: contactLastName,
      contactPhone: contactPhoneNumber,
      contactEmail: contactEmail,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      hourlyRate: hourlyRate.toString(),
    }).then((response: any) => {
      if (response === "Added Job Post") {
        addQualifications({
          employerId: currentUser,
          companyJobId: positionId,
          professionalUsername: null,
          categories: qualifications.map(qualification => qualification.category),
          keywords: qualifications.map(qualification => qualification.keywords),
        }).then((response: any) => {
          if (response === "Successfully added qualifications") {
            notifications.show({
              color: "green",
              title: "Success!",
              message: "Successfully posted job",
            });
            navigate("/job-search");
          } else {
            console.log("RESPONSE:");
            console.log(response);
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
      <Container size={750} my={20}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title>Post a Job</Title>

          <Group grow>
            <TextInput
              label="Position Name"
              placeholder="Enter position name"
              value={positionName}
              onChange={(delta) => {
                setPositionName(delta.target.value);
              }}
              required
            />

            <TextInput
              label="Position ID"
              placeholder="Enter position ID"
              value={positionId}
              onChange={(delta) => {
                setPositionId(delta.target.value);
              }}
              required
            />
          </Group>

          <Group grow>
            <TextInput
              label="Contact First Name"
              placeholder="Enter contact first name"
              value={contactFirstName}
              onChange={(delta) => {
                setContactFirstName(delta.target.value);
              }}
              required
            />

            <TextInput
              label="Contact Last Name"
              placeholder="Enter contact last name"
              value={contactLastName}
              onChange={(delta) => {
                setContactLastName(delta.target.value);
              }}
              required
            />
          </Group>

          <Group grow>
            <TextInput
              label="Contact Phone Number"
              placeholder="Enter contact phone number"
              value={contactPhoneNumber}
              onChange={(delta) => {
                setPhoneNumber(delta.target.value);
              }}
              required
              ref={inputRef}
              error={phoneError}
            />

            <TextInput
              label="Contact Email"
              placeholder="Enter contact email"
              value={contactEmail}
              onChange={(delta) => {
                setContactEmail(delta.target.value);
              }}
              required
              error={emailError}
            />
          </Group>

          <Group grow>
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
              error={endDateError}
            />
          </Group>

          <Group grow>
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
            />
          </Group>

          <NumberInput
            label="Hourly Rate"
            placeholder="Enter hourly rate"
            min={0}
            value={hourlyRate}
            onChange={(rate) => {
              if (typeof rate === "string") {
                setHourlyRate(+rate);
              } else {
                setHourlyRate(rate);
              }
            }}
            required
          />

          <Group grow>
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
              label="Keyword(s)"
              placeholder="Enter keyword(s)"
              value={keywords}
              onChange={(delta) => {
                setKeywords(delta.target.value);
              }}
              required
            />
          </Group>

          <Button
            disabled={disableAdd}
            onClick={() => {
              setQualifications([...qualifications, { category, keywords }]);
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

          <Button
            disabled={disablePost}
            onClick={() => {
              postJob();
            }}
          >
            Post Job
          </Button>
        </Paper>
      </Container>
    </>
  );
};
