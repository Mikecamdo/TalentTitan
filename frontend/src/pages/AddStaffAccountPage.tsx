import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const AddStaffAccountPage = () => {
    const userContext = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");


    const [disableButton, setDisableButton] = useState(true);

    const addAccount = () => {
        console.log("Adding account!");
    }

    useEffect(() => {
        if (firstName && lastName && phoneNumber && email) {
        setDisableButton(false);
        } else {
        setDisableButton(true);
        }
    }, [firstName, lastName, phoneNumber, email]);

    return (
        <>      
        <Container className="mt-3 mb-3">
            <div className="card">
            <div className="card-header py-3">
                <h1 className="fs-2 p-0 my-2" id="header">Add a New Staff Account</h1>
            </div>
            <div className="card-body">
                <Form>
                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">First Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(delta) => {
                            setFirstName(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Last Name</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(delta) => {
                            setLastName(delta.target.value);
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
                        value={phoneNumber}
                        onChange={(delta) => {
                            setPhoneNumber(delta.target.value);
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
                        value={email}
                        onChange={(delta) => {
                            setEmail(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Group controlId="amount_requested">
                        <Form.Label id="header">Username</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(delta) => {
                            setUsername(delta.target.value);
                        }}
                        />
                    </Form.Group>
                    </Col>
                </Row>
                </Form>

                <Button
                className="submitButton fs-5"
                disabled={disableButton}
                type="button"
                id="small-header"
                onClick={() => {
                    addAccount();
                }}
                >
                Add Account
                </Button>
            </div>
            </div>
        </Container>
        </>
    );
};
