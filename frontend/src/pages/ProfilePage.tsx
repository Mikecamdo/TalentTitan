import React from "react";
import { Button, Card, CardHeader, Col, Container, Image, Row, Table } from "react-bootstrap";

export const ProfilePage = () => {
    return (
        <>
        <Container className="rounded mt-3">
            <Card className="bg-main rounded">
                <CardHeader className="button-bg">
                    <Card.Title className="my-auto">
                        Professional (Role)
                    </Card.Title>
                </CardHeader>

                <Card.Body className="bg-main">
                    <Row className="d-flex">
                        <Col className="d-flexjustify-content-center" sm="auto">
                            <Image src="./default-avatar.png" width={"150px"} height={"150px"} className="d-flex justify-content-center"></Image>
                            <Card.Title className="text-center">
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
                                <Card.Text> <strong>Date of Completion:</strong></Card.Text>
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

        <Container className="rounded text-light">
            <Card.Body className="bg-alt">
            <Row>
                <Col className="text-center">
                    <strong>Qualifications:</strong>
                </Col>

                <Col className="text-center">
                    <strong>Transaction History:</strong>
                </Col>
            </Row>

            <Row>
                <Col className="pe-0">
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
                                <td>C, C++, C#, Java, JavaScript</td>
                            </tr>

                            <tr>
                                <td>Frameworks</td>
                                <td>React, Angular, Vue, Node.js, .NET</td>
                            </tr>

                            <tr>
                                <td>Database</td>
                                <td>PostgreSQL, SQL Server</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Row className="mx-auto my-2">February 11, 2024: Received $50 from Walmart</Row>
                    <Row className="mx-auto my-2">February 1, 2024: Paid $10 to Talent Titan (subscription fee)</Row>
                </Col>
            </Row>
            </Card.Body>
        </Container>
        </>
    );
}