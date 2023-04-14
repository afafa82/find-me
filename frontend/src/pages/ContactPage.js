import React from "react";
import { Container } from "react-bootstrap";
import Title from "../components/Title";

export default function ContactPage() {
    return (
        <div>
            <Container className="py-5">
                <Title title={"Contact"} />
            </Container>
        </div>
    );
}
