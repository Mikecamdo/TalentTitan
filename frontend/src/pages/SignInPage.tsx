import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const formValues = {
  username: "",
  password: "",
};

export const SignInPage = () => {
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState(formValues);
  const [error, setError] = useState("");

  useEffect(() => {
    if (values.username && values.password) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [values]);

  const userContext = useContext(UserContext);
  const setCurrentUser = userContext?.setCurrentUser;

  if (!setCurrentUser) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const login = () => {
    setCurrentUser(values.username);
    navigate("/accountRequests");
  };

  return (
    <>
    <div className="light-bg">
      <div className="pt-5">
        <div className="bg-light rounded p-3 mx-auto p-md-5 pb-md-3 col-lg-5 col-sm-8">
          {error !== "" && (
            <Alert key={"danger"} variant={"danger"}>
              {error}
            </Alert>
          )}

          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="rounded p-4 p-sm-3"
          >
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="username"
                placeholder="Enter username"
                value={values.username}
                onChange={(delta) => {
                  setValues({ ...values, username: delta.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={(delta) => {
                  setValues({ ...values, password: delta.target.value });
                }}
              />
            </Form.Group>

            <Button
              className="col-12 mt-2 button-bg"
              disabled={disableButton}
              onClick={() => {
                login();
              }}
            >
              Submit
            </Button>

            <Container fluid>
              <Row className="text-center mt-4">
                <Col>
                  <p className="text-muted mb-0">Don't have an account?</p>
                  <NavLink to={"/signup"} className="text-decoration-none">
                    Sign up
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </Form>
        <NavLink to={"/professional"} className="text-decoration-none">
          Professional Test
        </NavLink>
        <br/>
        <NavLink to={"/employeer"} className="text-decoration-none">
          Employeer Test
        </NavLink>
        <br/>
        <NavLink to={"/profile"} className="text-decoration-none">
          Profile Test
        </NavLink>
        <br/>
        <NavLink to={"/staff"} className="text-decoration-none">
          Staff Test
        </NavLink>
        <br/>
        </div>
      </div>
    </div>
    </>
  );
};
