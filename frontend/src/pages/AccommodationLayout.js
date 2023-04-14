import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Row,
  Col,
  Badge,
  Table,
  Button,
} from "react-bootstrap";
import { Check, EnvelopeOpen, GeoAlt, Phone, X } from "react-bootstrap-icons";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../components/Title";

export default function AccommodationLayout() {
  const params = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState({});
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lease, setLease] = useState(true);
  const [credit, setCredit] = useState(true);
  const [references, setReferences] = useState(true);
  const [advancerent, setAdvancerent] = useState(true);
  const [hydro, setHydro] = useState("");
  const [heat, setHeat] = useState("");
  const [electricity, setElectricity] = useState("");
  const [internet, setInternet] = useState("");
  const [parking, setParking] = useState("");
  let slug = params.slug;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) {
      navigate("/accommodation");
    }
getListing()
isCredit()
    }, [params, navigate]);

    const getListing = () =>{
      // Load Listing
      axios
        .get(`http://localhost:5000/api/accommodation?slug=${slug}`)
        .then(({ data }) => {
          setListing(data.data);
              document.title = `${data.data.title} | Find me`;
              setStreet(`${data.data["address"]["street"]}`);
              setCity(`${data.data["address"]["city"]}`);
              setPostal_code(`${data.data["address"]["postal_code"]}`);
              setEmail(`${data.data["contact"]["email"]}`);
              setPhone(`${data.data["contact"]["phone"]}`);
              setLease(`${data.data["requirements"]["lease"]}`);
              setCredit(`${data.data["requirements"]["credit"]}`);
              setReferences(`${data.data["requirements"]["references"]}`);
              setAdvancerent(`${data.data["requirements"]["advancerent"]}`);
              setHydro(`${data.data["utilites_cost"]["hydro"]}`);
              setHeat(`${data.data["utilites_cost"]["heat"]}`);
              setElectricity(`${data.data["utilites_cost"]["electricity"]}`);
              setInternet(`${data.data["utilites_cost"]["internet"]}`);
              setParking(`${data.data["utilites_cost"]["parking"]}`);
            
          
        })
        .catch((err) => {
          navigate("/accommodation");
        });


      }

      const isCredit =  (falseCredit) =>{
        if(falseCredit == false){
          return  (
              <Button className="ms-3" variant="outline-danger">
                <X /> Credit Check
              </Button>)

        }else{
          return (
          <Button className="ms-3" variant="outline-success">
                <Check /> Credit Check
              </Button>
          )
        }
      }
      
  return (
    <Container className="py-5">
      <Title title={listing.title} />
      <Row>
        <Col md={6}>
          {/* <h4>{listing.address.street} / for rent</h4> */}
          <h6 className="text-muted">{listing.housing_type}</h6>
          <h5 className="text-success">{listing.price}</h5>
        </Col>
        <Col className="text-end" md={6}>
          <GeoAlt className="colorDarkTheme" />
         
          {/* {listing.address.street},&nbsp;{listing.address.city},&nbsp; */}
          {street},&nbsp;{city},&nbsp;{postal_code}, Canada
          <p>
          <a href={`https://www.google.com/maps/place/${street}${city}${postal_code}`} target="_blank" >(View Map)</a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={9}>
          <div className="border p-3 mt-3 bg-light">
            <Image
              className="mt-3 mx-auto d-block"
              src={`/${listing.image}`}
              fluid
            />
          </div>

          <h5 className="mt-5">Description</h5>
          <div className="mt-3" style={{ textAlign: "justify" }}>
            {listing.description}
          </div>
          <div className="mt-3">

            {isCredit({credit}) }
            {console.log("under" + credit)}
            {references ? 
              <>
                <Button className="ms-3" variant="outline-success">
                  <Check /> References
                </Button>
              </>
             : 
              <>
                <Button className="ms-3" variant="outline-danger">
                  <X /> References
                </Button>
              </>
            }
            
            {lease ?
            <>
<Button className="ms-3" variant="outline-success">
<Check /> Lease
</Button>
</>
:
              <>
              <Button className="ms-3" variant="outline-danger">
                <X /> Lease
              </Button>
            </>
            }
            {advancerent ? 
              <>
                <Button className="ms-3" variant="outline-success">
                  <Check /> Advance Rent
                </Button>
              </>
             : 
              <>
                <Button className="ms-3" variant="outline-danger">
                  <X /> Advance Rent
                </Button>
              </>
            }
          </div>
{console.log("credit "+credit)}
{console.log("advancerent "+advancerent)}
{console.log("lease "+lease)}
{console.log("references "+references)}
{console.log(isCredit())}
          <h5 className="mt-5">Cost & Utilites</h5>
          <div className="mt-3" style={{ textAlign: "justify" }}>
            <Table bordered striped>
              <tbody>
                <tr>
                  <th>Rent</th>
                  <td>${listing.accommodation_cost}</td>
                </tr>
                <tr>
                  <th>Heat</th>
                  <td>${heat}</td>
                </tr>
                <tr>
                  <th>Hydro</th>
                  <td>${hydro}</td>
                </tr>
                <tr>
                  <th>Electricity</th>
                  <td>${electricity}</td>
                </tr>
                <tr>
                  <th>Internet</th>
                  <td>${internet}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col md={12} lg={3}>
          <h5 className="mt-4">Contact</h5>
          <p>
            <EnvelopeOpen /> {email}
          </p>
          <p>
            <Phone /> {phone}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
