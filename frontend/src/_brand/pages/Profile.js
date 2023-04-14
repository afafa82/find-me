import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../components/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Profile | Find me";
        axios.get("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then((data) => {
            let companyId = data.data.company._id;
            setCompanyId(companyId);
            axios.get("http://localhost:5000/api/company/" + companyId).then(({ data }) => {
                if (data.status) {
                    setName(data.data.name);
                    setDescription(data.data.description);
                    setIsDeals(data.data.is_deals ? "Allowed" : "Not Allowed");
                    setIsJobs(data.data.is_jobs ? "Allowed" : "Not Allowed");
                }
            });
        });
    }, [auth]);

    const [companyId, setCompanyId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isJobs, setIsJobs] = useState("Not Allowed");
    const [isDeals, setIsDeals] = useState("Not Allowed");
    const [validate, setValidate] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidate(true);

        const formData = {
            name: name,
            description: description,
        };

        axios
            .put("http://localhost:5000/api/company/" + companyId, formData, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                if (data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Company has been updated successfully",
                    }).then(() => {
                        setValidate(false);
                        navigate("/_brand/profile");
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
            <div className="d-flex justify-content-between">
                <h3>Company Profile</h3>
                <a className="btn btnTheme" href="/profile">
                    User's Profile
                </a>
            </div>
            <Card className="mt-4 shadow rounded">
                <Card.Body>
                    <Form noValidate validated={validate} onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="mb-3" controlId="formCompanyName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Company Name" />
                                </Form.Group>
                            </Col>
                            <Col lg="12" className="mt-3">
                                <Form.Group className="mb-3" controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" placeholder="Enter Company's Description" required />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <div className="mt-3">
                                    <Button type="submit" className="btn btnTheme">
                                        Update
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <div className="mt-5">
                <h4>Deals: {isDeals}</h4>
                <h4 className="mt-3">Jobs: {isJobs}</h4>
            </div>
            <p className="mt-4">Email us at support@findme.com to get above updated.</p>
        </div>
    );
}
