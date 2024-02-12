import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Qualification from "../types/Qualification";

export const JobPostingPage = () => {
    const userContext = useContext(UserContext);

    const [positionName, setPositionName] = useState("");
    const [positionId, setPositionId] = useState("");
    const [contactFirstName, setContactFirstName] = useState("");
    const [contactLastName, setContactLastName] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");

    const [qualifications, setQualifications] = useState<Qualification[]>([]);
    const [category, setCategory] = useState("");
    const [keywords, setKeywords] = useState("");

    const [disableButton, setDisableButton] = useState(true);

    const postJob = () => {
        console.log("Posting job!");
    }

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

    useEffect(() => {
        if (positionName && positionId && contactFirstName && contactLastName
         && contactPhoneNumber && contactEmail && startDate && endDate && hourlyRate) {
        setDisableButton(false);
        } else {
        setDisableButton(true);
        }
    }, [positionName, positionId, contactFirstName, contactLastName, 
        contactPhoneNumber, contactEmail, startDate, endDate, hourlyRate]);

    return (
        <>      
        <Container className="mt-3 mb-3">
            <div className="card">
            <div className="card-header py-3">
                <h1 className="fs-2 p-0 my-2" id="header">Post a New Job</h1>
            </div>
            <div className="card-body">
                <Form>
                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Position Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter position name"
                        value={positionName}
                        onChange={(delta) => {
                            setPositionName(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Position ID</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter position ID"
                        value={positionId}
                        onChange={(delta) => {
                            setPositionId(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Contact First Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={contactFirstName}
                        onChange={(delta) => {
                            setContactFirstName(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Contact Last Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={contactLastName}
                        onChange={(delta) => {
                            setContactLastName(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Phone Number</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={contactPhoneNumber}
                        onChange={(delta) => {
                            setContactPhoneNumber(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Email</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={contactEmail}
                        onChange={(delta) => {
                            setContactEmail(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="order_date">
                        <Form.Label id="header">Start Date</Form.Label>
                        <Form.Control
                        type="date"
                        value={startDate}
                        className="w-100"
                        onChange={(delta) => {
                            setStartDate(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="order_date">
                        <Form.Label id="header">End Date</Form.Label>
                        <Form.Control
                        type="date"
                        value={endDate}
                        className="w-100"
                        onChange={(delta) => {
                            setEndDate(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Start Time</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter start time"
                        value={startTime}
                        onChange={(delta) => {
                            setStartTime(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">End Time</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter end time"
                        value={endTime}
                        onChange={(delta) => {
                            setEndTime(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Hourly Rate</Form.Label>
                        <Form.Control
                        type="number"
                        min="0.00"
                        step="0.01"
                        placeholder="Enter hourly rate"
                        value={hourlyRate}
                        onChange={(delta) => {
                            setHourlyRate(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

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

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className="mt-2">
                    <Form.Group controlId="amount_requested">
                        <Button
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
                </Form>

                <Button
                disabled={disableButton}
                type="button"
                onClick={() => {
                    postJob();
                }}
                >
                Post Job
                </Button>
            </div>
            </div>
        </Container>
        </>
    );
};
