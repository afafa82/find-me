import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth";

export default function Header() {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        auth.logout();
        navigate("/login");
    };

    return (
        <div>
            <Navbar className="nav_width background_nav" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <div className="logoHeader">
                            <span style={{ color: "#242240" }}>Find</span>
                            <span style={{ color: "#5F17EB" }}>me</span>
                            <span style={{ fontSize: "16px", paddingLeft: "10px" }}>Admin</span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link href="/_admin/">
                                <span className="navButtons">Dashboard</span>
                            </Nav.Link>
                            <Nav.Link href="/_admin/company">
                                <span className="navButtons">Company</span>
                            </Nav.Link>
                            <Nav.Link href="/_admin/accommodations">
                                <span className="navButtons">Accommodations</span>
                            </Nav.Link>
                            <Nav.Link href="/_admin/jobs">
                                <span className="navButtons">Jobs</span>
                            </Nav.Link>
                            <Nav.Link href="/_admin/deals">
                                <span className="navButtons">Deals</span>
                            </Nav.Link>
                            <Nav.Link href="/_admin/guides">
                                <span className="navButtons">Guides</span>
                            </Nav.Link>
                            <Nav.Link href="/_admin/users">
                                <span className="navButtons">Users</span>
                            </Nav.Link>
                            <Nav.Link href="/profile">
                                <span className="navButtons">Profile</span>
                            </Nav.Link>
                            <Nav.Link onClick={() => logout()}>
                                <span className="navButtons">Logout</span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
