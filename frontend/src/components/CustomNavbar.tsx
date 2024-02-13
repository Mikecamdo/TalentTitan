import React, { useEffect } from "react";
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

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    if (!setCurrentUser) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar sticky="top" className="nav-main text-light fs-5" collapseOnSelect>
                <Container fluid className="m-0">
                    <Navbar.Brand>
                        <Link to={"/"} className={`nav-link`}>
                            <Image src="/TalentTitanLogo.png" width={"75px"}></Image>
                        </Link>
                    </Navbar.Brand>

                    <Navbar.Toggle />
                    
                    <Row>
                        {currentUser && currentUser != "Employer" && currentUser != "Staff" && (<>
                            <Col>
                                <Link to={"/job-search"} className={`nav-link`}>
                                    View Posted Jobs
                                </Link>
                            </Col>
                        </>)}

                        {currentUser == "Employer" && (<>
                            <Col md={"auto"} >
                                <Link to={"/job-posting"} className={`nav-link`}>
                                    Post New Job
                                </Link>
                            </Col>
                            <Col md={"auto"}>
                                <Link to={"/job-search"} className={`nav-link`}>
                                    View Posted Jobs
                                </Link>
                            </Col>
                        </>)}

                        {currentUser == "Staff" && (<>
                            <Col md={"auto"}>
                                <Link to={"/account-requests"} className={`nav-link`}>
                                    View Account Requests
                                </Link>
                            </Col>
                            <Col md={"auto"}>
                                <Link to={"/account-search"} className={`nav-link`}>
                                    View Accounts
                                </Link>
                            </Col>
                            <Col md={"auto"}>
                                <Link to={"/add-staff"} className={`nav-link`}>
                                    Add New Staff Account
                                </Link>
                            </Col>
                        </>)}
                    </Row>
                    
                    <NavbarCollapse className="fs-5">
                        {!currentUser && (<>
                            <div className={`nav-link ms-auto`}>
                                <Link to={"/signIn"} className="inherit-color">Sign In</Link> / <Link to={"/signUp"} className="inherit-color">Sign Up</Link>
                            </div>
                        </>)}

                        {currentUser && (<>
                            <div className="ms-auto">
                                <Link to={"/profile"} className="inherit-color">{currentUser} </Link>
                                /
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