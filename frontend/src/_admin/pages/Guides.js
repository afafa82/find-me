import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import axios from "axios";

export default class Guides extends Component {
    constructor() {
        super();
        this.state = {
            guides: [],
        };
    }

    componentDidMount() {
        document.title = "Guides | Find me";

        axios
            .get("http://localhost:5000/api/guide")
            .then(({ data }) => {
                this.setState({ guides: data.data });
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
                    <h3>Guides</h3>
                    <Link to={"/_admin/guides/add"} className="btn btnTheme">
                        Add
                    </Link>
                </div>
                <div className="mt-4 border shadow p-3">
                    <Table hover bordered responsive id="myTable">
                        <thead className="bg-light">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Views</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.guides.map((c, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div>{c.title}</div>
                                        <i>
                                            <small>{`by ${c.author_name}`}</small>
                                        </i>
                                    </td>
                                    <td>{c.stats.num_visits}</td>
                                    <td>
                                        <Link to={`/_admin/guides/edit/${c._id}`} className="btn btn-dark btn-sm">
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
