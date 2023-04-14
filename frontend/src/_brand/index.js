import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import DealsForm from "./pages/DealsForm";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobsForm from "./pages/JobsForm";

export default function Brand() {
    return (
        <div style={{ backgroundColor: "#F5F6F8" }}>
            <Header />
            <Container className="py-5 h-100">
                <Routes>
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/deals/add" element={<DealsForm />} />
                    <Route path="/deals/edit/:id" element={<DealsForm />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/jobs/add" element={<JobsForm />} />
                    <Route path="/jobs/edit/:id" element={<JobsForm />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Container>
            <Footer />
        </div>
    );
}
