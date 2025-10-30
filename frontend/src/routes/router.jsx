import { lazy } from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const Announcements = lazy(() => import('../pages/Announcements'));
const Programs = lazy(() => import('../pages/Programs'));
const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));
const FarmerDashboard = lazy(() => import('../pages/dashboard/FarmerDashboard'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'announcements', element: <Announcements /> },
            { path: 'programs', element: <Programs /> },
            { path: 'register', element: <Register /> },
            { path: 'login', element: <Login /> },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <FarmerDashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);