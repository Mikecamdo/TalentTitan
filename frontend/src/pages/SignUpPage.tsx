import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Alert from "react-bootstrap/Alert";
import Qualification from "../types/Qualification";
import Table from "react-bootstrap/Table";

const professionalValues = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    userName: "",
    schoolName: "",
    degreeName: "",
    completionDate: "",
    qualifications: []
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
    userName: ""
}

export const SignUpPage = () => {
  const [professional, setProfessional] = useState(professionalValues);
  const [employer, setEmployer] = useState(employerValues);


  const [roleValue, setRoleValue] = useState("Select-Role");
  const [companyValue, setCompanyValue] = useState("Select-Company");
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState("");

  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");

  const [disableAdd, setDisableAdd] = useState(true);

  useEffect(() => {
    if (category && keywords) {
        setDisableAdd(false);
    } else {
        setDisableAdd(true);
    }
  }, [category, keywords]);
  
  const addQualification = () => {
      setQualifications([...qualifications, {category, keywords}]);
      setCategory("");
      setKeywords("");
  }

  const removeQualification = (index: number) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications.splice(index, 1);
    setQualifications(updatedQualifications);
  }

  const handleRoleSelect = (e: any) => {
    setRoleValue(e);
  };

  const handleCompanySelect = (e: any) => {
    setCompanyValue(e);
  };

  const createAccount = () => {
    // if (!validEmail(values.email)) {
    //   setError('Invalid email address. Please enter a valid email address.');
    //   return;
    // }
  };

  //the following function was inspired by code found at https://mailtrap.io/blog/validate-emails-in-react/
  const validEmail = (email: any) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

  return (
    <>
    <div>
      <div className="pt-5">
        <div className="bg-light rounded p-3 mx-auto p-md-5 pb-md-3 col-lg-6 col-sm-8">
          {error !== "" && (
            <Alert key={"danger"} variant={"danger"}>
              {error}
            </Alert>
          )}

          <Dropdown className="mt-4" onSelect={handleRoleSelect}>
            <Form.Label>Account Type</Form.Label>

            <Dropdown.Toggle
            className="col-12 text-white"
            variant="info"
            id="dropdown-menu"
            >
                {roleValue}
            </Dropdown.Toggle>

            <Dropdown.Menu className="col-12">
                <Dropdown.Item eventKey="Employer">Employer</Dropdown.Item>
                <Dropdown.Item eventKey="Professional">Professional</Dropdown.Item>
            </Dropdown.Menu>
           </Dropdown>

          <Form>
            {roleValue === "Professional" && (
                <>
                    <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter first name"
                        value={professional.firstName}
                        onChange={(delta) => {
                        setProfessional({ ...professional, firstName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter last name"
                        value={professional.lastName}
                        onChange={(delta) => {
                        setProfessional({ ...professional, lastName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter address"
                        value={professional.address}
                        onChange={(delta) => {
                        setProfessional({ ...professional, address: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter city"
                        value={professional.city}
                        onChange={(delta) => {
                        setProfessional({ ...professional, city: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter state"
                        value={professional.state}
                        onChange={(delta) => {
                        setProfessional({ ...professional, state: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="zipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter zip code"
                        value={professional.zipCode}
                        onChange={(delta) => {
                        setProfessional({ ...professional, zipCode: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter phone number"
                        value={professional.phoneNumber}
                        onChange={(delta) => {
                        setProfessional({ ...professional, phoneNumber: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={professional.email}
                        onChange={(delta) => {
                        setProfessional({ ...professional, email: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter username"
                        value={professional.userName}
                        onChange={(delta) => {
                        setProfessional({ ...professional, userName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="schoolName">
                    <Form.Label>School Name</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter school name"
                        value={professional.schoolName}
                        onChange={(delta) => {
                        setProfessional({ ...professional, schoolName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="degreeName">
                    <Form.Label>Degree Name</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter degree name"
                        value={professional.schoolName}
                        onChange={(delta) => {
                        setProfessional({ ...professional, degreeName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="completionDate">
                    <Form.Label>Completion Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter completion date"
                        value={professional.completionDate}
                        onChange={(delta) => {
                        setProfessional({ ...professional, completionDate: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Label id="header">Qualifications</Form.Label>
                    <Row className="mb-3">
                      <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    
                      <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Category</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(delta) => {
                            setCategory(delta.target.value);
                        }}
                        />
                      </Form.Group>
                      </Col>

                      <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <Form.Group controlId="amount_requested">
                          <Form.Label id="header">Keyword(s)</Form.Label>
                          <Form.Control
                          type="text"
                          placeholder="Enter keyword(s)"
                          value={keywords}
                          onChange={(delta) => {
                              setKeywords(delta.target.value);
                          }}
                          />
                      </Form.Group>
                      </Col>

                      <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className="mt-3">
                        <Form.Group controlId="amount_requested">
                            <Button
                            disabled={disableAdd}
                            onClick={() => {
                                addQualification();
                            }}>
                                Add Qualification
                            </Button>
                        </Form.Group>
                      </Col>
                  </Row>

                  <Row className="mb-3">
                      <Form.Group controlId="claim_description">
                      
                      <Table striped bordered hover>
                          <thead>
                              <tr>
                                  <th>Category</th>
                                  <th>Keywords/Key phrases</th>
                              </tr>
                          </thead>
                          <tbody>
                              {qualifications.map((qualification, index) => (
                                  <tr key={index}>
                                      <td>{qualification.category}</td>
                                      <td>{qualification.keywords}</td>
                                      <td>
                                        <Button onClick={() => {
                                          removeQualification(index);
                                        }}>
                                          Remove
                                        </Button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </Table>
                      </Form.Group>
                  </Row>
                </>
            )}

            {roleValue === "Employer" && (
                <>
                    <Form.Group className="mb-3" controlId="companyName">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter company name"
                        value={employer.companyName}
                        onChange={(delta) => {
                        setEmployer({ ...employer, companyName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter address"
                        value={employer.address}
                        onChange={(delta) => {
                        setEmployer({ ...employer, address: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter city"
                        value={employer.city}
                        onChange={(delta) => {
                        setEmployer({ ...employer, city: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter state"
                        value={employer.state}
                        onChange={(delta) => {
                        setEmployer({ ...employer, state: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="zipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter zip code"
                        value={employer.zipCode}
                        onChange={(delta) => {
                        setEmployer({ ...employer, zipCode: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Contact's First Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter first name"
                        value={employer.contactFirstName}
                        onChange={(delta) => {
                        setEmployer({ ...employer, contactFirstName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Contact's Last Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter last name"
                        value={employer.contactLastName}
                        onChange={(delta) => {
                        setEmployer({ ...employer, contactLastName: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Contact's Phone Number</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter phone number"
                        value={employer.contactPhoneNumber}
                        onChange={(delta) => {
                        setEmployer({ ...employer, contactPhoneNumber: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Contact's Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={employer.contactEmail}
                        onChange={(delta) => {
                        setEmployer({ ...employer, contactEmail: delta.target.value });
                        }}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter username"
                        value={employer.userName}
                        onChange={(delta) => {
                        setEmployer({ ...employer, userName: delta.target.value });
                        }}
                    />
                    </Form.Group>
                </>
            )}
            
            <Button
              className="col-12 mt-3 button-bg"
              disabled={disableButton}
              onClick={() => {
                createAccount();
              }}
            >
              Sign up
            </Button>

            <Container fluid>
              <Row className="text-center mt-4">
                <Col>
                  <p className="text-muted mb-0">Already have an account?</p>
                  <NavLink to={"/signIn"}>
                    Sign in
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
};
