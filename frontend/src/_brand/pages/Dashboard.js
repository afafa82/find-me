import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/Auth";
import axios from "axios";

export default function Dashboard() {
    const auth = useAuth();

    useEffect(() => {
        document.title = "Dashboard | Find me";
        axios.get("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then((data) => {
            let companyId = data.data.company._id;
            axios.get("http://localhost:5000/api/company/" + companyId).then(({ data }) => {
                if (data.status) {
                    setTotalDeals(data.data.deals.length);
                    setTotalJobs(data.data.jobs.length);
                }
            });
        });
    }, [auth]);

    const [totalDeals, setTotalDeals] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);

    return (
        <>
            <h2>Welcome, CN Tower</h2>
            <Row className="mt-3">
                <Col className="mt-4" md={6} lg={4}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Deals</span>
                                <span className="fw-bold">{totalDeals}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mt-4" md={6} lg={4}>
                    <Card className="shadow p-2 cardDarkTheme">
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between">
                                <span className="fw-light">Jobs</span>
                                <span className="fw-bold">{totalJobs}</span>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h4 className="mt-5">Quick Links</h4>
            <Row>
                <Col className="mt-3" md={6} lg={3}>
                    <Card className="shadow rounded quickLinkCard">
                        <Link to={"/_brand/jobs/add"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>Add Job</span>
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
                        <Link to={"/_brand/deals/add"}>
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
                        <Link to={"/_brand/jobs"}>
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between">
                                    <span>View Jobs</span>
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
                        <Link to={"/_brand/deals"}>
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
            </Row>
        </>
    );
}
