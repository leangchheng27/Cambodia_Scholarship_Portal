import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import LoginPage from './features/auth/pages/LoginPage.jsx';
import RegisterPage from './features/auth/pages/RegisterPage.jsx';
import ProfileSetupPage from './features/auth/pages/ProfileSetupPage.jsx';
import ProfilePage from './pages/profile/ProfilePage.jsx';
import CambodiaListPage from './pages/cambodia/CambodiaListPage.jsx';
import CambodiaOverviewPage from './pages/cambodia/CambodiaOverviewPage.jsx';
import CambodiaApplicableProgramPage from './pages/cambodia/CambodiaApplicableProgramPage.jsx';
import CambodiaBenefitsPage from './pages/cambodia/CambodiaBenefitsPage.jsx';
import CambodiaEligibilityPage from './pages/cambodia/CambodiaEligibilityPage.jsx';
import AbroadListPage from './pages/Abroad/AbroadListPage.jsx';
import AbroadOverviewPage from './pages/Abroad/AbroadOverviewPage.jsx';
import AbroadApplicableProgramPage from './pages/Abroad/AbroadApplicableProgramPage.jsx';
import AbroadBenefitsPage from './pages/Abroad/AbroadBenefitsPage.jsx';
import AbroadEligibilityPage from './pages/Abroad/AbroadEligibilityPage.jsx';
import InternshipListPage from './pages/internship/InternshipListPage.jsx';
import InternshipOverviewPage from './pages/internship/InternshipOverviewPage.jsx';
import InternshipApplicableProgramPage from './pages/internship/InternshipApplicableProgramPage.jsx';
import InternshipBenefitsPage from './pages/internship/InternshipBenefitsPage.jsx';
import InternshipEligibilityPage from './pages/internship/InternshipEligibilityPage.jsx';
import UniversityListPage from './pages/university/UniversityListPage.jsx';
import ContactPage from './pages/contact/ContactPage.jsx';
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Cambodia Scholarship Routes */}
        <Route path="/cambodia" element={<CambodiaListPage />} />
        <Route path="/cambodia/detail/:id/overview" element={<CambodiaOverviewPage />} />
        <Route path="/cambodia/detail/:id/program" element={<CambodiaApplicableProgramPage />} />
        <Route path="/cambodia/detail/:id/benefits" element={<CambodiaBenefitsPage />} />
        <Route path="/cambodia/detail/:id/eligibility" element={<CambodiaEligibilityPage />} />
        
        {/* Abroad Scholarship Routes */}
        <Route path="/abroad" element={<AbroadListPage />} />
        <Route path="/abroad/detail/:id/overview" element={<AbroadOverviewPage />} />
        <Route path="/abroad/detail/:id/program" element={<AbroadApplicableProgramPage />} />
        <Route path="/abroad/detail/:id/benefits" element={<AbroadBenefitsPage />} />
        <Route path="/abroad/detail/:id/eligibility" element={<AbroadEligibilityPage />} />
        
        {/* Internship Routes */}
        <Route path="/internship" element={<InternshipListPage />} />
        <Route path="/internship/detail/:id/overview" element={<InternshipOverviewPage />} />
        <Route path="/internship/detail/:id/program" element={<InternshipApplicableProgramPage />} />
        <Route path="/internship/detail/:id/benefits" element={<InternshipBenefitsPage />} />
        <Route path="/internship/detail/:id/eligibility" element={<InternshipEligibilityPage />} />
        
        {/* University Route */}
        <Route path="/university" element={<UniversityListPage />} />
        
        {/* Contact Route */}
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="*" element={<Navigate to="/home" replace />} />
        
      </Routes>
    </>
  );
};

export default App;
