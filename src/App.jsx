import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import ProfileSetupPage from './features/auth/pages/ProfileSetupPage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import ContactPage from './pages/contact/ContactPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import UniversityPage from './pages/university/UniversityPage.jsx';
import UniversityDetailPage from './pages/university/UniversityDetailPage.jsx';
import CambodiaScholarshipPage from './pages/scholarship/cambodia/CambodiaScholarshipPage.jsx';
import AbroadScholarshipPage from './pages/scholarship/abroad/AbroadScholarshipPage.jsx';
import InternshipPage from './pages/scholarship/internship/InternshipPage.jsx';

// Cambodia Scholarship Detail Pages
import CambodiaOverviewPage from './pages/scholarship/cambodia/CambodiaOverviewPage.jsx';
import CambodiaEligibilityPage from './pages/scholarship/cambodia/CambodiaEligibilityPage.jsx';
import CambodiaBenefitsPage from './pages/scholarship/cambodia/CambodiaBenefitsPage.jsx';
import CambodiaApplicableProgramPage from './pages/scholarship/cambodia/CambodiaApplicableProgramPage.jsx';

// Abroad Scholarship Detail Pages
import AbroadOverviewPage from './pages/scholarship/abroad/AbroadOverviewPage.jsx';
import AbroadEligibilityPage from './pages/scholarship/abroad/AbroadEligibilityPage.jsx';
import AbroadBenefitsPage from './pages/scholarship/abroad/AbroadBenefitsPage.jsx';
import AbroadApplicableProgramPage from './pages/scholarship/abroad/AbroadApplicableProgramPage.jsx';

// Internship Detail Pages
import InternshipOverviewPage from './pages/scholarship/internship/InternshipOverviewPage.jsx';
import InternshipEligibilityPage from './pages/scholarship/internship/InternshipEligibilityPage.jsx';
import InternshipBenefitsPage from './pages/scholarship/internship/InternshipBenefitsPage.jsx';
import InternshipApplicableProgramPage from './pages/scholarship/internship/InternshipApplicableProgramPage.jsx';

import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile-setup" element={<ProfileSetupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          
          {/* University Routes */}
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/universities/:id" element={<UniversityDetailPage />} />
          
          {/* Scholarship Routes */}
          <Route path="/scholarships/cambodia" element={<CambodiaScholarshipPage />} />
          <Route path="/scholarships/cambodia/detail/:id/overview" element={<CambodiaOverviewPage />} />
          <Route path="/scholarships/cambodia/detail/:id/eligibility" element={<CambodiaEligibilityPage />} />
          <Route path="/scholarships/cambodia/detail/:id/benefits" element={<CambodiaBenefitsPage />} />
          <Route path="/scholarships/cambodia/detail/:id/program" element={<CambodiaApplicableProgramPage />} />
          
          <Route path="/scholarships/abroad" element={<AbroadScholarshipPage />} />
          <Route path="/scholarships/abroad/detail/:id/overview" element={<AbroadOverviewPage />} />
          <Route path="/scholarships/abroad/detail/:id/eligibility" element={<AbroadEligibilityPage />} />
          <Route path="/scholarships/abroad/detail/:id/benefits" element={<AbroadBenefitsPage />} />
          <Route path="/scholarships/abroad/detail/:id/program" element={<AbroadApplicableProgramPage />} />
          
          <Route path="/scholarships/internship" element={<InternshipPage />} />
          <Route path="/scholarships/internship/detail/:id/overview" element={<InternshipOverviewPage />} />
          <Route path="/scholarships/internship/detail/:id/eligibility" element={<InternshipEligibilityPage />} />
          <Route path="/scholarships/internship/detail/:id/benefits" element={<InternshipBenefitsPage />} />
          <Route path="/scholarships/internship/detail/:id/program" element={<InternshipApplicableProgramPage />} />
          
          
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;