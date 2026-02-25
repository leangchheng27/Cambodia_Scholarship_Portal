import AboutPage from "./pages/about/AboutPage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import AbroadOverviewPage from "./pages/scholarship/abroad/AbroadOverviewPage.jsx";
import AbroadEligibilityPage from "./pages/scholarship/abroad/AbroadEligibilityPage.jsx";
import AbroadApplicableProgramPage from "./pages/scholarship/abroad/AbroadApplicableProgramPage.jsx";
import CambodiaScholarshipPage from "./pages/scholarship/cambodia/CambodiaScholarshipPage.jsx";
import CambodiaOverviewPage from "./pages/scholarship/cambodia/CambodiaOverviewPage.jsx";
import CambodiaEligibilityPage from "./pages/scholarship/cambodia/CambodiaEligibilityPage.jsx";
import CambodiaApplicableProgramPage from "./pages/scholarship/cambodia/CambodiaApplicableProgramPage.jsx";
import CambodiaBenefitsPage from "./pages/scholarship/cambodia/CambodiaBenefitsPage.jsx";
import InternshipPage from "./pages/scholarship/internship/InternshipPage.jsx";
import InternshipOverviewPage from "./pages/scholarship/internship/InternshipOverviewPage.jsx";
import InternshipEligibilityPage from "./pages/scholarship/internship/InternshipEligibilityPage.jsx";
import InternshipApplicableProgramPage from "./pages/scholarship/internship/InternshipApplicableProgramPage.jsx";
import InternshipBenefitsPage from "./pages/scholarship/internship/InternshipBenefitsPage.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import UniversityPage from "./pages/university/UniversityPage.jsx";
import UniversityDetailPage from "./pages/university/UniversityDetailPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/universities/:id" element={<UniversityDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/scholarships/abroad/overview" element={<AbroadOverviewPage />} />
          <Route path="/scholarships/abroad/eligibility" element={<AbroadEligibilityPage />} />
          <Route path="/scholarships/abroad/applicable-program" element={<AbroadApplicableProgramPage />} />
          <Route path="/scholarships/cambodia" element={<CambodiaScholarshipPage />} />
          <Route path="/scholarships/cambodia/overview" element={<CambodiaOverviewPage />} />
          <Route path="/scholarships/cambodia/eligibility" element={<CambodiaEligibilityPage />} />
          <Route path="/scholarships/cambodia/applicable-program" element={<CambodiaApplicableProgramPage />} />
          <Route path="/scholarships/cambodia/benefits" element={<CambodiaBenefitsPage />} />
          <Route path="/scholarships/internship" element={<InternshipPage />} />
          <Route path="/scholarships/internship/overview" element={<InternshipOverviewPage />} />
          <Route path="/scholarships/internship/eligibility" element={<InternshipEligibilityPage />} />
          <Route path="/scholarships/internship/applicable-program" element={<InternshipApplicableProgramPage />} />
          <Route path="/scholarships/internship/benefits" element={<InternshipBenefitsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
