import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

export const CustomNavbar = () => {
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
}