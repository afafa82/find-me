import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import axios from "axios";
import { useAuth } from "../../components/Auth";

export default function Users() {
    const auth = useAuth();

    useEffect(() => {
        document.title = "Users | Find me";

        axios
            .get("http://localhost:5000/api/user/list", { headers: { Authorization: `Bearer ${auth.getToken()}` } })
            .then(({ data }) => {
                setUsers(data);
            })
            .then(() => {
                $(document).ready(function () {
                    $("#myTable").DataTable();
                });
            });
    }, [auth]);

    const [users, setUsers] = useState([]);

    return (
        <div>
            <h3>Users</h3>
            <div className="mt-4 border shadow p-3">
                <Table hover bordered responsive id="myTable">
                    <thead className="bg-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((c, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.role.toUpperCase()}</td>
                                <td>
                                    <a href={`/_admin/users/${c._id}`} className="btn btnTheme btn-sm">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
