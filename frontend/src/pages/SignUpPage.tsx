import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stepper,
  Group,
  Table,
} from "@mantine/core";
import classes from "../css_modules/SignInPage.module.css";
import Qualification from "../types/Qualification";
import { ProfessionalStep1, ProfessionalStep2, ProfessionalStep3, ProfessionalStep4 } from "../components/SignUpPage/ProfessionalSteps";
import { EmployerStep1, EmployerStep2, EmployerStep3 } from "../components/SignUpPage/EmployerSteps";
import { Step0 } from "../components/SignUpPage/Step0";
import Professional from "../types/Professional";
import Employer from "../types/Employer";

const professionalValues = {
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
  completionDate: "",
  qualifications: [],
};

const employerValues = {
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
};

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");
  const [professional, setProfessional] = useState<Professional>(professionalValues);
  const [employer, setEmployer] = useState<Employer>(employerValues);

  const [currentStep, setCurrentStep] = useState(0);

  const userContext = useContext(UserContext);
  const setCurrentUser = userContext?.setCurrentUser;

  if (!setCurrentUser) {
    return <div>Loading...</div>;
  }

  const signUp = () => {
    console.log("Signing up!");
  };

  return (
    <>
      <Container size={750} my={40}>
        <Title ta="center" className={classes.title}>
          Join us today!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{" "}
          <Anchor size="sm" component="button">
            <Link to="/signIn">Sign in</Link>
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {currentStep == 0 && (
            <Step0
              setAccountType={setAccountType}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 1 && (
            <ProfessionalStep1
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 2 && (
            <ProfessionalStep2
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 3 && (
            <ProfessionalStep3
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Professional" && currentStep == 4 && (
            <ProfessionalStep4
              professional={professional}
              setProfessional={setProfessional}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Employer" && currentStep == 1 && (
            <EmployerStep1
              employer={employer}
              setEmployer={setEmployer}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Employer" && currentStep == 2 && (
            <EmployerStep2
              employer={employer}
              setEmployer={setEmployer}
              setCurrentStep={setCurrentStep}
            />
          )}

          {accountType === "Employer" && currentStep == 3 && (
            <EmployerStep3
              employer={employer}
              setEmployer={setEmployer}
              setCurrentStep={setCurrentStep}
            />
          )}
        </Paper>
      </Container>
    </>
  );
};