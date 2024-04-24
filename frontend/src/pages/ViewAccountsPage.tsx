import React, { useState } from "react";
import { CustomSearchBar } from "../components/CustomSearchBar";
import { Link } from "react-router-dom";
import { Container, Table } from "@mantine/core";
import classes from "../css_modules/ViewAccountsPage.module.css";
import { getAllProfessionals } from "../api/professionalApi";
import { getAllEmployers } from "../api/employerApi";

export const ViewAccountsPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const getAccounts = () => {
    getAllProfessionals(
    ).then((response: any) => {
      const Data = response;
      const rows = Data.map(
        (data: any, index: number) =>
          data.name.toLowerCase().includes(searchValue.toLowerCase()) && (
            <Table.Tr>
              <Link to={`/profile/${data.name}`} className={classes.link}>
                <Table.Td>{data.name}</Table.Td>
              </Link>
              <Table.Td>{data.email}</Table.Td>
              <Table.Td>{data.phone}</Table.Td>
              <Table.Td>Professional</Table.Td>
            </Table.Tr>
          )
      );
    })

    getAllEmployers(
      ).then((response: any) => {
        const dataEmployer = response;
        const rows = dataEmployer.map(
          (data: any, index: number) =>
            data.name.toLowerCase().includes(searchValue.toLowerCase()) && (
              <Table.Tr>
                <Link to={`/profile/Employer`} className={classes.link}>
                  <Table.Td>{data.name}</Table.Td>
                </Link>
                <Table.Td>{data.email}</Table.Td>
                <Table.Td>{data.phone}</Table.Td>
                <Table.Td>Employer</Table.Td>
              </Table.Tr>
            )
        );
      })
  }
  
  const dummyData = [
    {
      name: "",
      email: "",
      phone: "",
      accountType: "",
    },
    {
      name: "Bob Smith",
      email: "bsmith@gmail.com",
      phone: "(123) 456-7890",
      accountType: "Professional",
    },
    {
      name: "Frank Ocean",
      email: "focean@outlook.com",
      phone: "(510) 741-9003",
      accountType: "Professional",
    },
    {
      name: "Bob the Builder",
      email: "bbuilder@gmail.com",
      phone: "(832) 234-9463",
      accountType: "Employer",
    },
    {
      name: "Jerry Smith",
      email: "jdawg@gmail.com",
      phone: "(123) 456-7890",
      accountType: "Professional",
    },
    {
      name: "Walmart",
      email: "dmcmillon@walmart.com",
      phone: "(479) 273-4000",
      accountType: "Employer",
    }
  ];

  const rows = dummyData.map(
    (data: any, index: number) =>
      data.name.toLowerCase().includes(searchValue.toLowerCase()) && (
        <Table.Tr>
          {data.accountType === "Professional" ? (
            <Link to={`/profile/${data.name}`} className={classes.link}>
              <Table.Td>{data.name}</Table.Td>
            </Link>
          ) : (
            <Link to={`/profile/Employer`} className={classes.link}>
              <Table.Td>{data.name}</Table.Td>
            </Link>
          )}
          <Table.Td>{data.email}</Table.Td>
          <Table.Td>{data.phone}</Table.Td>
          <Table.Td>{data.accountType}</Table.Td>
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

        <Table highlightOnHover withTableBorder mt="xl">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Account Type</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Container>
    </>
  );
};
