import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DealPage() {
    let navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        document.title = "Deals | Find me";
        fetchListings(1);
    }, []);

    const fetchListings = (pageNumber = 1) => {
        axios.get(`http://localhost:5000/api/deal?page=${pageNumber}&size=4`).then(({ data }) => {
            setListings(data.data.docs);

            if (pageNumber > 1) {
                navigate("?page=" + pageNumber);
            } else {
                navigate("/deals");
            }

            let pageItems = [];
            for (let i = 1; i <= data.data.totalPages; i++) {
                pageItems.push(
                    <Pagination.Item key={i} onClick={() => paginate(i)} active={i === pageNumber}>
                        {i}
                    </Pagination.Item>
                );
            }
            setItems(pageItems);
        });
        window.scrollTo(0, 0);
    };

    const paginate = (number) => {
        fetchListings(number);
    };

    return (
        <Container className="py-5">
            <Title title={"Deals"} />
            <Row className="mt-4">
                {listings.map((listing) => (
                    <Col className="mt-4" md="12" lg="6" key={listing._id}>
                        <Card className="shadow rounded dealCard">
                            <Link to={`/deals/${listing.company.slug}/${listing.slug}`} style={{ textDecoration: "none", color: "#000" }}>
                                <Row className="mx-0">
                                    <Col md={4} className={"mx-auto my-auto"}>
                                        <Card.Img style={{ maxHeight: "150px" }} className="img-fluid p-3" variant="top" src={`/${listing.image}`} />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 2, WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{listing.title}</Card.Title>
                                            <p>{listing.company.name}</p>
                                            <Button className="btn btnTheme btn-sm">View</Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="mt-5">
                <Pagination>{items}</Pagination>
            </div>
        </Container>
    );
}
