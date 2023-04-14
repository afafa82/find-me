import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AccommodationsPage() {
  let navigate = useNavigate();
  const [listings, setListings] = useState([])

  useEffect(() => {
    document.title = "Accommodations | Find me";
    fetchListings()
  }, []);
  
  const fetchListings = () => {
    axios
    .get("http://localhost:5000/api/accommodation")
    .then(({ data }) => {
      setListings(data.data);
      
    })
    .catch((e) => {
      // When API failed
      console.error(e); // error comes out
      navigate("/accommodation")
      
    });
  };
  return (
    <Container className="py-5">
        <Title title={"Accommodations"} />
        <div className="text-end mt-3">
          <Link className="btn btnTheme" to="/accommodation/add">
            Add Accommodation
          </Link>
        </div>
        <Row className="mt-3 clear">
          {listings.map((g) => (
            <Col className="mt-4" md="12" lg="9" key={g._id}>
              <Card className="shadow rounded accommodationCard">
                <Link
                  to={"/accommodation/" + g.slug}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Row>
                    <Col md={3}>
                      <Card.Img
                        className="img-fluid"
                        variant="top"
                        src={`/${g.image}`}
                      />
                    </Col>
                    <Col md={9}>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6>{g.title}</h6>
                            <p className="text-muted">
                              {g.address.street}
                              {g.address.city}
                            </p>
                          </div>
                          <h5 className="text-success fw-bold">
                            ${g.accommodation_cost}
                          </h5>
                        </div>
                        <div className="fw-light fs-6">{g.description}</div>
                        <div className="mt-2">{g.housing_type}</div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

