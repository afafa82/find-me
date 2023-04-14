import React, { useEffect, useState } from "react";
import { Form, Card, Container, Row, Col, Button, InputGroup } from "react-bootstrap";
import Title from "../components/Title";
import { useAuth } from "../components/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Profile | Find me";
        axios.get("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then((data) => {
            if (data.status) {
                setName(data.data.name);
            }
        });
    }, [auth]);

    // Name Changes
    const [name, setName] = useState("");
    const [formNameValidate, setFormNameValidate] = useState(false);
    const handleNameChange = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setFormNameValidate(true);

        const formData = {
            name: name,
        };

        axios
            .put("http://localhost:5000/api/user/profile", formData, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                if (data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Name has been updated successfully",
                    }).then(() => {
                        setFormNameValidate(false);
                        navigate("/profile");
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

    // Password Change
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [formPasswordValidate, setFormPasswordValidate] = useState(false);
    const handlePasswordChange = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setFormPasswordValidate(true);

        const formData = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        };

        axios
            .put("http://localhost:5000/api/user/change_password", formData, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                if (data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Password has been updated successfully",
                    }).then(() => {
                        setFormNameValidate(false);
                        navigate("/profile");
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
        <div>
            <Container className="py-5">
                <Title title={"Profile"} />
                <Card className="mt-5">
                    <Card.Body>
                        <Form noValidate validated={formNameValidate} onSubmit={handleNameChange}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <InputGroup>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
                                    <Button type="submit" className="btn btnTheme">
                                        Update
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>Password</Card.Title>
                        <Form noValidate validated={formPasswordValidate} onSubmit={handlePasswordChange}>
                            <Row>
                                <Col md={6} lg={5} className="mt-3">
                                    <Form.Group>
                                        <Form.Label>Current Password</Form.Label>
                                        <Form.Control type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter Current Password" />
                                    </Form.Group>
                                </Col>
                                <Col md={6} lg={5} className="mt-3">
                                    <Form.Group>
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
                                    </Form.Group>
                                </Col>
                                <Col md={4} lg={2} className="mt-3">
                                    <Button type="submit" className="mt-4 btn form-control btnTheme">
                                        Update
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <Card className="mt-5">
                    <Card.Body>
                        <Card.Title>Are you a Brand ?</Card.Title>
                        <Card.Text>Please contact us at support@findme.com to enlist and manage your Brand</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
