import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Row, Col, Nav, NavDropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { useContext } from "react";
import { UserContext } from "../App";

export const CustomNavbar = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext?.currentUser;
    const setCurrentUser = userContext?.setCurrentUser;

    if (!setCurrentUser) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return (
            <>
                <Navbar sticky="top" className="nav-main" collapseOnSelect>
                    <Container fluid className="m-0">
                    <Navbar.Brand>
                        <Link to={"/"} className={`nav-link`}>
                            <Image src="/TalentTitanLogo.png" width={"100px"}></Image>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                        <Row >
                            {/* <Col md={"auto"} >
                                <Navbar.Toggle aria-controls="account-requests" />
                                <Navbar.Collapse id="account-requests">
                                <Nav>
                                    <NavDropdown
                                    id="account-requests"
                                    className="text-light"
                                    title="Account Requests"
                                    >
                                    <NavDropdown.Item href="/employeer-requests">
                                        Employeer Requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/professional-requests">
                                        Professional Requests
                                    </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                </Navbar.Collapse>
                            </Col> */}

                            <Col md={"auto"} >
                                <Navbar.Toggle aria-controls="employeer-resources" />
                                <Navbar.Collapse id="employeer-resources">
                                <Nav>
                                    <NavDropdown
                                    id="employeer-resources"
                                    className="text-light"
                                    title="Employeer Resources"
                                    >
                                    <NavDropdown.Item href="/employeer-requests">
                                        Employeer Requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/professional-request">
                                        Request Professional
                                    </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                </Navbar.Collapse>
                            </Col>

                            <Col md={"auto"} >
                                <Navbar.Toggle aria-controls="professional-resources" />
                                <Navbar.Collapse id="professional-resources">
                                <Nav>
                                    <NavDropdown
                                    id="professional-resources"
                                    className="text-light"
                                    title="Professional Resources"
                                    >
                                    <NavDropdown.Item href="/professional-requests">
                                        Employeer Requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/professional-employeer-requests">
                                        Request Employeer
                                    </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                </Navbar.Collapse>
                            </Col>
                            
                            <Col md={"auto"} >
                                <Navbar.Toggle aria-controls="staff-resources" />
                                <Navbar.Collapse id="staff-resources">
                                <Nav>
                                    <NavDropdown
                                    id="professional-resources"
                                    className="text-light"
                                    title="Staff Resources"
                                    >
                                    <NavDropdown.Item href="/employeer-requests">
                                        Employeer Requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/professional-requests">
                                        Professional Requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/employeer-list">
                                        View All Employeers
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/professionals-list">
                                        View All Professionals
                                    </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                </Navbar.Collapse>
                            </Col>

                            {/* <Col md={"auto"} >
                                <NavLink to={"/employeer-list"} className="text-dark">
                                    View All Employeers
                                </NavLink>
                            </Col>
                            <Col md={"auto"} >
                                <NavLink to={"/professionals-list"} className="text-dark">
                                    View All Professionals
                                </NavLink>
                            </Col> */}
                        </Row>
                    <NavbarCollapse className="fs-5">
                    <Link to={"/profile"} className={`ms-auto nav-link`}>
                            Temp Profile
                        </Link>
                        <Link to={"/signIn"} className={`ms-auto nav-link`}>
                            Sign up/Sign In
                        </Link>
                    </NavbarCollapse>
                    </Container>
                </Navbar>
    
                <hr className="no-margin"/>
            </>
        );
    } else {
        return (
            <>
                <Navbar sticky="top" expand="sm" collapseOnSelect>
                    <Container fluid className="m-0">
                    <Navbar.Brand>
                        <Link to={"/"} className={`nav-link`}>
                            Logo
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <NavbarCollapse className="fs-5">

                        <div className="ms-auto">
                            Hello {currentUser}!

                            <Link to={"/"} className={`ms-2 inherit-color`} onClick={() => {setCurrentUser(undefined)}}>
                            Sign Out
                            </Link>
                        </div>
                    </NavbarCollapse>
                    </Container>
                </Navbar>
    
                <hr className="no-margin"/>
            </>
        );
    }

    
}