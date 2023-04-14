import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StayConnected from "./components/StayConnected";

import HomePage from "./pages/HomePage";
import AccommodationPage from "./pages/AccommodationsPage";
import AccommodationForm from "./pages/AccommodationForm";
import AccommodationLayout from "./pages/AccommodationLayout";
import JobsPage from "./pages/JobsPage";
import JobLayout from "./pages/JobLayout";
import DealsPage from "./pages/DealsPage";
import DealsLayout from "./pages/DealLayout";
import GuidesPage from "./pages/GuidesPage";
import GuideLayout from "./pages/GuideLayout";

import LoginPage from "./pages/LoginComponent";
import SignupPage from "./pages/SignupComponent";

import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import { AuthProvider } from "./components/Auth";

function App() {
    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route index path="/" element={<HomePage />} />
                <Route path="/accommodation" element={<AccommodationPage />} />
                <Route path="/accommodation/add" element={<AccommodationForm />} />
                <Route path="/accommodation/:slug" element={<AccommodationLayout />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:company/:id" element={<JobLayout />} />
                <Route path="/deals" element={<DealsPage />} />
                <Route path="/deals/:company/:slug" element={<DealsLayout />} />
                <Route path="/guides" element={<GuidesPage />} />
                <Route path="/guides/:slug" element={<GuideLayout />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            </Routes>

            <StayConnected />
            <Footer />
        </AuthProvider>
    );
}

export default App;
