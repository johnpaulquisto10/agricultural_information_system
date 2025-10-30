import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Contact Information
                        </h3>
                        <div className="mt-4 space-y-4">
                            <p className="text-base text-gray-500 flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-primary" />
                                Municipal Agriculture Office
                                <br />
                                Bansud, Oriental Mindoro
                            </p>
                            <p className="text-base text-gray-500 flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-primary" />
                                (123) 456-7890
                            </p>
                            <p className="text-base text-gray-500 flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-primary" />
                                agriculture@bansud.gov.ph
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Quick Links
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/announcements" className="text-base text-gray-500 hover:text-primary">
                                    Latest Announcements
                                </Link>
                            </li>
                            <li>
                                <Link to="/programs" className="text-base text-gray-500 hover:text-primary">
                                    Agricultural Programs
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-base text-gray-500 hover:text-primary">
                                    Farmer Registration
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                            Legal
                        </h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/privacy" className="text-base text-gray-500 hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-base text-gray-500 hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        © {new Date().getFullYear()} Municipality of Bansud. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}