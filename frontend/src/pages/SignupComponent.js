import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../components/Auth";

import signupImage from "../images/signup.svg";

export default function SignupPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState(false);

    useEffect(() => {
        document.title = "SignUp | Find me";
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
            name: name,
            email: email,
            password: password,
        };

        axios
            .post("http://localhost:5000/api/user/signup", data)
            .then(({ data }) => {
                if (data.status) {
                    auth.login(data.data.token, data.data.role);
                    Swal.fire({
                        icon: "success",
                        title: "Registration has been successful",
                    }).then(() => {
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
                    <Image className="mt-5" src={signupImage} style={{ width: "50%", marginLeft: "auto", marginRight: "auto", display: "block" }} />
                </Col>
                <Col className="bgTheme textWhite py-5">
                    <h1 className="textCenter">Create account</h1>
                    <p className="textCenter">
                        Already have an account ?&nbsp;
                        <Link style={{ color: "white" }} to="/login">
                            Login
                        </Link>
                    </p>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <Form method="POST" className="mt-4" noValidate validated={validate} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control size="sm" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control size="sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control size="sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                </Form.Group>
                                <p>
                                    I agree to{" "}
                                    <Link to="/signup" style={{ color: "white" }}>
                                        Terms and Conditions
                                    </Link>
                                </p>
                                <div className="d-grid mt-4">
                                    <Button type="submit" variant="dark">
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
