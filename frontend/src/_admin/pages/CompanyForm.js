import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

export default function CompanyForm() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            setIsAdd(false);
            document.title = "Edit Company | Findme";

            axios.get(`http://localhost:5000/api/company/${params.id}`).then(({ data }) => {
                if (data.status) {
                    let company = data.data;
                    setName(company.name);
                    setDescription(company.description);
                    setIsDeals(Number(company.is_deals));
                    setIsJobs(Number(company.is_jobs));
                }
            });
        } else {
            setIsAdd(true);
            document.title = "Add Company | Findme";
        }
    }, [params]);

    // States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [logoFile, setLogoFile] = useState("");
    const [isJobs, setIsJobs] = useState(0);
    const [isDeals, setIsDeals] = useState(0);
    const [validate, setValidate] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    // Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidate(true);

        // Upload File
        let fileName = "";
        if (isAdd || logoFile) {
            const fileForm = new FormData();
            fileForm.append("myFile", logoFile);
            let fileRes = await axios.post("http://localhost:5000/api/uploadFile", fileForm, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            if (!fileRes.data.status) {
                Swal.fire({
                    icon: "error",
                    title: "Some error Occured",
                    text: fileRes.data.message,
                });
            }

            fileName = fileRes.data.data.filename;
        }

        // Creating Object
        const formData = {
            name: name,
            description: description,
            is_jobs: isJobs,
            is_deals: isDeals,
        };
        if (fileName) {
            formData.logo = fileName;
        }

        // Submitting Data
        if (isAdd) {
            axios
                .post("http://localhost:5000/api/company", formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Company has been created successfully",
                        }).then(() => {
                            navigate("/_admin/company");
                        });
                    } else {
                        throw data.message;
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Some error Occured",
                        text: err,
                    });
                });
        } else {
            axios
                .put("http://localhost:5000/api/company/" + params.id, formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Company has been updated successfully",
                        }).then(() => {
                            navigate("/_admin/company");
                        });
                    } else {
                        throw data.message;
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Some error Occured",
                        text: err,
                    });
                });
        }
    };

    return (
        <div>
            <h3>
                <Link to={"/_admin/company"} className="text-dark">
                    <ArrowLeft />
                </Link>
                &nbsp;&nbsp; Companies <span className="text-muted">/ {isAdd ? "Add" : "Edit"}</span>
            </h3>
            <div className="mt-4 border shadow p-3">
                <Form noValidate validated={validate} onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Company's Name" required />
                            </Form.Group>
                        </Col>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Logo</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} required={isAdd} />
                            </Form.Group>
                        </Col>
                        <Col lg="12">
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows="5" placeholder="Enter Company's Description" required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formIsJobs">
                                <Form.Label className="fw-normal">Allow Jobs</Form.Label>
                                <Form.Select aria-label="Allow Jobs" value={isJobs} onChange={(e) => setIsJobs(e.target.value)}>
                                    <option value={"0"}>No</option>
                                    <option value={"1"}>Yes</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formIsDeals">
                                <Form.Label className="fw-normal">Allow Deals</Form.Label>
                                <Form.Select aria-label="Allow Deals" value={isDeals} onChange={(e) => setIsDeals(e.target.value)}>
                                    <option value={"0"}>No</option>
                                    <option value={"1"}>Yes</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-3">
                        <Button type="submit" className="btn btnTheme">
                            Submit
                        </Button>
                        <Button type="reset" className="ms-3" variant="danger">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
