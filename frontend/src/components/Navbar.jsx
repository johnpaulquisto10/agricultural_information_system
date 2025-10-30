import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Announcements', href: '/announcements' },
        { name: 'Programs', href: '/programs' },
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img
                                className="h-10 w-auto"
                                src="/logo.png"
                                alt="Bansud Agricultural Information System"
                            />
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`${location.pathname === item.href
                                            ? 'nav-link-active'
                                            : 'nav-link'
                                        } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                        <Link to="/register" className="btn-secondary">
                            Register as Farmer
                        </Link>
                        <Link to="/login" className="btn-primary">
                            Login
                        </Link>
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`${location.pathname === item.href
                                        ? 'bg-primary-light bg-opacity-10 text-primary'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    } block pl-3 pr-4 py-2 text-base font-medium`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/register"
                            className="block pl-3 pr-4 py-2 text-base font-medium text-accent-dark hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Register as Farmer
                        </Link>
                        <Link
                            to="/login"
                            className="block pl-3 pr-4 py-2 text-base font-medium text-primary hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}