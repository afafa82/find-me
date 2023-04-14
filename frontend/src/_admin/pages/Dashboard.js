import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../components/Auth";

export default function Dashboard() {
    const auth = useAuth();

    useEffect(() => {
        document.title = "Dashboard | Findme";

        axios.get("http://localhost:5000/api/stats", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then(({ data }) => {
            setStats(data);
        });
    }, [auth]);

    const [stats, setStats] = useState({});

    return (
        <>
            <h2>Welcome, Admin</h2>
            <Row className="mt-3">
                <Col className="mt-4" md={6} lg={3}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Companies</span>
                                <span className="fw-bold">{stats.companies}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-4" md={6} lg={3}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Deals</span>
                                <span className="fw-bold">{stats.deals}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-4" md={6} lg={3}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Guides</span>
                                <span className="fw-bold">{stats.guides}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-4" md={6} lg={3}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Users</span>
                                <span className="fw-bold">{stats.users}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-4" md={6} lg={3}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Jobs</span>
                                <span className="fw-bold">{stats.jobs}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-4" md={6} lg={3}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Accommodations</span>
                                <span className="fw-bold">{stats.accommodations}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h4 className="mt-5">Quick Links</h4>
            <Row>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_admin/guides/add"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>Add Guide</span>
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_admin/guides"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>View Guides</span>
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_admin/deals/add"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>Add Deal</span>
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_admin/deals"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>View Deals</span>
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_admin/company/add"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>Add Company</span>
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_admin/company"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>View Companies</span>
                                    <span>
                                        <ChevronRight />
                                    </span>
                                </Card.Title>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
