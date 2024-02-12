import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Row, Col, Nav, NavDropdown, Image } from "react-bootstrap";
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
                        <Col md={"auto"} >
                            <Navbar.Toggle aria-controls="employer-resources" />
                            <Navbar.Collapse id="employer-resources">
                            <Nav>
                                <NavDropdown
                                id="employer-resources"
                                className="text-light"
                                title="Employer Resources"
                                >
                                    <NavDropdown.Item href="/job-posting">
                                        Post New Job
                                    </NavDropdown.Item>

                                    <NavDropdown.Item href="/job-search">
                                        View Posted Jobs
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
                                    <NavDropdown.Item href="/job-search">
                                        View Posted Jobs
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
                                    <NavDropdown.Item href="/account-requests">
                                        View Account Requests
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/account-search">
                                        View Accounts
                                    </NavDropdown.Item>

                                    <NavDropdown.Item href="/add-staff">
                                        Add New Staff Account
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            </Navbar.Collapse>
                        </Col>
                    </Row>
                    
                <NavbarCollapse className="fs-5">
                    {!currentUser && (<>
                        <div className={`ms-auto nav-link`}>
                            <Link to={"/signIn"} className="inherit-color">Sign In</Link> / <Link to={"/signUp"} className="inherit-color">Sign Up</Link>
                        </div>
                    </>)}

                    {currentUser && (<>
                        <div className="ms-auto">
                            Hello {currentUser}!

                            <Link to={"/"} className={`ms-2 inherit-color`} onClick={() => {setCurrentUser(undefined)}}>
                            Sign Out
                            </Link>
                        </div>
                    </>)}
                </NavbarCollapse>
                </Container>
            </Navbar>
        </>
    );
}