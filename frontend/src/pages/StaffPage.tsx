import React from "react";
import { Col, Container, DropdownItem, DropdownMenu, Navbar, Row } from "react-bootstrap"
import { NavDropdown, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const StaffPage = () => {
    return (
        <>
        <Navbar className="nav-bg">
            <Container fluid>
                <Row >
                    <Col md={"auto"} >
                        <Navbar.Toggle aria-controls="account-requests" />
                        <Navbar.Collapse id="account-requests">
                        <Nav>
                            <NavDropdown
                            id="account-requests"
                            className="text-light"
                            title="Account Requests"
                            >
                            <NavDropdown.Item href="/employeer-requests">Employeer Requests</NavDropdown.Item>
                            <NavDropdown.Item href="/professional-requests">
                                Professional Requests
                            </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                        <DropdownMenu className="text-light">
                            Account Requests
                            <DropdownItem>
                                <NavLink to={"/employeer-requests"}>
                                    Employeer Requests
                                </NavLink>
                            </DropdownItem>
                            <NavLink to={"/professional-requests"}>
                                Professional Requests
                            </NavLink>
                        </DropdownMenu>
                    </Col>
                    <Col md={"auto"} >
                        <NavLink to={"/employeer-list"} className="text-dark">
                            View All Employeers
                        </NavLink>
                    </Col>
                    <Col md={"auto"} >
                        <NavLink to={"/professionals-list"} className="text-dark">
                            View All Professionals
                        </NavLink>
                    </Col>
                </Row>
            </Container>
        </Navbar>
        </>
    );
}