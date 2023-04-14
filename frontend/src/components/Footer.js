import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import { Container, Row, Col } from "react-bootstrap";

export default class Footer extends Component {
    render() {
        return (
            <div className="bgDarkTheme">
                <Container className="pt-3 pb-5 textWhite bgDarkTheme">
                    <Row>
                        <Col md="3" className="mt-4">
                            <h4>About Us</h4>
                            <p className="mt-3">Loren ipsum dolor sit amet, consecrterm sdlfkjasdf alsdkfj, lajsdf;kl asdlfkjs df sldkjf olo</p>
                        </Col>
                        <Col md="3" className="mt-4">
                            <h4>Services</h4>
                            <div className="mt-3">
                                <Link className="whiteLink" to="/accommodation">
                                    Accommodation
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/jobs">
                                    {"Jobs & Tasks"}
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/deals">
                                    {"Deals & Discounts"}
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/guides">
                                    Guides
                                </Link>
                            </div>
                        </Col>
                        <Col md="3" className="mt-4">
                            <h4>Quick Links</h4>
                            <div className="mt-3">
                                <Link className="whiteLink" to="/">
                                    Home
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/signup">
                                    Sign Up
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/login">
                                    Login
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/contact">
                                    Contact Us
                                </Link>
                            </div>
                        </Col>
                        <Col md="3" className="mt-4">
                            <h4>Legal</h4>
                            <div className="mt-3">
                                <Link className="whiteLink" to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </div>
                            <div className="mt-2">
                                <Link className="whiteLink" to="/terms-conditions">
                                    {"Terms & Conditions"}
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" className="mt-4">
                            <h4 className="mb-3">Get Social</h4>
                            <Link to="/" className="whiteLink">
                                <span>
                                    <Icon.Facebook size={25} />
                                </span>
                            </Link>
                            <Link to="/" className="whiteLink">
                                <span className="mx-3">
                                    <Icon.Twitter size={25} />
                                </span>
                            </Link>
                            <Link to="/" className="whiteLink">
                                <span>
                                    <Icon.Instagram size={25} />
                                </span>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
