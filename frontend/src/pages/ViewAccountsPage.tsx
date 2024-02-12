import React, {useState} from "react";
import { CustomSearchBar } from "../components/CustomSearchBar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export const ViewAccountsPage = () => {

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
                                <tr>
                                    <th className="button-bg text-light">Name</th>
                                    <th className="button-bg text-light">Email</th>
                                    <th className="button-bg text-light">Phone</th>
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
                                    <td>Bob Smith</td>
                                    <td>fake@gmail.com</td>
                                    <td>000-000-0000</td>
                                </tr>
                                <tr>
                                    <td>Frank Ocean</td>
                                    <td>focean@outlook.com</td>
                                    <td>510-741-9003</td>
                                </tr>
                                <tr>
                                    <td>Bob the Builder</td>
                                    <td>bbuilder@gmail.com</td>
                                    <td>832-234-9463</td>
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