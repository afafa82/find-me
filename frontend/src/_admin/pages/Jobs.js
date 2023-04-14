import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useAuth } from "../../components/Auth";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

export default function Jobs() {
    const auth = useAuth();
    const [jobs, setJobs] = useState([]);

    const loadJobs = () => {
        axios
            .get("http://localhost:5000/api/job", { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                setJobs(data.data);
            })
            .then(() => {
                $(document).ready(function () {
                    $("#myTable").DataTable();
                });
            });
    };

    useEffect(() => {
        document.title = "Jobs | Find me";
        loadJobs();
    }, []);

    const handleStatusChange = (id, status) => {
        let newStatus = status === "active" ? "inactive" : "active";

        axios.put("http://localhost:5000/api/job/" + id, { status: newStatus }, { headers: { Authorization: `Bearer ${auth.getToken()}` } }).then(({ data }) => {
            if (data.status) {
                Swal.fire({
                    icon: "success",
                    title: "Job has been updated successfully",
                }).then(() => {
                    loadJobs();
                });
            } else {
                Swal.fire({
                    icon: "danger",
                    title: data.message,
                });
            }
        });
    };

    return (
        <>
            <h3>Jobs</h3>
            <div className="mt-4 border shadow p-3">
                <Table hover bordered responsive id="myTable">
                    <thead className="bg-light">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((c, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{c.title}</td>
                                <td>{c.company.name}</td>
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
                                        <Button onClick={() => handleStatusChange(c._id, c.status)} className="btn-dark btn-sm">
                                            {c.status === "active" ? "DeActivate" : "Activate"}
                                        </Button>
                                        <a href={`/jobs/${c.company.name}/${c._id}`} rel="noreferrer" className="btn btnTheme btn-sm" target={"_blank"}>
                                            View
                                        </a>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
