import React, { useContext, useEffect, useState } from "react";
import { CustomSearchBar } from "../components/CustomSearchBar";
import { Link } from "react-router-dom";
import { Container, Table, Checkbox, Group, Text } from "@mantine/core";
import classes from "../css_modules/ViewAccountsPage.module.css";
import { UserContext } from "../App";
import {
  getAllJobs,
  getJobPostsByCompany,
  getJobsByJobMatch,
} from "../api/jobPostApi";

export const ViewPostedJobsPage = () => {
  const userContext = useContext(UserContext);
  const currentUser = userContext?.currentUser;
  const userType = userContext?.userType;

  const [searchValue, setSearchValue] = useState<string>("");

  const [jobPosts, setJobPosts] = useState<any>();

  const [allJobPosts, setAllJobPosts] = useState<any>();
  const [jobMatches, setJobMatches] = useState<any>();

  useEffect(() => {
    if (currentUser && userType === "employer") {
      getJobPostsByCompany(currentUser).then((response: any) => {
        if (response[0]) {
          // If jobs are found
          setJobPosts(response);
        } else {
          // If no jobs are found
          setJobPosts([]);
        }
      });
    } else if (currentUser && userType) {
      //Get all jobs for professional
      getAllJobs().then((response: any) => {
        setJobPosts(response);
        setAllJobPosts(response);
      });

      getJobsByJobMatch(currentUser).then((response: any) => {
        console.log("RESPONSE:");
        console.log(response);
        if (response.length >= 0) {
          setJobMatches(response);
        }
      });
    }
  }, [currentUser, userType]);

  if (!userType || !jobPosts || (userType === "professional" && !jobMatches)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container size={600} my={20}>
        <CustomSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {userType !== "employer" && (
          <Group justify="center" mt="lg">
            <Checkbox
              label="Only Matched Jobs"
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  setJobPosts(jobMatches);
                } else {
                  setJobPosts(allJobPosts);
                }
              }}
            />
          </Group>
        )}

        {jobPosts.length > 0 ? (
          <Table highlightOnHover withTableBorder mt="lg">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Job ID</Table.Th>
                <Table.Th>Position Title</Table.Th>
                <Table.Th>Employer</Table.Th>
                <Table.Th>Start/End Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {jobPosts.map(
                (
                  data: {
                    companyJobId: string;
                    jobName: string;
                    employerId: string;
                    startDate: string;
                    endDate: string;
                  },
                  index: number
                ) =>
                  data.jobName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) && (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Link
                          to={
                            "/job/" + data.employerId + "/" + data.companyJobId
                          }
                          className={classes.link}
                        >
                          {data.companyJobId}
                        </Link>
                      </Table.Td>

                      <Table.Td>{data.jobName}</Table.Td>

                      <Table.Td>{data.employerId}</Table.Td>

                      <Table.Td>
                        {data.startDate.includes("T") ? (
                          <>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(data.startDate))}{" "}
                            -{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(data.endDate))}
                          </>
                        ) : (
                          <>
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(
                              new Date(data.startDate + "T00:00:00.000")
                            )}{" "}
                            -{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(data.endDate + "T00:00:00.000"))}
                          </>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  )
              )}
            </Table.Tbody>
          </Table>
        ) : (
          <>
            {userType === "employer" ? (
              <Text c="dimmed" size="lg" ta="center" mt={5}>
                Looks like you haven't posted any jobs yet...
              </Text>
            ) : (
              <Text c="dimmed" size="lg" ta="center" mt={5}>
                Looks like there aren't any jobs at the moment...
              </Text>
            )}
          </>
        )}
      </Container>
    </>
  );
};
