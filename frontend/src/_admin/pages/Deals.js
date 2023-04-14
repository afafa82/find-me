import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import axios from "axios";

export default function Deals() {
    useEffect(() => {
        document.title = "Deals | Find me";
        const urlQuery = new URLSearchParams(window.location.search);

        let url = "http://localhost:5000/api/deal";
        if (urlQuery.get("company_id")) {
            url += `?company_id=${urlQuery.get("company_id")}`;
        }

        axios
            .get(url)
            .then(({ data }) => {
                setDeals(data.data);
            })
            .then(() => {
                $(document).ready(function () {
                    $("#myTable").DataTable();
                });
            });
    }, []);

    const [deals, setDeals] = useState([]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Deals</h3>
                <Link to={"/_admin/deals/add"} className="btn btnTheme">
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
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deals.map((c, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>
                                    <div>{c.title}</div>
                                    <small className="text-muted">{c.company.name}</small>
                                </td>
                                <td>{c.stats.num_visits}</td>
                                <td>
                                    {c.status === "active" ? (
                                        <Button variant="success" size="sm">
                                            Active
                                        </Button>
                                    ) : (
                                        <Button variant="danger" size="sm">
                                            InActive
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Link to={`/_admin/deals/edit/${c._id}`} className="btn btn-dark btn-sm">
                                            Edit
                                        </Link>
                                        <Link to={`/deals/${c.company.slug}/${c.slug}`} className="btn btn-dark btn-sm">
                                            View
                                        </Link>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
