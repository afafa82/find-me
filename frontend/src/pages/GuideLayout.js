import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Lazy } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import ShareNow from "../components/ShareNow";

export default function GuideLayout() {
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [guide, setGuide] = useState({});
    const [guideListings, setGuideListings] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Getting Guide
        axios.get(`http://localhost:5000/api/guide?slug=${params.slug}`).then(({ data }) => {
            if (data.status) {
                setGuide(data.data);
                document.title = `${data.data.title} | Findme`;
                axios.post(`http://localhost:5000/api/guide/${data.data._id}/click`);
            }
        });

        axios.get(`http://localhost:5000/api/guide?type=popular`).then(({ data }) => {
            if (data.status) {
                setGuideListings(data.data);
                setIsLoading(false);
            }
        });
    }, [params]);

    return (
        <>
            {!isLoading ? (
                <Container className="py-5">
                    <Title title={guide.title} />
                    <Row>
                        <Col lg={9}>
                            <Card.Img className="img-fluid mt-3" variant="top" src={`/${guide.image}`} />
                            <div className="border shadow p-3 " style={{ textAlign: "justify" }}>
                                <h6>
                                    By {guide.author_name} |{" "}
                                    <span className="text-muted">
                                        <Moment format="DD MMM YYYY">{guide.createdAt}</Moment>
                                    </span>
                                </h6>
                                <div className="mt-3">
                                    {parse(
                                        DOMPurify.sanitize(guide.description, {
                                            USE_PROFILES: { html: true },
                                        })
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <ShareNow shareUrl={window.location.href} title={`${guide.title} | Find me`} />
                        </Col>
                    </Row>
                    <div className="py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h3>{"Popular Guides"}</h3>
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
                                    <Link to={`/guides/${g.slug}`} style={{ textDecoration: "none", color: "#000" }}>
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
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Container>
            ) : (
                <div className="py-5 text-center">
                    <img src="/images/loading.svg" alt="Loading..." />
                    <h3 className="mt-5">Loading...</h3>
                </div>
            )}
        </>
    );
}
