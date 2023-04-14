import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../components/Auth";

export default function JobsForm() {
    const auth = useAuth();
    const navigate = useNavigate();
    const params = useParams();

    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [validTo, setValidTo] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [type, setType] = useState("part-time");
    const [positions, setPositions] = useState(1);
    const [salary, setSalary] = useState(1);
    const [salaryType, setSalaryType] = useState("hour");

    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [benefits, setBenefits] = useState("");

    const [isRemote, setIsRemote] = useState("yes");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressPostalCode, setAddressPostalCode] = useState("");
    const [addressProvince, setAddressProvince] = useState("Ontario");

    const [applyMethod, setApplyMethod] = useState("url");
    const [applyValue, setApplyValue] = useState("");
    const [status, setStatus] = useState("active");

    const [validate, setValidate] = useState(false);
    const [isAdd, setIsAdd] = useState(true);

    // On Load
    useEffect(() => {
        document.title = "Add Job | Findme";
        axios.get("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then((data) => {
            let dbCompany = data.data.company;
            setCompany(dbCompany._id);

            if (params.id) {
                setIsAdd(false);
                document.title = "Edit Job | Findme";

                axios.get(`http://localhost:5000/api/job/${params.id}`).then(({ data }) => {
                    if (data.status) {
                        let job = data.data;

                        if (job.company._id !== dbCompany._id) {
                            return navigate("/_brand/");
                        }

                        setTitle(job.title);
                        setReferenceId(job.reference_id);
                        setValidFrom(job.valid_from.slice(0, -1));
                        setValidTo(job.valid_till.slice(0, -1));
                        setType(job.time_type);
                        setPositions(job.num_positions);
                        setSalary(job.salary);
                        setSalaryType(job.salary_type);

                        setDescription(job.description);
                        setRequirements(job.requirements);
                        setBenefits(job.benefits);

                        setIsRemote(job.is_remote);
                        setAddressStreet(job.address.street);
                        setAddressCity(job.address.city);
                        setAddressPostalCode(job.address.postal_code);
                        setAddressProvince(job.address.province);

                        setApplyMethod(job.apply_type);
                        setApplyValue(job.apply_value);
                        setStatus(job.status);
                    }
                });
            }
        });
    }, [auth, params, navigate]);

    // Handling Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidate(true);

        const formData = {
            title: title,
            reference_id: referenceId,
            valid_from: validFrom,
            valid_till: validTo,
            time_type: type,
            num_positions: positions,
            salary: salary,
            salary_type: salaryType,
            description: description,
            requirements: requirements,
            benefits: benefits,
            is_remote: isRemote,
            address: {
                street: addressStreet,
                city: addressCity,
                postal_code: addressPostalCode,
                province: addressProvince,
            },
            apply_type: applyMethod,
            apply_value: applyValue,
            company: company,
            status: status,
        };

        if (!isAdd) {
            // Edit
            axios
                .put("http://localhost:5000/api/job/" + params.id, formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Job has been updated successfully",
                        }).then(() => {
                            navigate("/_brand/jobs");
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
            // Add
            axios
                .post("http://localhost:5000/api/job", formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Job has been created successfully",
                        }).then(() => {
                            navigate("/_brand/jobs");
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
        <>
            <h3>
                <Link to={"/_brand/jobs"} className="text-dark">
                    <ArrowLeft />
                </Link>
                &nbsp;&nbsp; Jobs <span className="text-muted">/ {isAdd ? "Add" : "Edit"}</span>
            </h3>
            <div className="mt-5">
                <Form noValidate validated={validate} onSubmit={handleSubmit}>
                    <Card className="rounded shadow-sm">
                        <Card.Body>
                            <Row>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Job's title" required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="formReferenceId">
                                        <Form.Label>Reference Id</Form.Label>
                                        <Form.Control type="text" value={referenceId} onChange={(e) => setReferenceId(e.target.value)} placeholder="Enter Job's Id" required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" md={6}>
                                    <Form.Group className="mb-3" controlId="formValidFrom">
                                        <Form.Label className="fw-normal">Valid From</Form.Label>
                                        <Form.Control type="datetime-local" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" md={6}>
                                    <Form.Group className="mb-3" controlId="formValidTo">
                                        <Form.Label className="fw-normal">Valid To</Form.Label>
                                        <Form.Control type="datetime-local" value={validTo} onChange={(e) => setValidTo(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" md={6}>
                                    <Form.Group className="mb-3" controlId="formType">
                                        <Form.Label className="fw-normal">Type</Form.Label>
                                        <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
                                            <option value={"part-time"}>Part-Time</option>
                                            <option value={"full-time"}>Full-Time</option>
                                            <option value={"choice"}>Choice</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" md={6}>
                                    <Form.Group className="mb-3" controlId="formPositions">
                                        <Form.Label className="fw-normal">Positions</Form.Label>
                                        <Form.Control type="number" value={positions} onChange={(e) => setPositions(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" md={6}>
                                    <Form.Group className="mb-3" controlId="formSalary">
                                        <Form.Label className="fw-normal">Salary</Form.Label>
                                        <Form.Control type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" md={6}>
                                    <Form.Group className="mb-3" controlId="formSalaryType">
                                        <Form.Label className="fw-normal">Salary Type</Form.Label>
                                        <Form.Select value={salaryType} onChange={(e) => setSalaryType(e.target.value)} required>
                                            <option value={"hour"}>Hourly</option>
                                            <option value={"month"}>Monthly</option>
                                            <option value={"year"}>Annually</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="rounded shadow-sm mt-4">
                        <Card.Body>
                            <Row>
                                <Col className="mt-3" lg="12">
                                    <Form.Group className="mb-3" controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as={"textarea"} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Job's description" required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="12">
                                    <Form.Group className="mb-3" controlId="formRequirements">
                                        <Form.Label>Requirements</Form.Label>
                                        <Form.Control as={"textarea"} rows={4} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Enter Job's requirements" required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="12">
                                    <Form.Group className="mb-3" controlId="formBenefits">
                                        <Form.Label>Benefits</Form.Label>
                                        <Form.Control as={"textarea"} rows={4} value={benefits} onChange={(e) => setBenefits(e.target.value)} placeholder="Enter Job's benefits" required />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="rounded shadow-sm mt-4">
                        <Card.Body>
                            <Card.Title>Address</Card.Title>
                            <Row>
                                <Col className="mt-3 0ffset-lg-6" lg="6">
                                    <Form.Group className="mb-3" controlId="formIsRemote">
                                        <Form.Label>Is Remote</Form.Label>
                                        <Form.Select aria-label="Is Remote" value={isRemote} onChange={(e) => setIsRemote(e.target.value)}>
                                            <option value={"yes"}>Yes</option>
                                            <option value={"no"}>No</option>
                                            <option value={"temp"}>Temperory, maybe called to Work</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="formAddressStreet">
                                        <Form.Label>Street</Form.Label>
                                        <Form.Control type="text" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} disabled={isRemote === "yes" ? true : false} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="formAddressCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} disabled={isRemote === "yes" ? true : false} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="formAddressPostalCode">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control type="text" value={addressPostalCode} onChange={(e) => setAddressPostalCode(e.target.value)} disabled={isRemote === "yes" ? true : false} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="formAddressProvince">
                                        <Form.Label>Province</Form.Label>
                                        <Form.Select aria-label="Province" value={addressProvince} onChange={(e) => setAddressProvince(e.target.value)} disabled={isRemote === "yes" ? true : false} required>
                                            <option value={"Alberta"}>Alberta</option>
                                            <option value={"British Columbia"}>British Columbia</option>
                                            <option value={"Manitoba"}>Manitoba</option>
                                            <option value={"New Brunswick"}>New Brunswick</option>
                                            <option value={"Newfoundland and Labrador"}>Newfoundland and Labrador</option>
                                            <option value={"Nova Scotia"}>Nova Scotia</option>
                                            <option value={"Ontario"}>Ontario</option>
                                            <option value={"Prince Edward Islands"}>Prince Edward Islands</option>
                                            <option value={"Quebec"}>Quebec</option>
                                            <option value={"Saskatchewan"}>Saskatchewan</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Card className="rounded shadow-sm mt-4">
                        <Card.Body>
                            <Card.Title>Apply</Card.Title>
                            <Row>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="form">
                                        <Form.Label>Method</Form.Label>
                                        <Form.Select value={applyMethod} onChange={(e) => setApplyMethod(e.target.value)} required>
                                            <option value={"url"}>Website/Url</option>
                                            <option value={"email"}>Email</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="form">
                                        <Form.Label>Value ({applyMethod.toUpperCase()})</Form.Label>
                                        <Form.Control type={applyMethod} value={applyValue} onChange={(e) => setApplyValue(e.target.value)} required />
                                    </Form.Group>
                                </Col>
                                <Col className="mt-3" lg="6">
                                    <Form.Group className="mb-3" controlId="form">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                            <option value={"active"}>Active</option>
                                            <option value={"inactive"}>InActive</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <div className="mt-4">
                        <Button type="submit" className="btn btnTheme">
                            Submit
                        </Button>
                        <Button type="reset" className="ms-3" variant="danger">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}
