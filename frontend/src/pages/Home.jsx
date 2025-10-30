import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative bg-green-50 rounded-3xl overflow-hidden">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block">Welcome to</span>
                                <span className="block text-primary">
                                    Bansud Agricultural Information System
                                </span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Your one-stop platform for agricultural information, programs, and
                                services in the Municipality of Bansud.
                            </p>
                            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                <div className="rounded-md shadow">
                                    <Link
                                        to="/register"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                                    >
                                        Register as Farmer
                                    </Link>
                                </div>
                                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                    <Link
                                        to="/programs"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                                    >
                                        View Programs
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Latest Announcements Section */}
            <section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                            Latest Announcements
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Stay updated with the latest agricultural news and advisories
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* This will be populated with actual announcements from the API */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="card"
                        >
                            <span className="text-xs font-semibold text-primary">
                                Weather Advisory
                            </span>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                Rainfall Forecast for Next Week
                            </h3>
                            <p className="mt-3 text-base text-gray-500">
                                Expected moderate to heavy rains. Farmers advised to prepare
                                drainage systems.
                            </p>
                        </motion.div>

                        {/* Placeholder announcements - will be replaced with real data */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="card"
                        >
                            <span className="text-xs font-semibold text-primary">Program</span>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                Free Seeds Distribution
                            </h3>
                            <p className="mt-3 text-base text-gray-500">
                                Registration ongoing for the quarterly seed distribution program.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="card"
                        >
                            <span className="text-xs font-semibold text-primary">Training</span>
                            <h3 className="mt-2 text-xl font-semibold text-gray-900">
                                Organic Farming Workshop
                            </h3>
                            <p className="mt-3 text-base text-gray-500">
                                Join us for a hands-on workshop on organic farming techniques.
                            </p>
                        </motion.div>
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            to="/announcements"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            View All Announcements
                        </Link>
                    </div>
                </div>
            </section>

            {/* Weather Updates Section */}
            <section className="bg-primary bg-opacity-5 rounded-3xl py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                            Weather Updates
                        </h2>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Plan your farming activities with our weather forecasts
                        </p>
                    </div>

                    <div className="mt-12">
                        {/* Weather widget will be implemented here */}
                        <div className="bg-white shadow rounded-2xl p-6">
                            <p className="text-center text-gray-500">
                                Weather information will be displayed here
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}