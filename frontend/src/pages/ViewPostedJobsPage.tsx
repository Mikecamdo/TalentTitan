import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { CustomSearchBar } from "../components/CustomSearchBar";
import { Link } from "react-router-dom";


export const ViewPostedJobsPage = () => {

    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <>
            <Form>
                <Row className="w-100">
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className="mx-auto">
                        <CustomSearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

                        <Form.Group controlId="claim_description">
                        
                        <Table striped bordered hover>
                            <thead>
                                <tr className="button-bg text-light">
                                    <th className="button-bg text-light">Job ID</th>
                                    <th className="button-bg text-light">Position Title</th>
                                    <th className="button-bg text-light">Employer</th>
                                    <th className="button-bg text-light">Start/End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {qualifications.map((qualification, index) => (
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
                                ))} */}
                                {/*The following is dummy data:*/}
                                <tr>
                                    <td><Link to={"/job"} className="inherit-color">SFTWRE1</Link></td>
                                    <td>Software Engineer</td>
                                    <td>Amazon</td>
                                    <td>May 5 - May 21</td>
                                </tr>
                                <tr>
                                    <td><Link to={"/job"} className="inherit-color">SFTWRE2</Link></td>
                                    <td>Software Engineer</td>
                                    <td>Walmart</td>
                                    <td>June 5 - June 6</td>
                                </tr>
                                <tr>
                                    <td><Link to={"/job"} className="inherit-color">UIUX1</Link></td>
                                    <td>UI/UX Designer</td>
                                    <td>Walmart</td>
                                    <td>June 5 - June 6</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    );
}