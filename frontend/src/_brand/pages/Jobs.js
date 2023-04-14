import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/Auth";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import { Table, Button, ButtonGroup } from "react-bootstrap";

export default function Jobs() {
    const auth = useAuth();

    useEffect(() => {
        document.title = "Deals | Find me";

        axios.get("http://localhost:5000/api/user/profile", { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then((data) => {
            let company = data.data.company;
            if (!company.is_jobs) {
                setPermissionDenied(true);
                return;
            } else {
                let companyId = company._id;
                axios
                    .get("http://localhost:5000/api/job?company_id=" + companyId)
                    .then(({ data }) => {
                        setJobs(data.data);
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
    const [jobs, setJobs] = useState([]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Jobs</h3>
                {!permissionDenied ? (
                    <Link to={"/_brand/jobs/add"} className="btn btnTheme">
                        Add
                    </Link>
                ) : (
                    <></>
                )}
            </div>
            {!permissionDenied ? (
                <div className="mt-4 border shadow p-3">
                    <Table hover bordered responsive id="myTable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Ref Id</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((c, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{c.title}</td>
                                    <td>{c.reference_id}</td>
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
                                            <Link to={`/_brand/jobs/edit/${c._id}`} className="btn btn-dark btn-sm">
                                                Edit
                                            </Link>
                                            <Link to={`/jobs/${c.company.slug}/${c._id}`} className="btn btn-dark btn-sm">
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
        </>
    );
}
