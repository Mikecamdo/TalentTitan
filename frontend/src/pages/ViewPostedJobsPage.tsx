import React, { useContext, useState } from "react";
import { CustomSearchBar } from "../components/CustomSearchBar";
import { Link } from "react-router-dom";
import { Container, Table, Checkbox, Grid, Group } from "@mantine/core";
import classes from "../css_modules/ViewAccountsPage.module.css";
import { UserContext } from "../App";

export const ViewPostedJobsPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const userContext = useContext(UserContext);
  
  const userType = userContext?.userType;

  if (!userType) {
    return <div>Loading...</div>;
  }

  const dummyData = [
    {
      jobId: "SFTWRE1",
      positionTitle: "Software Engineer",
      employer: "Amazon",
      dates: "May 5 - May 21",
    },
    {
      jobId: "SFTWRE2",
      positionTitle: "Software Engineer",
      employer: "Walmart",
      dates: "June 5 - June 6",
    },
    {
      jobId: "UIUX1",
      positionTitle: "UI/UX Designer",
      employer: "Walmart",
      dates: "June 5 - June 6",
    },
  ];

  const rows = dummyData.map(
    (
      data: {
        jobId: string;
        positionTitle: string;
        employer: string;
        dates: string;
      },
      index: number
    ) =>
      userType === "employer"
        ? data.positionTitle
            .toLowerCase()
            .includes(searchValue.toLowerCase()) &&
          data.employer === "Walmart" && (
            <Table.Tr>
              <Link to={"/job"} className={classes.link}>
                <Table.Td>{data.jobId}</Table.Td>
              </Link>
              <Table.Td>{data.positionTitle}</Table.Td>
              <Link to={"/profile/Employer"} className={classes.link}>
                <Table.Td>{data.employer}</Table.Td>
              </Link>
              <Table.Td>{data.dates}</Table.Td>
            </Table.Tr>
          )
        : data.positionTitle
            .toLowerCase()
            .includes(searchValue.toLowerCase()) && (
            <Table.Tr>
              <Link to={"/job"} className={classes.link}>
                <Table.Td>{data.jobId}</Table.Td>
              </Link>
              <Table.Td>{data.positionTitle}</Table.Td>
              <Link to={"/profile/Employer"} className={classes.link}>
                <Table.Td>{data.employer}</Table.Td>
              </Link>
              <Table.Td>{data.dates}</Table.Td>
            </Table.Tr>
          )
  );

  return (
    <>
      <Container size={600} my={20}>
        <CustomSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {userType !== "employer" && (
          <Group justify="center" mt="lg">
            <Checkbox label="Only Matched Jobs" />
          </Group>
        )}

        <Table highlightOnHover withTableBorder mt="lg">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Job ID</Table.Th>
              <Table.Th>Position Title</Table.Th>
              <Table.Th>Employer</Table.Th>
              <Table.Th>Start/End Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
    </>
  );
};
