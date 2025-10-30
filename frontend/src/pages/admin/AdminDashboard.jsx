import { useState, useEffect } from 'react';
import {
    Users,
    CalendarRange,
    Newspaper,
    TrendingUp,
    Plus,
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import Card from '../../components/Card';
import DataTable from '../../components/DataTable';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const [dashboardData, setDashboardData] = useState({
        stats: {
            totalFarmers: 0,
            activePrograms: 0,
            pendingApplications: 0,
            monthlyRegistrations: []
        },
        farmers: [],
        programs: [],
        announcements: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual API calls
            const data = {
                stats: {
                    totalFarmers: 250,
                    activePrograms: 5,
                    pendingApplications: 12,
                    monthlyRegistrations: [
                        { month: 'Jan', registrations: 20 },
                        { month: 'Feb', registrations: 25 },
                        { month: 'Mar', registrations: 30 },
                        { month: 'Apr', registrations: 22 },
                        { month: 'May', registrations: 28 },
                        { month: 'Jun', registrations: 35 }
                    ]
                },
                farmers: [
                    {
                        id: 1,
                        name: 'Juan Dela Cruz',
                        location: 'Brgy. San Antonio',
                        farmSize: '2.5 ha',
                        crops: 'Rice, Vegetables',
                        status: 'Active'
                    },
                    // Add more sample farmers...
                ],
                programs: [
                    {
                        id: 1,
                        title: 'Organic Farming Training',
                        participants: 45,
                        status: 'Active',
                        startDate: '2025-11-01'
                    },
                    // Add more sample programs...
                ],
                announcements: [
                    {
                        id: 1,
                        title: 'Weather Advisory',
                        type: 'Alert',
                        date: '2025-10-30',
                        status: 'Published'
                    },
                    // Add more sample announcements...
                ]
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

    const renderOverview = () => (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Farmers</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {dashboardData.stats.totalFarmers}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100">
                            <CalendarRange className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Active Programs</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {dashboardData.stats.activePrograms}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100">
                            <TrendingUp className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Pending Applications</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {dashboardData.stats.pendingApplications}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100">
                            <Newspaper className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Announcements</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {dashboardData.announcements.length}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Registration Chart */}
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Monthly Farmer Registrations
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dashboardData.stats.monthlyRegistrations}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="registrations" fill="#2E7D32" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );

    const renderFarmers = () => (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Registered Farmers
                </h3>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Farmer
                </button>
            </div>
            <DataTable
                columns={[
                    { key: 'name', label: 'Name' },
                    { key: 'location', label: 'Location' },
                    { key: 'farmSize', label: 'Farm Size' },
                    { key: 'crops', label: 'Crops' },
                    { key: 'status', label: 'Status' },
                ]}
                data={dashboardData.farmers}
                onRowClick={(farmer) => console.log('Clicked farmer:', farmer)}
            />
        </Card>
    );

    const renderPrograms = () => (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Agricultural Programs
                </h3>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                </button>
            </div>
            <DataTable
                columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'participants', label: 'Participants' },
                    { key: 'status', label: 'Status' },
                    { key: 'startDate', label: 'Start Date' },
                ]}
                data={dashboardData.programs}
                onRowClick={(program) => console.log('Clicked program:', program)}
            />
        </Card>
    );

    const renderAnnouncements = () => (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Announcements
                </h3>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Announcement
                </button>
            </div>
            <DataTable
                columns={[
                    { key: 'title', label: 'Title' },
                    { key: 'type', label: 'Type' },
                    { key: 'date', label: 'Date' },
                    { key: 'status', label: 'Status' },
                ]}
                data={dashboardData.announcements}
                onRowClick={(announcement) => console.log('Clicked announcement:', announcement)}
            />
        </Card>
    );

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
            {/* Page Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-gray-600">
                    Manage farmers, programs, and announcements
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {['overview', 'farmers', 'programs', 'announcements'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${activeTab === tab
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium capitalize`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'farmers' && renderFarmers()}
            {activeTab === 'programs' && renderPrograms()}
            {activeTab === 'announcements' && renderAnnouncements()}

            {/* Add Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title={`Add ${activeTab.slice(0, -1)}`}
            >
                <div className="mt-4">
                    <p className="text-sm text-gray-500">
                        Form content will go here based on the active tab.
                    </p>
                </div>
            </Modal>
        </div>
    );
}