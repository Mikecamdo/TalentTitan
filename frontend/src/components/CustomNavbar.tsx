import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
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
                <Navbar sticky="top" collapseOnSelect>
                    <Container fluid className="m-0">
                    <Navbar.Brand>
                        <Link to={"/"} className={`nav-link`}>
                            Logo
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <NavbarCollapse className="fs-5">
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