import React, { useEffect, useState } from "react";
import { CustomSearchBar } from "../components/CustomSearchBar";
import { Link } from "react-router-dom";
import { Container, Table } from "@mantine/core";
import classes from "../css_modules/ViewAccountsPage.module.css";
import { getAllProfessionals } from "../api/professionalApi";
import { getAllEmployers } from "../api/employerApi";

export const ViewAccountsPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [accounts, setAccounts] = useState<any>();

  useEffect(() => {
    getAllProfessionals().then((response: any) => {
      getAllEmployers().then((response2: any) => {
        setAccounts(response.concat(response2));
      });
    });
  }, []);

  useEffect(() => {}, [accounts]);

  if (!accounts) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container size={600} my={20}>
        <CustomSearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <Table highlightOnHover withTableBorder mt="xl">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Account Type</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {accounts.map(
              (data: any, index: number) =>
                data.username
                  .toLowerCase()
                  .includes(searchValue.toLowerCase()) && (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Link
                        to={`/profile/${data.username}`}
                        className={classes.link}
                      >
                        {data.username}
                      </Link>
                    </Table.Td>

                    {data.email ? (
                      <Table.Td>{data.email}</Table.Td>
                    ) : (
                      <Table.Td>{data.contactEmail}</Table.Td>
                    )}

                    {data.phone ? (
                      <Table.Td>{data.phone}</Table.Td>
                    ) : (
                      <Table.Td>{data.contactPhone}</Table.Td>
                    )}

                    {data.phone ? (
                      <Table.Td>Professional</Table.Td>
                    ) : (
                      <Table.Td>Employer</Table.Td>
                    )}
                  </Table.Tr>
                )
            )}
          </Table.Tbody>
        </Table>
      </Container>
    </>
  );
};
