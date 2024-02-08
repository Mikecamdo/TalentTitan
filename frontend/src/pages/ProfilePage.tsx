import React from "react";
import { Button, Card, CardHeader, Col, Container, Image, Row } from "react-bootstrap";

export const ProfilePage = () => {
    return (
        <>
        <Container className=" rounded">
            <Card className="bg-main rounded">
                {/* <CardHeader className="button-bg">
                    <Card.Title>
                        Username
                    </Card.Title>
                </CardHeader> */}

                <Card.Body className="bg-main">
                    <Row>
                        <Col className="justify-center" sm="auto">
                            <Image src="./default-avatar.png" width={"150px"} height={"150px"}></Image>
                            <Card.Title className="justify-text-center">
                                {"\t"}Username
                            </Card.Title>
                        </Col>
                        <Col>
                        {/* Username, Name, Mailing address, Contact Info (phone and email),qualifications,
                        details of degree completion (name of the institution, name of the degree, month and year of completion) */}
                            <Row className="sub-header">
                                <Card.Text> <strong>Name:</strong> </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>First Last</Card.Text>
                            </Row>
                            <Row className="sub-header">
                                <Card.Text> <strong>Contact Info:</strong> </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>
                                    <strong>Phone:</strong> (123) 456-7890 {"\t"} 
                                    <br/> 
                                    <strong>Email:</strong> profile@gmail.com
                                    <br/>
                                    <strong>Mailing Address:</strong> 123 Easy St.
                                </Card.Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="header text-bold">
                                <strong>Degree Information:</strong>
                            </Row>
                            <Row className="sub-header" class="font-weight-bold">
                                <Card.Text>
                                    <strong>Name of the Institution:</strong>
                                </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>Southern Methodist University</Card.Text>
                            </Row>
                            <Row className="sub-header">
                                <Card.Text> <strong>Degree Name:</strong> </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>B.S. Computer Science</Card.Text>
                            </Row>
                            <Row className="sub-header">
                                <Card.Text> <strong>Date of Completion(MM/YY):</strong></Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>May 2025</Card.Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Button className="button-bg">
                                    Request Account Deletion
                                </Button>
                            </Row>
                            <br/>
                            <Row>
                                <Button className="button-bg">
                                    Payment Options
                                </Button>
                            </Row>
                            <br/>
                            <Row>
                                <Button className="button-bg">
                                    Edit Profile
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>

        <Container className="rounded" >
            <strong>Qualifications:</strong>
        </Container>
        </>
    );
}