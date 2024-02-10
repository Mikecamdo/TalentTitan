import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";


export const ViewPostedJobsPage = () => {

    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <Form>
                <Row className="w-100">
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className="mx-auto">
                        <div className="my-5">
                            <Row>
                                <Col>
                                    <div className="input-group" id="search-bar">
                                        <input className="form-control border-secondary py-2" 
                                               type="search" 
                                               value={searchValue}
                                               onChange={(delta) => {
                                                setSearchValue(delta.target.value);
                                              }}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-secondary py-2 square-border" type="button">
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <Form.Group controlId="claim_description">
                        
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Position Title</th>
                                    <th>Employer</th>
                                    <th>Start/End Date</th>
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
                                    <td>Software Engineer</td>
                                    <td>Amazon</td>
                                    <td>May 5 - May 21</td>
                                </tr>
                                <tr>
                                    <td>Software Engineer</td>
                                    <td>Walmart</td>
                                    <td>June 5 - June 6</td>
                                </tr>
                                <tr>
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