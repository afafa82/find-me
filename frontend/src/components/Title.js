import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Title extends Component {
    render() {
        const title = this.props.title;
        return (
            <Row>
                <Col>
                    <h2>{title}</h2>
                </Col>
                <Col style={{ textAlign: "right" }}>
                    <Link style={{ textDecoration: "none", color: "#5f17eb" }} to="/">
                        Home
                    </Link>{" "}
                    / <span style={{ color: "#242240" }}>{title}</span>
                </Col>
            </Row>
        );
    }
}
