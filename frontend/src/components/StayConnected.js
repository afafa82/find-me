import React, { Component } from "react";
import { Container, Row, Form, Col, Button, InputGroup, FormControl } from "react-bootstrap";

export default class StayConnected extends Component {
    render() {
        return (
            <div className="bgGreyTheme py-5">
                <Container>
                    <Row>
                        <Col md="6" className="mt-3 mt-0">
                            <h3>Stay Connected. Stay Updated.</h3>
                        </Col>
                        <Col md="6" className="mt-3 mt-0">
                            <Form>
                                <InputGroup>
                                    <FormControl placeholder="Email Address" aria-label="Email Address" aria-describedby="basic-addon2" />
                                    <Button variant="dark" id="button-addon2">
                                        Subscribe
                                    </Button>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
