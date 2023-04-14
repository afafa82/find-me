import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export default function Header() {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        auth.logout();
        navigate("/login");
    };

    return (
        <Navbar className="nav_width background_nav" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <div className="logoHeader">
                        <span style={{ color: "#242240" }}>Find</span>
                        <span style={{ color: "#5F17EB" }}>me</span>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Nav>
                        {auth.getToken() !== null && auth.getRole() !== "user" ? (
                            <>
                                <Nav.Link href={auth.getRole() === "brand" ? "/_brand/" : "/_admin/"}>
                                    <span className="navButtons">Dashboard</span>
                                </Nav.Link>
                            </>
                        ) : (
                            <></>
                        )}
                        <Nav.Link href="/">
                            <span className="navButtons">Home</span>
                        </Nav.Link>
                        <Nav.Link href="/accommodation">
                            <span className="navButtons">Accommodations</span>
                        </Nav.Link>
                        <Nav.Link href="/jobs">
                            <span className="navButtons">Jobs</span>
                        </Nav.Link>
                        <Nav.Link href="/deals">
                            <span className="navButtons">Deals</span>
                        </Nav.Link>
                        <Nav.Link href="/guides">
                            <span className="navButtons">Guides</span>
                        </Nav.Link>
                        {auth.getToken() === null ? (
                            <>
                                <Nav.Link href="/login">
                                    <span className="navButtons">Login</span>
                                </Nav.Link>
                                <Nav.Link href="/signup">
                                    <span className="navButtons">SignUp</span>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/profile">
                                    <span className="navButtons">Profile</span>
                                </Nav.Link>
                                <Nav.Link onClick={() => logout()}>
                                    <span className="navButtons">Logout</span>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
