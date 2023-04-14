import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Lazy } from "swiper";
import studentImage from "../images/student.svg";
import axios from "axios";

export default function HomePage() {
    const [dealListings, setDealListings] = useState([]);
    const [guideListings, setGuideListings] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Loading Listings
        axios.get(`http://localhost:5000/api/deal?type=popular`).then(({ data }) => {
            setDealListings(data.data);
        });

        // Loading Listings
        axios.get(`http://localhost:5000/api/guide?type=popular`).then(({ data }) => {
            setGuideListings(data.data);
        });
    }, []);

    return (
        <Container>
            <div>
                <Row>
                    <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
                        <h1 className="mt-5 display-3 fw-bold">What are you Looking for ?</h1>
                        <div className="mt-5">
                            <Row>
                                <Col className="d-grid">
                                    <Link className="btn btnTheme btnRounded" to="/accommodation">
                                        Accommodation
                                    </Link>
                                </Col>
                                <Col className="d-grid">
                                    <Link className="btn btnTheme btnRounded" to="/jobs">
                                        Jobs
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                        <div className="mt-5">
                            <Row>
                                <Col className="d-grid">
                                    <Link className="btn btnTheme btnRounded" to="/deals">
                                        Deals
                                    </Link>
                                </Col>
                                <Col className="d-grid">
                                    <Link className="btn btnTheme btnRounded" to="/guides">
                                        Guides
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
                        <Image className="mt-5" src={studentImage} style={{ width: "75%", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                    </Col>
                </Row>
            </div>
            <div className="py-5">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>{"Deals & Discounts"}</h3>
                        <p className="text-muted">Brands are rewarding you...</p>
                    </div>
                    <Link style={{ textDecoration: "none" }} to="/deals" className="btnTheme btn-sm rounded">
                        View all
                    </Link>
                </div>
                <Swiper
                    className="p-2"
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    lazy={true}
                    loop={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Autoplay, Lazy]}
                >
                    {dealListings.map((g) => (
                        <SwiperSlide key={g._id}>
                            <Card className="shadow rounded dealCard">
                                <Card.Img style={{ height: "150px", backgroundColor: "white", padding: "10px" }} className="img-fluid" variant="top" src={`/${g.image[0]}`} />
                                <Card.Body>
                                    <Card.Title style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 1, WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{g.title}</Card.Title>
                                    <p>{g.company.name}</p>
                                    <Link to={`/deals/${g.company.name}/${g.slug}`} className="btn btnTheme" size="sm">
                                        View
                                    </Link>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="py-5">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3>{"Guides"}</h3>
                        <p className="text-muted">Looking for informations...</p>
                    </div>
                    <Link style={{ textDecoration: "none" }} to="/guides" className="btnTheme btn-sm rounded">
                        View all
                    </Link>
                </div>
                <Swiper
                    className="p-2"
                    slidesPerView={1}
                    spaceBetween={30}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    lazy={true}
                    loop={false}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Autoplay, Lazy]}
                >
                    {guideListings.map((g) => (
                        <SwiperSlide key={g._id}>
                            <Card className="shadow rounded dealCard">
                                <Card.Img style={{ height: "150px", backgroundColor: "white", padding: "10px" }} className="img-fluid" variant="top" src={`/${g.image}`} />
                                <Card.Body>
                                    <Card.Title style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 1, WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{g.title}</Card.Title>

                                    <Link to={`/guides/${g.slug}`} className="btn btnTheme" size="sm">
                                        View
                                    </Link>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </Container>
    );
}
