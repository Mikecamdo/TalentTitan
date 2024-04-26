import { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {
  getAllNewProfessionals,
  approveNewProfessional,
  denyNewProfessional,
} from "../api/newProfessionalRequestApi";
import {
  getAllNewEmployers,
  approveNewEmployer,
  denyNewEmployer,
} from "../api/newEmployerRequestApi";
import {
  getAllDeleteProfessionalsRequests,
  approveDeleteProfessional,
  denyDeleteProfessional,
} from "../api/deleteProfessionalRequestApi";
import {
  getAllDeleteEmployersRequests,
  approveDeleteEmployer,
  denyDeleteEmployer,
} from "../api/deleteEmployerRequestApi";
import { notifications } from "@mantine/notifications";
import { getQualificationsByProfessional } from "../api/qualificationApi";
import Qualification from "../types/Qualification";

export const ViewAccountRequestsPage = () => {
  const [monthlyFee, setMonthlyFee] = useState<number | undefined>(undefined);
  const [comment, setComment] = useState<string>("");

  const [disableApprove, setDisableApprove] = useState(true);
  const [disableDeny, setDisableDeny] = useState(true);
  const [disableDeleteApprove, setDisableDeleteApprove] = useState(false);

  const [professionalsRequests, setProfessionalsRequests] = useState<any[]>([]);
  const [employersRequests, setEmployersRequests] = useState<any[]>([]);

  const [deleteProfessionalsRequests, setDeleteProfessionalsRequests] =
    useState<any[]>([]);
  const [deleteEmployersRequests, setDeleteEmployersRequests] = useState<any[]>(
    []
  );

  const [gotNewProfessionals, setGotNewProfessionals] = useState(false);
  const [gotNewEmployers, setGotNewEmployers] = useState(false);
  const [gotDeleteProfessionals, setGotDeleteProfessionals] = useState(false);
  const [gotDeleteEmployers, setGotDeleteEmployers] = useState(false);

  const [newEmployerCounter, setNewEmployerCounter] = useState(0);
  const [newProfessionalCounter, setNewProfessionalCounter] = useState(0);
  const [deleteProfessionalCounter, setDeleteProfessionalCounter] = useState(0);
  const [deleteEmployerCounter, setDeleteEmployerCounter] = useState(0);

  const [qualifications, setQualifications] = useState<any>();

  useEffect(() => {
    getAllNewProfessionals().then((response: any) => {
      if (response) {
        setProfessionalsRequests(response);

        if (response.length > 0) {
          getQualificationsByProfessional(response[0].username).then(
            (response: any) => {
              if (response.categories) {
                let quals = [];

                for (let i = 0; i < response.categories.length; i++) {
                  quals.push({
                    category: response.categories[i],
                    keywords: response.keywords[i],
                  });
                }

                console.log("ADDING QUALS");
                console.log(quals);

                setQualifications(quals);
                setGotNewProfessionals(true);
              } else {
                notifications.show({
                  color: "red",
                  title: "Error!",
                  message: "Could not retrieve qualifications",
                });
              }
            }
          );
        } else {
          setGotNewProfessionals(true);
        }
      }
    });

    getAllNewEmployers().then((response: any) => {
      if (response) {
        setEmployersRequests(response);
      }
      setGotNewEmployers(true);
    });

    getAllDeleteProfessionalsRequests().then((response: any) => {
      if (response) {
        setDeleteProfessionalsRequests(response);
      }
      setGotDeleteProfessionals(true);
    });

    getAllDeleteEmployersRequests().then((response: any) => {
      if (response) {
        setDeleteEmployersRequests(response);
      }
      setGotDeleteEmployers(true);
    });
  }, []);

  useEffect(() => {
    if (monthlyFee) {
      setDisableDeny(true);
      setDisableApprove(false);
    } else if (comment) {
      setDisableDeny(false);
      setDisableApprove(true);
    } else {
      setDisableDeny(true);
      setDisableApprove(true);
    }
  }, [monthlyFee, comment]);

  useEffect(() => {
    if (professionalsRequests.length > newProfessionalCounter) {
      setGotNewProfessionals(false);
      getQualificationsByProfessional(
        professionalsRequests[newProfessionalCounter].username
      ).then((response: any) => {
        if (response.categories) {
          let quals = [];

          for (let i = 0; i < response.categories.length; i++) {
            quals.push({
              category: response.categories[i],
              keywords: response.keywords[i],
            });
          }

          console.log("ADDING QUALS");
          console.log(quals);

          setQualifications(quals);
          setGotNewProfessionals(true);
        } else {
          notifications.show({
            color: "red",
            title: "Error!",
            message: "Could not retrieve qualifications",
          });
        }
      });
    }
  }, [newProfessionalCounter]);

  const approveNewProfessionalRequest = () => {
    if (monthlyFee) {
      approveNewProfessional({
        username: professionalsRequests[newProfessionalCounter].username,
        amountDue: monthlyFee.toString(),
        dueDate: "2024-05-01",
        comment: comment,
      }).then((response: any) => {
        console.log("THE RESPONSE");
        console.log(response);
        if (response === "Approved request successfully") {
          setNewProfessionalCounter(newProfessionalCounter + 1);
          notifications.show({
            color: "green",
            title: "Success!",
            message: response,
          });
        } else {
          notifications.show({
            color: "red",
            title: "Error!",
            message: "Could not approve request",
          });
        }
      });
    }
  };

  const approveNewEmployerRequest = () => {
    if (monthlyFee) {
      approveNewEmployer({
        username: employersRequests[newEmployerCounter].username,
        amountDue: monthlyFee.toString(),
        dueDate: "2024-05-01",
        comment: comment,
      }).then((response: any) => {
        console.log("THE RESPONSE");
        console.log(response);
        if (response === "Approved request successfully") {
          setNewEmployerCounter(newEmployerCounter + 1);
          notifications.show({
            color: "green",
            title: "Success!",
            message: response,
          });
        } else {
          notifications.show({
            color: "red",
            title: "Error!",
            message: "Could not approve request",
          });
        }
      });
    }
  };

  const approveDeleteProfessionalRequest = () => {
    approveDeleteProfessional(
      deleteProfessionalsRequests[deleteProfessionalCounter].professionalId
    ).then((response: any) => {
      console.log("THE RESPONSE");
      console.log(response);
      if (response === "Professional successfully deleted") {
        setDeleteProfessionalCounter(deleteProfessionalCounter + 1);
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Could not approve deletion request",
        });
      }
    });
  };

  const approveDeleteEmployerRequest = () => {
    approveDeleteEmployer(
      deleteEmployersRequests[deleteEmployerCounter].employerId
    ).then((response: any) => {
      console.log("THE RESPONSE");
      console.log(response);
      if (response === "Employer successfully deleted") {
        setDeleteEmployerCounter(deleteEmployerCounter + 1);
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Could not approve deletion request",
        });
      }
    });
  };

  const denyNewEmployerRequest = () => {
    denyNewEmployer({
      username: employersRequests[newEmployerCounter].username,
      comment: comment,
    }).then((response: any) => {
      console.log("THE RESPONSE");
      console.log(response);
      if (response === "Denied request successfully") {
        setNewEmployerCounter(newEmployerCounter + 1);
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Could not approve request",
        });
      }
    });
  };

  const denyDeleteEmployerRequest = () => {
    denyDeleteEmployer({
      username: deleteEmployersRequests[deleteEmployerCounter].employerId,
      comment: comment,
    }).then((response: any) => {
      console.log("THE RESPONSE");
      console.log(response);
      if (response === "Request successfully denied") {
        setDeleteEmployerCounter(deleteEmployerCounter + 1);
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Could not approve request",
        });
      }
    });
  };

  const denyNewProfessionalRequest = () => {
    denyNewProfessional({
      username: professionalsRequests[newProfessionalCounter].username,
      comment: comment,
    }).then((response: any) => {
      console.log("THE RESPONSE");
      console.log(response);
      if (response === "Denied request successfully") {
        setNewProfessionalCounter(newProfessionalCounter + 1);
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Could not approve request",
        });
      }
    });
  };

  const denyDeleteProfessionalRequest = () => {
    denyDeleteProfessional({
      username:
        deleteProfessionalsRequests[deleteProfessionalCounter].professionalId,
      comment: comment,
    }).then((response: any) => {
      console.log("THE RESPONSE");
      console.log(response);
      if (response === "Request successfully denied") {
        setDeleteProfessionalCounter(deleteProfessionalCounter + 1);
        notifications.show({
          color: "green",
          title: "Success!",
          message: response,
        });
      } else {
        notifications.show({
          color: "red",
          title: "Error!",
          message: "Could not approve request",
        });
      }
    });
  };

  if (
    !gotNewProfessionals ||
    !gotNewEmployers ||
    !gotDeleteProfessionals ||
    !gotDeleteEmployers
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Tabs
          defaultActiveKey="professionals"
          id="account-request-tabs"
          className="mb-3 "
          fill
        >
          <Tab eventKey="employers" title="Employers">
            <Tabs
              defaultActiveKey="employers-new"
              id="employer-account-request-tabs"
              className="mb-3 "
              fill
            >
              <Tab
                eventKey="employers-new"
                title="New Employer Account Requests"
              >
                {employersRequests.length > newEmployerCounter ? (
                  <Container fluid>
                    <Row>
                      <Col
                        className="d-flex mb-4 mx-auto"
                        xs={12}
                        sm={12}
                        md={10}
                        lg={10}
                        xl={10}
                        xxl={10}
                      >
                        <Card className="flex-fill">
                          <Card.Header className="pb-0 pt-3 button-bg text-light">
                            <Row>
                              <Col>
                                <h5>
                                  Applicant:{" "}
                                  {
                                    employersRequests[newEmployerCounter]
                                      .companyName
                                  }
                                </h5>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                              <Row>
                                <Col className="mb-3">
                                  <div>Mailing Address:</div>
                                  <div>
                                    {
                                      employersRequests[newEmployerCounter]
                                        .addressLine
                                    }
                                  </div>
                                  <div>
                                    {employersRequests[newEmployerCounter].city}
                                    ,{" "}
                                    {
                                      employersRequests[newEmployerCounter]
                                        .state
                                    }
                                  </div>
                                  <div>
                                    {
                                      employersRequests[newEmployerCounter]
                                        .zipCode
                                    }
                                  </div>
                                </Col>
                                <Col className="mb-3">
                                  <div>Contact Info:</div>
                                  <div>
                                    {
                                      employersRequests[newEmployerCounter]
                                        .contactFirstName
                                    }{" "}
                                    {
                                      employersRequests[newEmployerCounter]
                                        .contactLastName
                                    }
                                  </div>
                                  <div>
                                    {
                                      employersRequests[newEmployerCounter]
                                        .contactEmail
                                    }
                                  </div>
                                  <div>
                                    {
                                      employersRequests[newEmployerCounter]
                                        .contactPhone
                                    }
                                  </div>
                                </Col>
                                <Col className="mb-3">
                                  <div>Username:</div>
                                  <div>
                                    {
                                      employersRequests[newEmployerCounter]
                                        .username
                                    }
                                  </div>
                                </Col>
                                <hr />
                              </Row>

                              <Row>
                                <Col>
                                  <Form>
                                    <Form.Label>Monthly Fee:</Form.Label>
                                    <Form.Group
                                      className="col-2"
                                      controlId="monthly-fee"
                                    >
                                      <Form.Control
                                        value={monthlyFee}
                                        type="number"
                                        min="0.00"
                                        step="0.01"
                                        onChange={(delta) => {
                                          if (delta.target.value) {
                                            setMonthlyFee(+delta.target.value);
                                          } else {
                                            setMonthlyFee(undefined);
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Form>
                                </Col>
                              </Row>

                              <Row className="my-2">
                                <Form.Group
                                  controlId="comment"
                                  className="col-12"
                                >
                                  <Form.Label>Comments:</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    name="comment"
                                    placeholder="Add comments"
                                    value={comment}
                                    rows={5}
                                    onChange={(delta) => {
                                      setComment(delta.target.value);
                                    }}
                                  />
                                </Form.Group>
                              </Row>

                              <Row className="mt-3">
                                <Col>
                                  <Button
                                    disabled={disableApprove}
                                    className="btn-success px-3 pt-2 me-2"
                                    onClick={() => {
                                      approveNewEmployerRequest();
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    disabled={disableDeny}
                                    className="btn-danger px-2"
                                    onClick={() => {
                                      denyNewEmployerRequest();
                                    }}
                                  >
                                    Deny
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <div>No requests</div>
                )}
              </Tab>
              <Tab
                eventKey="employers-delete"
                title="Delete Employer Account Requests"
              >
                {deleteEmployersRequests.length > deleteEmployerCounter ? (
                  <Container fluid>
                    <Row>
                      <Col
                        className="d-flex mb-4 mx-auto"
                        xs={12}
                        sm={12}
                        md={10}
                        lg={10}
                        xl={10}
                        xxl={10}
                      >
                        <Card className="flex-fill">
                          <Card.Header className="pb-0 pt-3 button-bg text-light">
                            <Row>
                              <Col>
                                <h5>
                                  User:{" "}
                                  {
                                    deleteEmployersRequests[
                                      deleteEmployerCounter
                                    ].employerId
                                  }
                                </h5>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                              <Row className="my-2">
                                <Form.Group
                                  controlId="comment"
                                  className="col-12"
                                >
                                  <Form.Label>Comments:</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    name="comment"
                                    placeholder="Add comments"
                                    value={comment}
                                    rows={5}
                                    onChange={(delta) => {
                                      setComment(delta.target.value);
                                    }}
                                  />
                                </Form.Group>
                              </Row>

                              <Row className="mt-3">
                                <Col>
                                  <Button
                                    disabled={disableDeleteApprove}
                                    className="btn-success px-3 pt-2 me-2"
                                    onClick={() => {
                                      approveDeleteEmployerRequest();
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    disabled={disableDeny}
                                    className="btn-danger px-2"
                                    onClick={() => {
                                      denyDeleteEmployerRequest();
                                    }}
                                  >
                                    Deny
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <div>No requests</div>
                )}
              </Tab>
            </Tabs>
          </Tab>

          <Tab eventKey="professionals" title="Professionals">
            <Tabs
              defaultActiveKey="professionals-new"
              id="professional-account-request-tabs"
              className="mb-3 "
              fill
            >
              <Tab
                eventKey="professionals-new"
                title="New Professional Account Requests"
              >
                {professionalsRequests.length > newProfessionalCounter ? (
                  <Container fluid>
                    <Row>
                      <Col
                        className="d-flex mb-4 mx-auto"
                        xs={12}
                        sm={12}
                        md={10}
                        lg={10}
                        xl={10}
                        xxl={10}
                      >
                        <Card className="flex-fill">
                          <Card.Header className="pb-0 pt-3 button-bg text-light">
                            <Row>
                              <Col>
                                <h5>
                                  Applicant:{" "}
                                  {
                                    professionalsRequests[
                                      newProfessionalCounter
                                    ].firstName
                                  }{" "}
                                  {
                                    professionalsRequests[
                                      newProfessionalCounter
                                    ].lastName
                                  }
                                </h5>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                              <Row>
                                <Col className="mb-3">
                                  <div>Mailing Address:</div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].addressLine
                                    }
                                  </div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].city
                                    }
                                    ,{" "}
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].state
                                    }
                                  </div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].zipCode
                                    }
                                  </div>
                                </Col>
                                <Col className="mb-3">
                                  <div>Contact Info:</div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].email
                                    }
                                  </div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].phone
                                    }
                                  </div>
                                </Col>
                                <Col className="mb-3">
                                  <div>Username:</div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].username
                                    }
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col className="mb-3">
                                  <div>Degree:</div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].schoolName
                                    }
                                  </div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].degreeName
                                    }
                                  </div>
                                  <div>
                                    {
                                      professionalsRequests[
                                        newProfessionalCounter
                                      ].completionDate
                                    }
                                  </div>
                                </Col>

                                <Col className="mb-3">
                                  <div>Qualifications:</div>
                                  <Table striped bordered hover>
                                    <thead>
                                      <tr>
                                        <th>Category</th>
                                        <th>Keywords/Key phrases</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {qualifications &&
                                        qualifications.map(
                                          (
                                            qualification: Qualification,
                                            index: number
                                          ) => {
                                            return (
                                              <tr key={index}>
                                                <td>
                                                  {qualification.category}
                                                </td>
                                                <td>
                                                  {qualification.keywords}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                    </tbody>
                                  </Table>
                                </Col>

                                <hr />
                              </Row>

                              <Row>
                                <Col>
                                  <Form>
                                    <Form.Label>Monthly Fee:</Form.Label>
                                    <Form.Group
                                      className="col-2"
                                      controlId="monthly-fee"
                                    >
                                      <Form.Control
                                        value={monthlyFee}
                                        type="number"
                                        min="0.00"
                                        step="0.01"
                                        onChange={(delta) => {
                                          if (delta.target.value) {
                                            setMonthlyFee(+delta.target.value);
                                          } else {
                                            setMonthlyFee(undefined);
                                          }
                                        }}
                                      />
                                    </Form.Group>
                                  </Form>
                                </Col>
                              </Row>

                              <Row className="my-2">
                                <Form.Group
                                  controlId="comment"
                                  className="col-12"
                                >
                                  <Form.Label>Comments:</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    name="comment"
                                    placeholder="Add comments"
                                    value={comment}
                                    rows={5}
                                    onChange={(delta) => {
                                      setComment(delta.target.value);
                                    }}
                                  />
                                </Form.Group>
                              </Row>

                              <Row className="mt-3">
                                <Col>
                                  <Button
                                    disabled={disableApprove}
                                    className="btn-success px-3 pt-2 me-2"
                                    onClick={() => {
                                      approveNewProfessionalRequest();
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    disabled={disableDeny}
                                    className="btn-danger px-2"
                                    onClick={() => {
                                      denyNewProfessionalRequest();
                                    }}
                                  >
                                    Deny
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <div>No requests</div>
                )}
              </Tab>
              <Tab
                eventKey="professionals-delete"
                title="Delete Professional Account Requests"
              >
                {deleteProfessionalsRequests.length >
                deleteProfessionalCounter ? (
                  <Container fluid>
                    <Row>
                      <Col
                        className="d-flex mb-4 mx-auto"
                        xs={12}
                        sm={12}
                        md={10}
                        lg={10}
                        xl={10}
                        xxl={10}
                      >
                        <Card className="flex-fill">
                          <Card.Header className="pb-0 pt-3 button-bg text-light">
                            <Row>
                              <Col>
                                <h5>
                                  User:{" "}
                                  {
                                    deleteProfessionalsRequests[
                                      deleteProfessionalCounter
                                    ].professionalId
                                  }
                                </h5>
                              </Col>
                            </Row>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                              <Row className="my-2">
                                <Form.Group
                                  controlId="comment"
                                  className="col-12"
                                >
                                  <Form.Label>Comments:</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    name="comment"
                                    placeholder="Add comments"
                                    value={comment}
                                    rows={5}
                                    onChange={(delta) => {
                                      setComment(delta.target.value);
                                    }}
                                  />
                                </Form.Group>
                              </Row>

                              <Row className="mt-3">
                                <Col>
                                  <Button
                                    disabled={disableDeleteApprove}
                                    className="btn-success px-3 pt-2 me-2"
                                    onClick={() => {
                                      approveDeleteProfessionalRequest();
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    disabled={disableDeny}
                                    className="btn-danger px-2"
                                    onClick={() => {
                                      denyDeleteProfessionalRequest();
                                    }}
                                  >
                                    Deny
                                  </Button>
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                ) : (
                  <div>No requests</div>
                )}
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </Row>
    </>
  );
};
