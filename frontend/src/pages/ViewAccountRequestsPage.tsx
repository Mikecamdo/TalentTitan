import { UserContext } from "../App";
import { useState, useEffect, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";

export const ViewAccountRequestsPage = () => {

    const [monthlyFee, setMonthlyFee] = useState<number | undefined>(undefined);
    const [comment, setComment] = useState<string>("");
    
    const [disableApprove, setDisableApprove] = useState(true);
    const [disableDeny, setDisableDeny] = useState(true);

    useEffect(() => {
        if (monthlyFee && comment) {
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
    

    return (<>
        <Row>
          <Tabs
            defaultActiveKey="employers"
            id="account-request-tabs"
            className="mb-3"
            fill
          >
            <Tab eventKey="employers" title="Employers">
                <Container fluid>
                  <Row>
                        <Col className="d-flex mb-4 mx-auto" xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                          <Card className="flex-fill">
                            <Card.Header className="pb-0 pt-3">
                              <Row>
                                <Col>
                                  <h5>Applicant: Google</h5>
                                </Col>
                                <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                  <h5 className="text-end">2/11/2024</h5>
                                </Col>
                              </Row>
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                <Row>
                                  <Col className="mb-3">
                                    <div>Mailing Address:</div>
                                    <div>P. Sherman 42 Wallaby Way</div>
                                    <div>Dallas, TX</div>
                                    <div>75275</div>
                                  </Col>
                                  <Col className="mb-3">
                                    <div>Contact Info:</div>
                                    <div>Bob Smith</div>
                                    <div>bsmith@gmail.com</div>
                                    <div>604-987-1541</div>
                                  </Col>
                                  <Col className="mb-3">
                                    <div>Username:</div>
                                    <div>Google1998</div>
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
                                    <Form.Group controlId="comment" className="col-12">
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
                                          
                                        }}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        disabled={disableDeny}
                                        className="btn-danger px-2"
                                        onClick={() => {
                                          
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
              </Tab>

              <Tab eventKey="professionals" title="Professionals">
                <Container fluid>
                  <Row>
                        <Col className="d-flex mb-4 mx-auto" xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                          <Card className="flex-fill">
                            <Card.Header className="pb-0 pt-3">
                              <Row>
                                <Col>
                                  <h5>Applicant: Bob Smith</h5>
                                </Col>
                                <Col xs={7} sm={8} md={8} lg={4} xl={3} xxl={3}>
                                  <h5 className="text-end">2/11/2024</h5>
                                </Col>
                              </Row>
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                <Row>
                                  <Col className="mb-3">
                                    <div>Mailing Address:</div>
                                    <div>6425 Boaz Lane</div>
                                    <div>Dallas, TX</div>
                                    <div>75205</div>
                                  </Col>
                                  <Col className="mb-3">
                                    <div>Contact Info:</div>
                                    <div>bsmith@gmail.com</div>
                                    <div>604-987-1541</div>
                                  </Col>
                                  <Col className="mb-3">
                                    <div>Username:</div>
                                    <div>BobTheBuilder</div>
                                  </Col>
                                </Row>

                                <Row>
                                    <Col className="mb-3">
                                        <div>Degree:</div>
                                        <div>Southern Methodist University</div>
                                        <div>B.S. Computer Science</div>
                                        <div>May 2024</div>
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
                                                <tr>
                                                    <td>Languages</td>
                                                    <td>Java, Python</td>
                                                </tr>

                                                <tr>
                                                    <td>Database</td>
                                                    <td>MySQL, Mongo DB</td>
                                                </tr>
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
                                    <Form.Group controlId="comment" className="col-12">
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
                                          
                                        }}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        disabled={disableDeny}
                                        className="btn-danger px-2"
                                        onClick={() => {
                                          
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
              </Tab>
          </Tabs>
        </Row >



        {/* <div className="col-1 mt-2 ps-4 ms-3">
          <Dropdown
            className="dropdown1"
            onSelect={(e) => {
              setSortValue(e);
            }}
          >
            <Dropdown.Toggle
              className="mt-2 dropdown-bg text-white"
              variant="info"
              id="small-header"
            >
              {sortValue}
            </Dropdown.Toggle>
            <Dropdown.Menu className="">
              <Dropdown.Item eventKey="Date">Date</Dropdown.Item>
              <Dropdown.Item eventKey="Amount">Amount</Dropdown.Item>
              <Dropdown.Item eventKey="Category">Category</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="mt-1 mb-3">
            <Button id="small-header" className="display-4 button btn submitButton text-decoration-none" onClick={() => navigate("/Home")}>Back</Button>
          </div>
        </div> */}
    </>);
}