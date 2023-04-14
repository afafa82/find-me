import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

export default function GuidesForm() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            setIsAdd(false);
            document.title = "Edit Guide | Findme";

            axios.get(`http://localhost:5000/api/guide/${params.id}`).then(({ data }) => {
                if (data.status) {
                    let guide = data.data;
                    setTitle(guide.title);
                    setDescription(guide.description);
                    setAuthorName(guide.author_name);
                }
            });
        } else {
            setIsAdd(true);
            document.title = "Add Guide | Findme";
        }
    }, [params]);

    // States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [authorName, setAuthorName] = useState("");
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
        if (isAdd || imageFile) {
            const fileForm = new FormData();
            fileForm.append("myFile", imageFile);
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
            title: title,
            description: description,
            author_name: authorName,
        };
        if (fileName) {
            formData.image = fileName;
        }

        // Submitting Data
        if (isAdd) {
            axios
                .post("http://localhost:5000/api/guide", formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Guide has been created successfully",
                        }).then(() => {
                            navigate("/_admin/guides");
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
                .put("http://localhost:5000/api/guide/" + params.id, formData)
                .then(({ data }) => {
                    if (data.status) {
                        Swal.fire({
                            icon: "success",
                            title: "Guide has been updated successfully",
                        }).then(() => {
                            navigate("/_admin/guides");
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
                <Link to={"/_admin/guides"} className="text-dark">
                    <ArrowLeft />
                </Link>
                &nbsp;&nbsp; Guides <span className="text-muted">/ {isAdd ? "Add" : "Edit"}</span>
            </h3>
            <div className="mt-4 border shadow p-3">
                <Form noValidate validated={validate} onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Guide's title" required />
                            </Form.Group>
                        </Col>
                        <Col lg="6">
                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required={isAdd} />
                            </Form.Group>
                        </Col>
                        <Col lg="12">
                            <Form.Group className="mb-3" controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <ReactQuill rows={"5"} value={description} onChange={(value) => setDescription(value)} theme={"snow"} placeholder="Enter Guide's Description" required />
                            </Form.Group>
                        </Col>
                        <Col lg="12">
                            <Form.Group className="mb-3" controlId="formAuthorName">
                                <Form.Label>Author Name</Form.Label>
                                <Form.Control type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Enter Author's Name" required />
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
