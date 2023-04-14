import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Deals from "./pages/Deals";
import DealsForm from "./pages/DealsForm";
import Guides from "./pages/Guides";
import GuidesForm from "./pages/GuidesForm";
import { Container } from "react-bootstrap";
import CompanyForm from "./pages/CompanyForm";
import Users from "./pages/Users";
import UsersView from "./pages/UsersView";
import Jobs from "./pages/Jobs";
import Accommodations from "./pages/Accommodations";

export default function Admin() {
    return (
        <div style={{ backgroundColor: "#F5F6F8" }}>
            <Header />
            <Container className="py-5 h-100">
                <Routes>
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/company/add" element={<CompanyForm />} />
                    <Route path="/company/edit/:id" element={<CompanyForm />} />
                    <Route path="/accommodations" element={<Accommodations />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/deals/add" element={<DealsForm />} />
                    <Route path="/deals/edit/:id" element={<DealsForm />} />
                    <Route path="/guides" element={<Guides />} />
                    <Route path="/guides/add" element={<GuidesForm />} />
                    <Route path="/guides/edit/:id" element={<GuidesForm />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<UsersView />} />
                </Routes>
            </Container>
            <Footer />
        </div>
    );
}
