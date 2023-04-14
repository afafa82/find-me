import React, { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import axios from "axios";
import { useAuth } from "../../components/Auth";

export default function Deals() {
    const auth = useAuth();

    useEffect(() => {
        document.title = "Deals | Find me";

        axios.get("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then((data) => {
            let company = data.data.company;
            if (!company.is_deals) {
                setPermissionDenied(true);
                return;
            } else {
                let companyId = company._id;
                axios
                    .get("http://localhost:5000/api/deal?company_id=" + companyId)
                    .then(({ data }) => {
                        setDeals(data.data);
                    })
                    .then(() => {
                        $(document).ready(function () {
                            $("#myTable").DataTable();
                        });
                    });
            }
        });
    }, [auth]);

    const [permissionDenied, setPermissionDenied] = useState(false);
    const [deals, setDeals] = useState([]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Deals</h3>
                {!permissionDenied ? (
                    <Link to={"/_brand/deals/add"} className="btn btnTheme">
                        Add
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            {!permissionDenied ? (
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
                                            <Link to={`/_brand/deals/edit/${c._id}`} className="btn btn-dark btn-sm">
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
            ) : (
                <div className="text-center mt-5">
                    <h4>Permission Denied</h4>
                    <p>Please contact us at support@findme.com to get this update</p>
                </div>
            )}
        </div>
    );
}
