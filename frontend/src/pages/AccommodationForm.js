import React, { useState } from "react";
import Title from "../components/Title";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  PersonFill,
  CardChecklist,
  CurrencyDollar,
  GeoAlt,
} from "react-bootstrap-icons";
import Swal from "sweetalert2";
import axios from "axios";

export default function AccommodationForm(props) {
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [title, setTitle] = useState("");
  const [housing_type, setHousing_type] = useState("apartment");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [province, setProvince] = useState("");
  const [accommodation_cost, setAccommodation_cost] = useState("");
  const [parking, setParking] = useState("No");
  const [hydro, setHydro] = useState("0");
  const [heat, setHeat] = useState("0");
  const [electricity, setElectricity] = useState("0");
  const [internet, setInternet] = useState("0");
  const [lease, setLease] = useState(false);
  const [credit, setCredit] = useState(false);
  const [references, setReferences] = useState(false);
  const [advancerent, setAdvancerent] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [images, setImages] = useState("");

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
        let fileRes = await axios.post(
          "http://localhost:5000/api/uploadFile",
          fileForm,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
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
    const accommodationData = {
      title: title,
      housing_type: housing_type,
      description: description,
      address: {
        street: street,
        city: city,
        postal_code: postal_code,
        province: province,
      },
      accommodation_cost: accommodation_cost,
      utilites_cost:{
        parking: parking,
        hydro: hydro,
        heat: heat,
        electricity: electricity,
        internet: internet,
      },
      requirements:{
        lease: lease,
        credit: credit,
        references: references,
        advancerent: advancerent,
      },
      contact: {
        email: email, 
        phone: phone,
      },
      
    };
    // if(!title || !housing_type || !description || !street || !city || !postal_code || !province || !accommodation_cost
    //    || !email || !phone){
      
      //    }
      if (fileNames.length > 0) {
        accommodationData.image = fileNames;
      }
      
      console.log(JSON.stringify(accommodationData));

    try {
      await axios
        .post("http://localhost:5000/api/accommodation", accommodationData)
        .then(({ data }) => {
          if (data.status) {
            Swal.fire({
              icon: "success",
              title: "Accommodation has been created successfully",
            }).then(() => {
              navigate("/accommodation");
            });
          } else {
            throw data.message;
          }
        });
    } catch (err) {
      console.error("error", err.response.data);
      console.error(err);
      alert("Please fill all of information");
    }
  };

  return (
    <Container className="py-5">
      <Title title={"Add Accommodation"} />
      <Form noValidate validated={validate} onSubmit={handleSubmit}>
        <Card className="mt-3 rounded shadow">
          <Card.Body>
            <Card.Title>Basic</Card.Title>
            <Row>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formTitle">
                  <Form.Label className="fw-normal">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    required
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formhousing_type">
                  <Form.Label className="fw-normal">Housing Type</Form.Label>
                  <Form.Select
                    aria-label="Housing Type"
                    name="housing_type"
                    onChange={(e) => setHousing_type(e.target.value)}
                  >
                    <option value={"apartment"}>Apartment</option>
                    <option value={"condo"}>Condo</option>
                    <option value={"house"}>House</option>
                    <option value={"private_room"}>Private Room</option>
                    <option value={"shared_room"}>Shared Room</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12}>
                <Form.Group controlId="formImages">
                  <Form.Label className="fw-normal">Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(e.target.files)}
                    required={isAdd ? true : false}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label className="fw-normal">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    type="text"
                    placeholder="Enter description"
                    required
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mt-3 rounded shadow">
          <Card.Body>
            <Card.Title>
              <GeoAlt /> Address
            </Card.Title>
            <Row>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formAddressStreet">
                  <Form.Label className="fw-normal">Street Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Street Name"
                    required
                    name="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formAddressCity">
                  <Form.Label className="fw-normal">City Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter City Name"
                    required
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formAddressPostal">
                  <Form.Label className="fw-normal">Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Postal Code"
                    required
                    name="postal_code"
                    value={postal_code}
                    onChange={(e) => setPostal_code(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formAddressProvince">
                  <Form.Label className="fw-normal">Province</Form.Label>
                  <Form.Select
                    aria-label="Province"
                    name="province"
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option value={"Alberta"}>Alberta</option>
                    <option value={"British Columbia"}>British Columbia</option>
                    <option value={"Manitoba"}>Manitoba</option>
                    <option value={"New Brunswick"}>New Brunswick</option>
                    <option value={"Newfoundland and Labrador"}>
                      Newfoundland and Labrador
                    </option>
                    <option value={"Nova Scotia"}>Nova Scotia</option>
                    <option value={"Ontario"}>Ontario</option>
                    <option value={"Prince Edward Islands"}>
                      Prince Edward Islands
                    </option>
                    <option value={"Quebec"}>Quebec</option>
                    <option value={"Saskatchewan"}>Saskatchewan</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mt-3 rounded shadow">
          <Card.Body>
            <Card.Title>
              <CurrencyDollar />
              {"Accomodation Cost & Utilites"}
            </Card.Title>
            <Row>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formCostMonthly">
                  <Form.Label className="fw-normal">
                    Accommodation Cost (Monthly)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    placeholder="Enter monthly Accommodation Cost"
                    required
                    name="accommodation_cost"
                    value={accommodation_cost}
                    onChange={(e) => setAccommodation_cost(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formCostParking">
                  <Form.Label className="fw-normal">Parking</Form.Label>
                  <Form.Select
                    aria-label="Province"
                    name="parking"
                    onChange={(e) => setParking(e.target.value)}
                  >
                    <option value={"No"}>No</option>
                    <option value={"Yes, included"}>Yes, included</option>
                    <option value={"Yes, gut chargeable"}>Yes, but chargeable</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formCostHydro">
                  <Form.Label className="fw-normal">Hydro</Form.Label>
                  <Form.Control
                    type="number"
                    min="-1"
                    placeholder="Enter average hydro contribution"
                    name="hydro"
                    value={hydro}
                    onChange={(e) => setHydro(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Leave empty if included
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formCostHeat">
                  <Form.Label className="fw-normal">Heat</Form.Label>
                  <Form.Control
                    type="number"
                    min="-1"
                    placeholder="Enter average heat contribution"
                    name="heat"
                    value={heat}
                    onChange={(e) => setHeat(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Leave empty if included
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formCostElectricity">
                  <Form.Label className="fw-normal">Electricity</Form.Label>
                  <Form.Control
                    type="number"
                    min="-1"
                    placeholder="Enter average electricity contribution"
                    name="electricity"
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Leave empty if included
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formCostInternet">
                  <Form.Label className="fw-normal">Internet</Form.Label>
                  <Form.Control
                    type="number"
                    min="-1"
                    placeholder="Enter average internet contribution"
                    name="internet"
                    value={internet}
                    onChange={(e) => setInternet(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Leave empty if included
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mt-3 rounded shadow">
          <Card.Body>
            <Card.Title>
              <CardChecklist className="colorDarkTheme" />{" "}
              {"Checks & Requirements"}
            </Card.Title>
            <Row>
              <Col className="mt-3" md={6} lg={3}>
                <Form.Group controlId="formChecksLease">
                  <Form.Label className="fw-normal">Lease</Form.Label>
                  <Form.Select
                    aria-label="Lease"
                    name="lease"
                    onChange={(e) => setLease(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes, required</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={6} lg={3}>
                <Form.Group controlId="formChecksCredit">
                  <Form.Label className="fw-normal">Credit Check</Form.Label>
                  <Form.Select
                    aria-label="Credit Check"
                    name="credit"
                    onChange={(e) => setCredit(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes, required</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={6} lg={3}>
                <Form.Group controlId="formChecksReferences">
                  <Form.Label className="fw-normal">References</Form.Label>
                  <Form.Select
                    aria-label="References"
                    name="references"
                    onChange={(e) => setReferences(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes, required</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="mt-3" md={6} lg={3}>
                <Form.Group controlId="formChecksadvancerent">
                  <Form.Label className="fw-normal">
                    Advance Accommodation Cost
                  </Form.Label>
                  <Form.Select
                    aria-label="Advance accommodation_cost"
                    name="advancerent"
                    onChange={(e) => setAdvancerent(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes, required</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mt-3 rounded shadow">
          <Card.Body>
            <Card.Title>
              <PersonFill className="colorDarkTheme" /> Owner
            </Card.Title>
            <Row>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formOwnerEmail">
                  <Form.Label className="fw-normal">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Owner Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col className="mt-3" md={12} lg={6}>
                <Form.Group controlId="formOwnerMobile">
                  <Form.Label className="fw-normal">Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter Owner Mobile number"
                    required
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="mt-4">
          <Button
            className="btnTheme"
            type="submit"
            size="lg"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}
