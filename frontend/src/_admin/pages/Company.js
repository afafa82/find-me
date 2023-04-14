import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import axios from "axios";

export default class Company extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
        };
    }

    componentDidMount() {
        document.title = "Company | Find me";

        axios
            .get("http://localhost:5000/api/company")
            .then(({ data }) => {
                this.setState({ companies: data.data });
            })
            .then(() => {
                $(document).ready(function () {
                    $("#myTable").DataTable();
                });
            });
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Companies</h3>
                    <Link to={"/_admin/company/add"} className="btn btnTheme">
                        Add
                    </Link>
                </div>
                <div className="mt-4 border shadow p-3">
                    <Table hover bordered responsive id="myTable">
                        <thead className="bg-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Jobs</th>
                                <th>Deals</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.companies.map((c, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div>{c.name}</div>
                                        <small className="text-muted d-none d-md-block">{c.description.substring(0, 200)}</small>
                                        <div>
                                            <Link to={`/_admin/deals?company_id=${c._id}`} className="m-2 btn btn-outline-secondary btn-sm">
                                                View Deals
                                            </Link>
                                            <Button className="m-2" variant="outline-secondary" size="sm">
                                                View Jobs
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        {c.is_jobs ? (
                                            <Button variant="success" size="sm">
                                                Yes
                                            </Button>
                                        ) : (
                                            <Button variant="danger" size="sm">
                                                No
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        {c.is_deals ? (
                                            <Button variant="success" size="sm">
                                                Yes
                                            </Button>
                                        ) : (
                                            <Button variant="danger" size="sm">
                                                No
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/_admin/company/edit/${c._id}`} className="btn btn-dark btn-sm">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
