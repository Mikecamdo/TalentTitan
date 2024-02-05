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
                <Navbar sticky="top" expand="lg" collapseOnSelect>
                    <Container fluid className="m-0">
                    <Navbar.Brand>
                        Logo
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <NavbarCollapse className="fs-5">
                        <Link to={"/signIn"} className={`ms-auto nav-link`}>
                            Sign In
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
                <Navbar sticky="top" expand="lg" collapseOnSelect>
                    <Container fluid className="m-0">
                    <Navbar.Brand>
                        Logo
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <NavbarCollapse className="fs-5">
                        Hello {currentUser}!

                        <Link to={"/"} className={`ms-auto nav-link`} onClick={() => {setCurrentUser(undefined)}}>
                            Sign Out
                        </Link>
                    </NavbarCollapse>
                    </Container>
                </Navbar>
    
                <hr className="no-margin"/>
            </>
        );
    }

    
}