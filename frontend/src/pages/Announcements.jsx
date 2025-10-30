import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { announcementService } from '../services/announcementService';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const data = await announcementService.getAll();
            setAnnouncements(data);
            setError(null);
        } catch (err) {
            setError('Failed to load announcements');
            console.error('Error fetching announcements:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredAnnouncements = announcements.filter(announcement => {
        const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || announcement.category === filter;
        return matchesSearch && matchesFilter;
    });

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                    onClick={fetchAnnouncements}
                    className="mt-4 btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Announcements
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Stay updated with the latest agricultural news and advisories
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 input-field"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="input-field"
                >
                    <option value="all">All Categories</option>
                    <option value="weather">Weather Advisory</option>
                    <option value="program">Program Updates</option>
                    <option value="news">News</option>
                    <option value="event">Events</option>
                </select>
            </div>

            {/* Announcements Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAnnouncements.length > 0 ? (
                    filteredAnnouncements.map((announcement, index) => (
                        <Card
                            key={announcement.id}
                            animate
                            delay={index * 0.1}
                        >
                            <span className="text-xs font-semibold text-primary">
                                {announcement.category}
                            </span>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                {announcement.title}
                            </h3>
                            <p className="mt-3 text-base text-gray-500">
                                {announcement.content}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {new Date(announcement.created_at).toLocaleDateString()}
                                </span>
                                <button
                                    onClick={() => {/* TODO: Show full announcement */ }}
                                    className="text-primary hover:text-primary-dark font-medium"
                                >
                                    Read More
                                </button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No announcements found</p>
                    </div>
                )}
            </div>
        </div>
    );
}