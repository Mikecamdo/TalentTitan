import React from "react";
import { Button, Card, CardHeader, Col, Container, Image, Row, Table } from "react-bootstrap";

export const JobPage = () => {
    return (
        <>
        <Container className="rounded mt-3">
            <Card className="bg-main rounded">
                <CardHeader className="button-bg">
                    <Card.Title className="my-auto">
                        Position Name
                    </Card.Title>
                </CardHeader>

                <Card.Body className="bg-main">
                    <Row className="d-flex">
                        <Col className="d-flexjustify-content-center" sm="auto">
                            <Image src="./default-avatar.png" width={"150px"} height={"150px"} className="d-flex justify-content-center"></Image>
                            <Card.Title className="text-center">
                                 {"\t"}Company Name
                            </Card.Title>
                            <Card.Text> <strong>Position ID:</strong> SFTWRE</Card.Text>
                        </Col>
                        <Col>
                            <Row className="sub-header">
                                <Card.Text className="fs-5"> <strong>Contact Info:</strong> </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>
                                    <strong>Recruiter:</strong> Bob Smith {"\t"} 
                                    <br/> 
                                    <strong>Phone:</strong> (123) 456-7890 {"\t"} 
                                    <br/> 
                                    <strong>Email:</strong> profile@gmail.com
                                </Card.Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row className="header text-bold fs-5">
                                <strong>Job Info:</strong>
                            </Row>
                            <Row className="sub-header" class="font-weight-bold">
                                <Card.Text>
                                    <strong>Start/End Dates:</strong>
                                </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>March 5th, 2024 - March 19th, 2024</Card.Text>
                            </Row>
                            <Row className="sub-header">
                                <Card.Text> <strong>Pay:</strong> </Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>$30/hr</Card.Text>
                            </Row>
                            <Row className="sub-header">
                                <Card.Text> <strong>Work Hours:</strong></Card.Text>
                            </Row>
                            <Row>
                                <Card.Text>9:00 AM - 5:00 PM</Card.Text>
                            </Row>
                        </Col>

                        <Col className="text-center">
                            <strong className="fs-5">Qualifications:</strong>

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
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button className="button-bg w-75">
                                Edit Job Posting
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button className="button-bg w-75">
                                Delete Job Posting
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
}