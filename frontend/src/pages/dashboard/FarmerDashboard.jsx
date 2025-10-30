import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Tractor, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/Card';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function FarmerDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        activePrograms: [],
        weatherAlert: null,
        upcomingEvents: [],
        profile: null
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual API calls
            const data = {
                activePrograms: [
                    {
                        id: 1,
                        title: 'Organic Farming Training',
                        date: '2025-11-15',
                        status: 'Approved'
                    },
                    {
                        id: 2,
                        title: 'Seed Distribution Program',
                        date: '2025-11-20',
                        status: 'Pending'
                    }
                ],
                weatherAlert: {
                    type: 'warning',
                    message: 'Moderate rainfall expected in the next 3 days'
                },
                upcomingEvents: [
                    {
                        id: 1,
                        title: 'Farmers\' Meeting',
                        date: '2025-11-10',
                        location: 'Municipal Hall'
                    },
                    {
                        id: 2,
                        title: 'Agricultural Forum',
                        date: '2025-11-25',
                        location: 'Community Center'
                    }
                ],
                profile: {
                    farmSize: '2.5 hectares',
                    cropsGrown: ['Rice', 'Vegetables'],
                    memberSince: '2025'
                }
            };
            setDashboardData(data);
            setError(null);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error('Dashboard error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={fetchDashboardData}
                    className="mt-4 btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.first_name}!
                </h1>
                <p className="mt-2 text-gray-600">
                    Here's what's happening with your farming activities
                </p>
            </div>

            {/* Weather Alert */}
            {dashboardData.weatherAlert && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl"
                >
                    <div className="flex items-start">
                        <AlertTriangle className="h-6 w-6 text-yellow-400" />
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                {dashboardData.weatherAlert.message}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Dashboard Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Farm Profile */}
                <Card className="col-span-full lg:col-span-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Farm Profile</h2>
                        <Tractor className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mt-4 space-y-3">
                        <div>
                            <p className="text-sm text-gray-500">Farm Size</p>
                            <p className="font-medium">{dashboardData.profile.farmSize}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Crops Grown</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {dashboardData.profile.cropsGrown.map(crop => (
                                    <span
                                        key={crop}
                                        className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                                    >
                                        {crop}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium">{dashboardData.profile.memberSince}</p>
                        </div>
                    </div>
                </Card>

                {/* Active Programs */}
                <Card>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Active Programs</h2>
                        <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mt-4 space-y-4">
                        {dashboardData.activePrograms.map(program => (
                            <div
                                key={program.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">{program.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(program.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <span
                                    className={`px-2 py-1 text-sm rounded-full ${program.status === 'Approved'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {program.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Upcoming Events */}
                <Card>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                        <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="mt-4 space-y-4">
                        {dashboardData.upcomingEvents.map(event => (
                            <div
                                key={event.id}
                                className="p-3 bg-gray-50 rounded-lg"
                            >
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}