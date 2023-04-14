import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Form, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

export default function DealsForm() {
    const navigate = useNavigate();
    const params = useParams();

    // Load saved Data from Server
    useEffect(() => {
        axios.get("http://localhost:5000/api/company").then(({ data }) => {
            setCompanies(data.data);
            setCompany(data.data[0]._id);
        });

        if (params.id) {
            setIsAdd(false);
            document.title = "Edit Deal | Findme";

            axios.get(`http://localhost:5000/api/deal/${params.id}`).then(({ data }) => {
                if (data.status) {
                    let deal = data.data;

                    setTitle(deal.title);
                    setDescription(deal.description);
                    setCategory(deal.category);
                    setLink(deal.link);
                    setValidFrom(deal.valid_from.slice(0, -1));
                    setValidTo(deal.valid_till.slice(0, -1));
                    setOfferType(deal.offer_type);
                    setAvailType(deal.avail_type);
                    setConditions(deal.conditions || "");
                    setStepsToAvail(deal.steps_to_avail || "");
                    setCompany(deal.company._id);
                    setStatus(deal.status);
                }
            });
        } else {
            setIsAdd(true);
            document.title = "Add Deal | Findme";
        }
    }, [params]);

    // States
    const [title, setTitle] = useState("");
    const [images, setImages] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [link, setLink] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validTo, setValidTo] = useState("");
    const [offerType, setOfferType] = useState("discount");
    const [availType, setAvailType] = useState("online");
    const [conditions, setConditions] = useState("");
    const [stepsToAvail, setStepsToAvail] = useState("");
    const [status, setStatus] = useState("active");
    const [company, setCompany] = useState("");

    const [companies, setCompanies] = useState([]);
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

        // Uploading Files
        var fileNames = [];
        if (isAdd || images) {
            for (let i = 0; i < images.length; i++) {
                const fileForm = new FormData();
                fileForm.append("myFile", images[i]);
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

                fileNames.push(fileRes.data.data.filename);
            }
        }

        // Creating Object
        const formData = {
            title: title,
            description: description,
            category: category,
            link: link,
            valid_from: validFrom,
            valid_till: validTo,
            offer_type: offerType,
            avail_type: availType,
            conditions: conditions,
            steps_to_avail: stepsToAvail,
            company: company,
            status: status,
        };
        if (fileNames.length > 0) {
            formData.image = fileNames;
        }

        // Submitting Form
        if (isAdd) {
            axios
                .post("http://localhost:5000/api/deal", formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Deal has been created successfully",
                        }).then(() => {
                            navigate("/_admin/deals");
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
                .put("http://localhost:5000/api/deal/" + params.id, formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Guide has been updated successfully",
                        }).then(() => {
                            navigate("/_admin/deals");
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
                <Link to={"/_admin/deals"} className="text-dark">
                    <ArrowLeft />
                </Link>
                &nbsp;&nbsp; Deals <span className="text-muted">/ {isAdd ? "Add" : "Edit"}</span>
            </h3>
            <div className="mt-4 border shadow p-3 rounded">
                <Form noValidate validated={validate} onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Deal's title" required />
                            </Form.Group>
                        </Col>
                        <Col lg="6">
                            <Form.Group>
                                <Form.Label>Images</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={(e) => setImages(e.target.files)} multiple required={isAdd ? true : false} />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" lg="12">
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <ReactQuill rows={"5"} value={description} onChange={(value) => setDescription(value)} theme={"snow"} placeholder="Enter Deal's Description" required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCategory">
                                <Form.Label className="fw-normal">Category</Form.Label>
                                <Form.Select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value={"Accommodation"}>Accommodation</option>
                                    <option value={"Beauty and Health"}>Beauty and Health</option>
                                    <option value={"Clothing"}>Clothing</option>
                                    <option value={"Education"}>Education</option>
                                    <option value={"Electronics"}>Electronics</option>
                                    <option value={"Entertainment"}>Entertainment</option>
                                    <option value={"Food and Drinks"}>Food and Drinks</option>
                                    <option value={"Galleries, Museums"}>Galleries, Museums</option>
                                    <option value={"Services"}>Services</option>
                                    <option value={"Sports"}>Sports</option>
                                    <option value={"Travel"}>Travel</option>
                                    <option value={"Others"}>Others</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formLink">
                                <Form.Label className="fw-normal">Link</Form.Label>
                                <Form.Control type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Enter Deal's Link" />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={6}>
                            <Form.Group controlId="formValidFrom">
                                <Form.Label className="fw-normal">Valid From</Form.Label>
                                <Form.Control type="datetime-local" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={6}>
                            <Form.Group controlId="formValidTo">
                                <Form.Label className="fw-normal">Valid To</Form.Label>
                                <Form.Control type="datetime-local" value={validTo} onChange={(e) => setValidTo(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={6}>
                            <Form.Group controlId="formOfferType">
                                <Form.Label className="fw-normal">Offer Type</Form.Label>
                                <Form.Select aria-label="Offer Type" value={offerType} onChange={(e) => setOfferType(e.target.value)}>
                                    <option value={"discount"}>Discount</option>
                                    <option value={"free"}>Free</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={6}>
                            <Form.Group controlId="formAvailType">
                                <Form.Label className="fw-normal">Avail Type</Form.Label>
                                <Form.Select aria-label="Avail Type" value={availType} onChange={(e) => setAvailType(e.target.value)}>
                                    <option value={"online"}>Online</option>
                                    <option value={"instore"}>In Store</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={12}>
                            <Form.Group controlId="formConditions">
                                <Form.Label className="fw-normal">Conditions</Form.Label>
                                <ReactQuill value={conditions} onChange={(value) => setConditions(value)} theme={"snow"} placeholder="Enter Deal's Conditions" required />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={12}>
                            <Form.Group controlId="formStepsToAvail">
                                <Form.Label className="fw-normal">Steps to Avail</Form.Label>
                                <ReactQuill value={stepsToAvail} onChange={(value) => setStepsToAvail(value)} theme={"snow"} placeholder="Enter Deal's Step's to avail" required />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={6}>
                            <Form.Group controlId="formStatus">
                                <Form.Label className="fw-normal">Company / Brand</Form.Label>
                                <Form.Select aria-label="Company" value={company} onChange={(e) => setCompany(e.target.value)}>
                                    {companies
                                        .filter((company) => company.is_deals)
                                        .map((company) => (
                                            <option key={company._id} value={company._id}>
                                                {company.name}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col className="mt-4" md={6}>
                            <Form.Group controlId="formStatus">
                                <Form.Label className="fw-normal">Status</Form.Label>
                                <Form.Select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value={"active"}>Active</option>
                                    <option value={"inactive"}>InActive</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="mt-5">
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
