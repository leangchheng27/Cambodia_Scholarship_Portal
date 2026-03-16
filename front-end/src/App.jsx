import AboutPage from "./pages/about/AboutPage.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import AbroadScholarshipPage from "./pages/scholarship/abroad/AbroadScholarshipPage.jsx";
import AbroadScholarshipDetailPage from "./pages/scholarship/abroad/AbroadScholarshipDetailPage.jsx";
import CambodiaScholarshipPage from "./pages/scholarship/cambodia/CambodiaScholarshipPage.jsx";
import CambodiaScholarshipDetailPage from "./pages/scholarship/cambodia/CambodiaScholarshipDetailPage.jsx";
import InternshipPage from "./pages/scholarship/internship/InternshipPage.jsx";
import InternshipDetailPage from "./pages/scholarship/internship/InternshipDetailPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import ProfileSetupPage from "./features/auth/pages/ProfileSetupPage.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import UniversityPage from "./pages/university/UniversityPage.jsx";
import UniversityDetailPage from "./pages/university/UniversityDetailPage.jsx";
import { isProfileCompleted } from "./utils/profileHelpers.js";
import ServicePage from "./pages/service/ServicePage.jsx";

// Redirect component for old routes
const ScholarshipRedirect = ({ basePath }) => {
  const { id } = useParams();
  return <Navigate to={`${basePath}/detail/${id}`} replace />;
};

const ProtectedRoute = ({ children, requireProfile = true }) => {
  const { user, profile } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only check profile completion for homepage access
  // Allow users with any profile data to access the site
  if (requireProfile && location.pathname === '/home') {
    // Check if profile has ANY data at all (lenient check for existing users)
    const hasProfileData = profile && (
      profile.profileType || 
      profile.grades || 
      profile.studentType || 
      profile.universityField ||
      Object.keys(profile).length > 0
    );
    
    if (!hasProfileData) {
      console.log('No profile data found, redirecting to profile setup');
      return <Navigate to="/profile-setup" replace />;
    }
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route 
            path="/profile-setup" 
            element={
              <ProtectedRoute requireProfile={false}>
                <ProfileSetupPage />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
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
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/scholarships/cambodia" element={<CambodiaScholarshipPage />} />
          <Route path="/scholarships/cambodia/detail/:id" element={<CambodiaScholarshipDetailPage />} />
          {/* Redirect old routes to new unified detail page */}
          <Route path="/scholarships/cambodia/detail/:id/overview" element={<ScholarshipRedirect basePath="/scholarships/cambodia" />} />
          <Route path="/scholarships/cambodia/detail/:id/eligibility" element={<ScholarshipRedirect basePath="/scholarships/cambodia" />} />
          <Route path="/scholarships/cambodia/detail/:id/applicable-program" element={<ScholarshipRedirect basePath="/scholarships/cambodia" />} />
          <Route path="/scholarships/cambodia/detail/:id/benefits" element={<ScholarshipRedirect basePath="/scholarships/cambodia" />} />
          
          <Route path="/scholarships/abroad" element={<AbroadScholarshipPage />} />
          <Route path="/scholarships/abroad/detail/:id" element={<AbroadScholarshipDetailPage />} />
          {/* Redirect old routes to new unified detail page */}
          <Route path="/scholarships/abroad/detail/:id/overview" element={<ScholarshipRedirect basePath="/scholarships/abroad" />} />
          <Route path="/scholarships/abroad/detail/:id/eligibility" element={<ScholarshipRedirect basePath="/scholarships/abroad" />} />
          <Route path="/scholarships/abroad/detail/:id/applicable-program" element={<ScholarshipRedirect basePath="/scholarships/abroad" />} />
          <Route path="/scholarships/abroad/detail/:id/benefits" element={<ScholarshipRedirect basePath="/scholarships/abroad" />} />
          
          <Route path="/scholarships/internship" element={<InternshipPage />} />
          <Route path="/scholarships/internship/detail/:id" element={<InternshipDetailPage />} />
          {/* Redirect old routes to new unified detail page */}
          <Route path="/scholarships/internship/detail/:id/overview" element={<ScholarshipRedirect basePath="/scholarships/internship" />} />
          <Route path="/scholarships/internship/detail/:id/eligibility" element={<ScholarshipRedirect basePath="/scholarships/internship" />} />
          <Route path="/scholarships/internship/detail/:id/applicable-program" element={<ScholarshipRedirect basePath="/scholarships/internship" />} />
          <Route path="/scholarships/internship/detail/:id/benefits" element={<ScholarshipRedirect basePath="/scholarships/internship" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
