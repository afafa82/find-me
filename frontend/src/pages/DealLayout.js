import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Globe2, ListOl, Shop, UiChecks } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import axios from "axios";
import Moment from "react-moment";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import ReactStars from "react-rating-stars-component";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Lazy } from "swiper";
import ShareNow from "../components/ShareNow";
import moment from "moment";

export default function DealLayout() {
    const params = useParams();
    const navigate = useNavigate();

    const [listing, setListing] = useState({});
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpired, setIsExpired] = useState("Active");
    
    console.log(listing)
    useEffect(() => {
        window.scrollTo(0, 0);
        let slug = params.slug;

        if (!slug) {
            navigate("/deals");
        }
        // Load Listing
        axios
            .get(`http://localhost:5000/api/deal?slug=${slug}`)
            .then(({ data }) => {
                setListing(data.data);
                setIsLoading(false);

                const now = moment();
                if (now.isAfter(data.data["valid_till"])) {
                    setIsExpired("Expired");
                }

                if (now.isBefore(data.data["valid_from"])) {
                    setIsExpired("UpComing");
                }

                document.title = `${data.data.title} | Find me`;
                axios.post(`http://localhost:5000/api/deal/${data.data._id}/click`);
            })
            .catch((err) => {
                navigate("/deals");
            });

        // Loading Listings
        axios
            .get(`http://localhost:5000/api/deal?type=popular`)
            .then(({ data }) => {
                setListings(data.data);
            })
            .catch((err) => {
                navigate("/deals");
            });
    }, [params, navigate]);

    return (
        <Container className="py-5">
            {isLoading ? (
                <div className="py-5 text-center">
                    <img src="/images/loading.svg" alt="Loading..." />
                    <h3 className="mt-5">Loading...</h3>
                </div>
            ) : listing.status === "active" ? (
                <>
                    <Title title={listing.title} />
                    <>
                        <ReactStars classNames="d-inline" count={5} value={0} size={24} isHalf={true} activeColor="#ffc107" edit={false} /> (0.0)
                    </>
                    <Row>
                        <Col lg={9}>
                            <div className="border p-3 mt-3" style={{ textAlign: "justify" }}>
                                <h6 className="d-flex justify-content-between">
                                    <div>
                                        By {listing.company.name} |{" "}
                                        <span className="text-muted">
                                            Expires on <Moment format="DD MMM YYYY">{listing.valid_till}</Moment>
                                        </span>
                                    </div>
                                    <Button variant={isExpired === "Active" ? "success" : isExpired === "Expired" ? "danger" : "info"} size={"sm"}>
                                        {isExpired}
                                    </Button>
                                </h6>
                                <h6 className="mt-3">{listing.category}</h6>
                                <h6 className="mt-3">
                                    {listing.avail_type === "online" ? (
                                        <>
                                            <Globe2 /> Online
                                        </>
                                    ) : (
                                        <>
                                            <Shop /> InStore
                                        </>
                                    )}{" "}
                                    | {listing.offer_type === "discount" ? "Discount" : "Free"}
                                </h6>
                                <div className="mt-3">
                                    {parse(
                                        DOMPurify.sanitize(listing.description, {
                                            USE_PROFILES: { html: true },
                                        })
                                    )}
                                </div>
                                {listing.link ? (
                                    <a href={listing.link} target="_blank" className="btn btnTheme my-2">
                                        Get it Now
                                    </a>
                                ) : (
                                    <></>
                                )}
                                <div className="mt-3 border-top pt-4">
                                    <h5 className="pb-3">
                                        <UiChecks /> Conditions
                                    </h5>
                                    {parse(
                                        DOMPurify.sanitize(listing.conditions, {
                                            USE_PROFILES: { html: true },
                                        })
                                    )}
                                </div>
                                <div className="mt-3 border-top pt-4">
                                    <h5 className="pb-3">
                                        <ListOl /> Steps to avail
                                    </h5>
                                    {parse(
                                        DOMPurify.sanitize(listing.steps_to_avail, {
                                            USE_PROFILES: { html: true },
                                        })
                                    )}
                                </div>
                                {listing.link ? (
                                    <a href={listing.link} target="_blank" className="btn btnTheme mt-3">
                                        Get it Now
                                    </a>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Col>
                        <Col lg={3}>
                            <ShareNow shareUrl={window.location.href} title={`${listing.title} | Find me`} />
                        </Col>
                    </Row>

                    <div className="py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h3>{"Popular Deals"}</h3>
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
                            {listings.map((listing) => (
                                <SwiperSlide key={listing._id}>
                                    <Card className="shadow rounded guideCard">
                                        <Card.Img style={{ height: "150px", backgroundColor: "white" }} className="img-fluid" variant="top" src={`/${listing.image}`} />
                                        <Card.Body>
                                            <Card.Title style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", lineClamp: 1, WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>{listing.title}</Card.Title>
                                            <p>{listing.company.name}</p>
                                            <Link to={`/deals/${listing.company.name}/${listing.slug}`} className="btn btnTheme" size="sm">
                                                View
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </>
            ) : (
                <div className="py-5 text-center">
                    <h3 className="mt-5">Deal Listing has been removed</h3>
                    <p>There can be many possible reasons</p>
                </div>
            )}
        </Container>
    );
}
