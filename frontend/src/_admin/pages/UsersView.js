import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../components/Auth";

export default function UsersView() {
    const navigate = useNavigate();
    const auth = useAuth();
    const params = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/company")
            .then(({ data }) => {
                setCompanies(data.data);
            })
            .then(() => {
                axios.get("http://localhost:5000/api/user/" + params.id, { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then(({ data }) => {
                    setName(data.name);
                    setEmail(data.email);
                    setRole(data.role);
                    setCompany(data.company ?? "0");
                });
            });
    }, [navigate, auth, params]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [role, setRole] = useState("user");

    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState("0");

    const handleRole = (e) => {
        e.preventDefault();

        const formData = {
            role: role,
        };
        axios
            .put("http://localhost:5000/api/user/" + params.id, formData, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                if (data) {
                    Swal.fire({
                        icon: "success",
                        title: "Role has been updated successfully",
                    }).then(() => {
                        navigate("/_admin/users");
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

    const handleCompany = (e) => {
        e.preventDefault();

        const formData = {
            company: company === 0 ? null : company,
        };

        axios
            .put("http://localhost:5000/api/user/" + params.id, formData, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                if (data) {
                    Swal.fire({
                        icon: "success",
                        title: "Company has been updated successfully",
                    }).then(() => {
                        navigate("/_admin/users");
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
            <h3>Users</h3>
            <div className="mt-3">{name}</div>
            <div>{email}</div>
            <Card className="mt-4">
                <Card.Body>
                    <Row>
                        <Col lg={6}>
                            <Form onSubmit={handleRole}>
                                <Form.Group>
                                    <Form.Label>Role</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value={"admin"}>Admin</option>
                                            <option value={"brand"}>Brand</option>
                                            <option value={"user"}>User</option>
                                        </Form.Select>
                                        <Button type="submit" className="btn btnTheme">
                                            Update
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={6}>
                            <Form onSubmit={handleCompany}>
                                <Form.Group>
                                    <Form.Label>Company</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Select value={company} onChange={(e) => setCompany(e.target.value)}>
                                            <option value={"0"}>Remove all</option>
                                            {companies.map((c) => (
                                                <option key={c._id} value={c._id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Button type="submit" className="btn btnTheme">
                                            Update
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}
