import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [state, setState] = React.useState({
        title: "",
        city: ""
      })
    useEffect(() => {
        document.title = "Jobs | Findme";
        axios.get(`http://localhost:5000/api/job?type=active`).then(({ data }) => {
            setJobs(data.data);
        });
    }, []);

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }

    function searchBar(e){
        e.preventDefault();
        axios.get(`http://localhost:5000/api/job/searched?title=${state?.title}&city=${state?.city}`).then(({ data }) => {
            console.log(data.data)
            setJobs(data.data);
        });
    }
    return (
        <Container className="py-5">
            <Title title={"Jobs"} />
            <Form>
                <Row>
                    <Col md="5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" value={state.title} name='title' onChange={handleChange} placeholder="Enter title" />
                        </Form.Group>
                    </Col>
                    <Col md="5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" value={state.city} name="city" onChange={handleChange} placeholder="Enter location" />
                        </Form.Group>
                    </Col>
                    <Col md="2">
                        <div className="d-grid">
                            <Button className="mt-4 btn-block" onClick={searchBar} variant="dark" type="submit">
                                Search
                            </Button>
                        </div>
                    </Col>
                </Row>
             
            </Form>
            <Row className="mt-4">
                {jobs.map((job) => (
                    <Col className="mt-4" lg="6" key={job._id}>
                        <Card className="shadow rounded jobCard">
                            <Card.Body>
                                <Row>
                                    <Col md="4">
                                        <Card.Title className="two-lines">{job.title}</Card.Title>
                                        <div className="text-muted">{job.company.name}</div>
                                        <div className="mt-2">{`$${job.salary}/${job.salary_type}`}</div>
                                    </Col>
                                    <Col md="8">
                                        <Card.Text className="three-lines">{job.description}</Card.Text>
                                        <Link to={`/jobs/${job.company.slug}/${job._id}`} className="btn btn-sm btnTheme">
                                            View
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
