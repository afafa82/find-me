import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import axios from "axios";
import Moment from "react-moment";
import ShareNow from "../components/ShareNow";

export default function JobLayout() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`http://localhost:5000/api/job/${params.id}`).then(({ data }) => {
      document.title = `${data.data.title} | ${data.data.company.name} | Findme`;
      setJob(data.data);
      setIsLoading(false);
      axios.post(`http://localhost:5000/api/job/${data.data._id}/click`);
    });
  }, [params]);

  const handleClick = () => {};

  return (
    <>
      {!isLoading ? (
        job.status === "active" ? (
          <Container className="py-5">
            <Title title={job.title} />
            <Row>
              <Col lg={9}>
                <div
                  className="border shadow-sm p-3 mt-3"
                  style={{ textAlign: "justify" }}
                >
                  <h6 className="d-flex justify-content-between">
                    <span>
                      By {job.company.name} | {job.time_type.toUpperCase()} |{" "}
                      <span className="text-muted">
                        Opened on{" "}
                        <Moment format="DD MMM YYYY">{job.valid_from}</Moment>
                      </span>
                    </span>
                    <span>
                      Ref Id:{" "}
                      <span className="text-muted">{job.reference_id}</span>
                    </span>
                  </h6>

                  <h5 className="mt-4 text-success">{`$${job.salary} / ${job.salary_type}ly`}</h5>
                  <div className="mt-3 text-secondary">{job.description}</div>

                  <Table hover bordered responsive className="mt-4">
                    <tbody>
                      <tr>
                        <th>Number of Positions</th>
                        <td>{job.num_positions}</td>
                      </tr>
                      <tr>
                        <th>Job Type</th>
                        <td>{job.time_type.toUpperCase()}</td>
                      </tr>
                      <tr>
                        <th>Is Remote</th>
                        <td>
                          {job.is_remote === "yes"
                            ? "Yes"
                            : job.is_remote === "no"
                            ? "No"
                            : "Temperory, You might have to return to Office"}
                        </td>
                      </tr>
                      {job.is_remote !== "yes" ? (
                        <tr>
                          <th>Address</th>
                          <td>
                            <span>{`${job.address.street}, ${job.address.city} ${job.address.postal_code}`}</span>
                            <div>{`${job.address.province}, ${job.address.country}`}</div>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </Table>

                  <div className="mt-4">
                    <h4>Requirements</h4>
                    <div className="text-secondary">{job.requirements}</div>
                  </div>

                  <div className="mt-4">
                    <h4>Benefits</h4>
                    <div className="text-secondary">{job.benefits}</div>
                  </div>

                  <Button onClick={handleClick} className="btn btnTheme mt-4">
                    Apply on {job.apply_type === "url" ? "Website" : "Email"}
                  </Button>
                </div>
              </Col>
              <Col lg={3}>
                <ShareNow
                  shareUrl={window.location.href}
                  title={`${job.title} | Find me`}
                />
                <div className="mt-4 ">
                  <Button onClick={handleClick} className="btn btnTheme">
                    Apply on {job.apply_type === "url" ? "Website" : "Email"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <div className="py-5 text-center">
            <h3 className="mt-5">Job Posting has been removed</h3>
            <p>There can be many possible reasons</p>
          </div>
        )
      ) : (
        <div className="py-5 text-center">
          <img src="/images/loading.svg" alt="Loading..." />
          <h3 className="mt-5">Loading...</h3>
        </div>
      )}
    </>
  );
}
