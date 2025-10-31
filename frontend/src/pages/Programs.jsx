import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { programService } from '../services/programService';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

export default function Programs() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const { user } = useAuth();

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const data = await programService.getActive();
            setPrograms(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching programs:', err);
            // The service will now return static data on error
            const data = await programService.getActive();
            setPrograms(data);
            setError('Unable to connect to server. Showing available programs.');
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (programId) => {
        try {
            await programService.apply(programId);
            // Refresh programs to update status
            fetchPrograms();
        } catch (err) {
            console.error('Error applying to program:', err);
            // TODO: Show error toast
        }
    };

    const filteredPrograms = programs.filter(program => {
        const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || program.status === filter;
        return matchesSearch && matchesFilter;
    });

    if (loading) return <LoadingSpinner />;

    if (error) {
        // Even if there's an error, we'll still show the programs from static data
        fetchPrograms();
        return (
            <div className="text-center py-4">
                <p className="text-amber-600">Unable to connect to server. Showing available programs.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                    Agricultural Programs
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    Discover and participate in our agricultural development programs
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search programs..."
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
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Programs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.length > 0 ? (
                    filteredPrograms.map((program, index) => (
                        <Card
                            key={program.id}
                            animate
                            delay={index * 0.1}
                            className="flex flex-col"
                        >
                            {program.image_url && (
                                <img
                                    src={program.image_url}
                                    alt={program.title}
                                    className="w-full h-48 object-cover rounded-t-xl mb-4"
                                />
                            )}
                            <div className="flex-1">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${program.status === 'open' ? 'bg-green-100 text-green-800' :
                                        program.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {program.status.toUpperCase()}
                                </span>
                                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                    {program.title}
                                </h3>
                                <p className="mt-3 text-base text-gray-500">
                                    {program.description}
                                </p>

                                <div className="mt-4 space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>
                                            {new Date(program.start_date).toLocaleDateString()} - {new Date(program.end_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        <span>{program.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>{program.participants_count} participants</span>
                                    </div>
                                </div>
                            </div>

                            {user && program.status === 'open' && (
                                <button
                                    onClick={() => handleApply(program.id)}
                                    className="mt-4 w-full btn-primary"
                                >
                                    Apply Now
                                </button>
                            )}

                            {!user && program.status === 'open' && (
                                <p className="mt-4 text-center text-sm text-gray-500">
                                    Please <a href="/login" className="text-primary hover:text-primary-dark">login</a> to apply
                                </p>
                            )}
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No programs found</p>
                    </div>
                )}
            </div>
        </div>
    );
}