import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../components/Auth";

import loginImage from "../images/login.svg";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        document.title = "Login | Find me";
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidate(true);

        // Form Submission
        const data = {
            email: email,
            password: password,
        };

        axios
            .post("http://localhost:5000/api/user/login", data)
            .then(({ data }) => {
                if (data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "You have been successfully logined",
                    }).then(() => {
                        auth.login(data.data.token, data.data.role);

                        if (data.data.role === "admin") {
                            return navigate("/_admin");
                        } else if (data.data.role === "brand") {
                            return navigate("/_brand");
                        }
                        return navigate("/profile");
                    });
                } else {
                    throw data.message;
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Some error Occured",
                    text: err.response.data.message,
                });
            });
    };

    return (
        <Container fluid>
            <Row>
                <Col className="d-none d-lg-block">
                    <Image className="mt-4" src={loginImage} style={{ width: "50%", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                </Col>
                <Col className="bgTheme py-5 textWhite">
                    <h1 className="textCenter">Welcome Back!</h1>
                    <p className="textCenter">
                        Dont have an Account yet ?&nbsp;
                        <Link style={{ color: "white" }} to="/signup">
                            Sign Up
                        </Link>
                    </p>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <Form method="POST" noValidate validated={validate} onSubmit={handleSubmit} className="mt-4">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control size="sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control size="sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <div className="d-grid mt-4">
                                    <Button type="submit" variant="dark">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                            <div className="mt-3">
                                <Link style={{ color: "white", textDecoration: "none" }} to="/signup">
                                    Forgot your Password ? <u>Reset it</u>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
