import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GuidePage() {
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Guides | Findme";
        axios.get(`http://localhost:5000/api/guide?page=1&limit=10`).then(({ data }) => {
            if (data.status) {
                setGuides(data.data);
            }
        });
    }, []);

    return (
        <Container className="py-5">
            <Title title={"Guides"} />
            <Row className="mt-4">
                {guides.map((g) => (
                    <Col className="mt-4" md="6" lg="4" key={g._id}>
                        <Link to={"/guides/" + g.slug} style={{ textDecoration: "none", color: "#000" }}>
                            <Card className="shadow rounded guideCard">
                                <Card.Img className="img-fluid" variant="top" src={`/${g.image}`} />
                                <Card.Body>
                                    <Card.Title>{g.title}</Card.Title>
                                    <Button className="btn btnTheme" size="sm">
                                        View
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
