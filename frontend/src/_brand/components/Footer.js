import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
    return (
        <Container className="py-2" fluid style={{ backgroundColor: "#ebeef7" }}>
            <Container>
                <div className="d-flex justify-content-between">
                    <h5>FindMe</h5>
                    <h5>&copy; 2022 | All rights reserved</h5>
                </div>
            </Container>
        </Container>
    );
}
