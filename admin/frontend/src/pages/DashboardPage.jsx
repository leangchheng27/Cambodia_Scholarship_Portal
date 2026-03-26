import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getUsers, getAdminUniversities, getAdminScholarships, getAdminInternships, deleteUser, createUser, updateUser, deleteItem, updateItem, createItem, getItem } from '../components/adminApi.js';
import AIAnalytics from '../components/AIAnalytics.jsx';
import LoadingText from '../components/LoadingText.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import DashboardStats from '../components/sections/DashboardStats.jsx';
import UsersTable from '../components/sections/UsersTable.jsx';
import UniversitiesTable from '../components/sections/UniversitiesTable.jsx';
import ScholarshipsTable from '../components/sections/ScholarshipsTable.jsx';
import InternshipsTable from '../components/sections/InternshipsTable.jsx';
import ItemFormModal from '../components/modals/ItemFormModal.jsx';
import { getInitialFormState } from '../components/common/FormUtils.js';
import '../components/sections/TablesStyles.css';

const DashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [cambodiaScholarships, setCambodiaScholarships] = useState([]);
    const [abroadScholarships, setAbroadScholarships] = useState([]);
    const [scholarshipType, setScholarshipType] = useState('cambodia');
    const [universityProvince, setUniversityProvince] = useState('all');
    const [internships, setInternships] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentItem, setCurrentItem] = useState(null);
    const [formState, setFormState] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [universityPage, setUniversityPage] = useState(1);
    const [scholarshipPage, setScholarshipPage] = useState(1);
    const [internshipPage, setInternshipPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const navigate = useNavigate();

    const pageTitle = { 
        dashboard: 'Dashboard', 
        users: 'Users', 
        universities: 'Universities', 
        scholarships: 'Scholarships', 
        internships: 'Internships' 
    };

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const [statsRes, usersRes, universitiesRes, scholarshipsRes, internshipsRes] = await Promise.all([
                getDashboardStats(),
                getUsers(),
                getAdminUniversities(),
                getAdminScholarships(),
                getAdminInternships(),
            ]);

            setStats(statsRes.stats);
            setUsers(usersRes.users);
            setUniversities(universitiesRes.universities || []);
            setCambodiaScholarships(scholarshipsRes.cambodia || []);
            setAbroadScholarships(scholarshipsRes.abroad || []);
            setInternships(internshipsRes.internships || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                setError('Failed to load dashboard data');
            }
            setLoading(false);
        }
    };

    // Lightweight refresh for specific table after create/update
    const refreshTableData = async (tabName) => {
        try {
            if (tabName === 'users') {
                const usersRes = await getUsers();
                setUsers(usersRes.users);
            } else if (tabName === 'universities') {
                const universitiesRes = await getAdminUniversities();
                setUniversities(universitiesRes.universities || []);
            } else if (tabName === 'scholarships') {
                const scholarshipsRes = await getAdminScholarships();
                setCambodiaScholarships(scholarshipsRes.cambodia || []);
                setAbroadScholarships(scholarshipsRes.abroad || []);
            } else if (tabName === 'internships') {
                const internshipsRes = await getAdminInternships();
                setInternships(internshipsRes.internships || []);
            }
        } catch (err) {
            console.error(`Error refreshing ${tabName} data:`, err);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reset pages and filters when switching tabs
    useEffect(() => { 
        setUniversityPage(1);
        setUniversityProvince('all');
        setScholarshipPage(1); 
        setInternshipPage(1); 
    }, [activeTab]);

    useEffect(() => { 
        setScholarshipPage(1); 
    }, [scholarshipType]);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteUser(userId);
            refreshTableData('users');
        } catch (err) {
            alert('Failed to delete user: ' + (err.response?.data?.error || err.message));
        }
    };

    const handleDelete = async (type, id) => {
        const typeNames = {
            universities: 'university',
            scholarships: 'scholarship',
            internships: 'internship'
        };
        
        if (!window.confirm(`Are you sure you want to delete this ${typeNames[type]}?`)) {
            return;
        }

        try {
            await deleteItem(type, id);
            refreshTableData(type);
        } catch (err) {
            alert(`Failed to delete ${typeNames[type]}: ` + (err.response?.data?.error || err.message));
        }
    };

    const handleCreateOrEdit = async (type, item = null) => {
        setModalType(type);
        setShowModal(true);

        if (activeTab === 'users' || !item) {
            setCurrentItem(item);
            setFormState(getInitialFormState(activeTab, item));
            return;
        }

        try {
            const latestItem = await getItem(activeTab, item.id);
            setCurrentItem(latestItem);
            setFormState(getInitialFormState(activeTab, latestItem));
        } catch (err) {
            console.error('Failed to load latest item details:', err);
            setCurrentItem(item);
            setFormState(getInitialFormState(activeTab, item));
        }
    };

    const handleFieldChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const data = { ...formState };

        // Handle AI Metadata for Scholarships and Internships
        if (activeTab === 'scholarships' || activeTab === 'internships') {
            const aiMetadata = {};
            const fieldsToRemove = [];

            // Extract all ai_metadata_* fields
            for (const key in data) {
                if (key.startsWith('ai_metadata_')) {
                    const fieldName = key.replace('ai_metadata_', '');
                    const value = data[key];

                    if (value !== '' && value !== undefined && value !== null) {
                        // Convert comma-separated strings to arrays for certain fields
                        if (['studentTypes', 'fieldCategories', 'requiredSubjects', 'keywords'].includes(fieldName)) {
                            aiMetadata[fieldName] = value
                                .split(',')
                                .map(item => item.trim())
                                .filter(item => item !== '');
                        } else if (fieldName === 'minGPA') {
                            // Convert to number
                            aiMetadata[fieldName] = parseFloat(value);
                        } else {
                            aiMetadata[fieldName] = value;
                        }
                    }

                    fieldsToRemove.push(key);
                }
            }

            // Remove the individual ai_metadata_* fields
            fieldsToRemove.forEach(key => delete data[key]);

            // Add the combined ai_metadata object if it has any fields
            if (Object.keys(aiMetadata).length > 0) {
                data.ai_metadata = aiMetadata;
            }
        }

        // Capture current values before clearing state
        const itemToSave = currentItem;
        const tabName = activeTab;

        // Close modal immediately - API calls happen in background
        setShowModal(false);
        setCurrentItem(null);
        setFormState({});

        // Handle API submission and table refresh in background
        (async () => {
            try {
                if (tabName === 'users') {
                    // Strip empty password so it isn't accidentally blanked on edit
                    if (!data.password) delete data.password;
                    if (itemToSave) {
                        await updateUser(itemToSave.id, data);
                    } else {
                        await createUser(data);
                    }
                } else {
                    const endpoint = tabName;
                    if (itemToSave) {
                        await updateItem(endpoint, itemToSave.id, data);
                    } else {
                        await createItem(endpoint, data);
                    }
                }
                
                // Refresh table data after successful save
                refreshTableData(tabName);
            } catch (err) {
                console.error('Failed to save:', err);
                alert('Failed to save: ' + (err.response?.data?.error || err.message));
                // Optional: Re-open modal on error
                setShowModal(true);
                setCurrentItem(itemToSave);
                setFormState(data);
            }
        })();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} pageTitle={pageTitle[activeTab]}>
                <div className="admin-loading">
                    <LoadingText text="Loading dashboard data..." />
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} pageTitle={pageTitle[activeTab]}>
                <div className="admin-error">{error}</div>
            </AdminLayout>
        );
    }

    return (
        <>
            <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} pageTitle={pageTitle[activeTab]}>
                {/* Dashboard Section */}
                {activeTab === 'dashboard' && (
                    <>
                        <DashboardStats stats={stats} />
                        <AIAnalytics />
                    </>
                )}

                {/* Users Section */}
                {activeTab === 'users' && (
                    <UsersTable 
                        users={users}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                        onEdit={(type, item) => handleCreateOrEdit(type, item)}
                        onDelete={handleDeleteUser}
                    />
                )}

                {/* Universities Section */}
                {activeTab === 'universities' && (
                    <UniversitiesTable 
                        universities={universities}
                        currentPage={universityPage}
                        setCurrentPage={setUniversityPage}
                        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                        onEdit={(type, item) => handleCreateOrEdit(type, item)}
                        onDelete={(id) => handleDelete('universities', id)}
                        selectedProvince={universityProvince}
                        setSelectedProvince={setUniversityProvince}
                    />
                )}

                {/* Scholarships Section */}
                {activeTab === 'scholarships' && (
                    <ScholarshipsTable 
                        cambodiaScholarships={cambodiaScholarships}
                        abroadScholarships={abroadScholarships}
                        scholarshipType={scholarshipType}
                        setScholarshipType={setScholarshipType}
                        currentPage={scholarshipPage}
                        setCurrentPage={setScholarshipPage}
                        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                        onEdit={(type, item) => handleCreateOrEdit(type, item)}
                        onDelete={(id) => handleDelete('scholarships', id)}
                    />
                )}

                {/* Internships Section */}
                {activeTab === 'internships' && (
                    <InternshipsTable 
                        internships={internships}
                        currentPage={internshipPage}
                        setCurrentPage={setInternshipPage}
                        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                        onEdit={(type, item) => handleCreateOrEdit(type, item)}
                        onDelete={(id) => handleDelete('internships', id)}
                    />
                )}
            </AdminLayout>

            {/* Modal Form */}
            <ItemFormModal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                modalType={modalType}
                activeTab={activeTab}
                currentItem={currentItem}
                formState={formState}
                onFieldChange={handleFieldChange}
                onSubmit={handleSubmitForm}
            />
        </>
    );
};

export default DashboardPage;
