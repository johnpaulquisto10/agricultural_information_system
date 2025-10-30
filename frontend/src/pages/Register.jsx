import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userService } from '../services/userService';

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Information
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',

        // Farm Details
        farm_address: '',
        farm_size: '',
        farm_type: '',
        crops_grown: [],
        farming_experience: '',

        // Additional Information
        organization_member: false,
        organization_name: '',
        preferred_contact: 'email',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCropsChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            crops_grown: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await userService.register(formData);
            navigate('/login', {
                state: { message: 'Registration successful! Please login.' }
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="mt-1 input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="mt-1 input-field"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 input-field"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                        className="mt-1 input-field"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Farm Address
                </label>
                <input
                    type="text"
                    name="farm_address"
                    value={formData.farm_address}
                    onChange={handleChange}
                    required
                    className="mt-1 input-field"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Farm Size (hectares)
                    </label>
                    <input
                        type="number"
                        name="farm_size"
                        value={formData.farm_size}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                        className="mt-1 input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Farm Type
                    </label>
                    <select
                        name="farm_type"
                        value={formData.farm_type}
                        onChange={handleChange}
                        required
                        className="mt-1 input-field"
                    >
                        <option value="">Select Type</option>
                        <option value="rice">Rice Farm</option>
                        <option value="vegetable">Vegetable Farm</option>
                        <option value="fruit">Fruit Orchard</option>
                        <option value="mixed">Mixed Farming</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Crops Grown
                </label>
                <select
                    multiple
                    name="crops_grown"
                    value={formData.crops_grown}
                    onChange={handleCropsChange}
                    className="mt-1 input-field h-32"
                >
                    <option value="rice">Rice</option>
                    <option value="corn">Corn</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="coconut">Coconut</option>
                    <option value="banana">Banana</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                    Hold Ctrl (Cmd on Mac) to select multiple crops
                </p>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="mt-1 input-field"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Preferred Contact Method
                </label>
                <select
                    name="preferred_contact"
                    value={formData.preferred_contact}
                    onChange={handleChange}
                    className="mt-1 input-field"
                >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="sms">SMS</option>
                </select>
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="organization_member"
                    checked={formData.organization_member}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                    Member of a Farmers' Organization
                </label>
            </div>

            {formData.organization_member && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Organization Name
                    </label>
                    <input
                        type="text"
                        name="organization_name"
                        value={formData.organization_name}
                        onChange={handleChange}
                        className="mt-1 input-field"
                    />
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as a Farmer
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex justify-between">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className={`flex-1 relative ${i < 3 ? 'after:content-[""] after:h-1 after:w-full after:absolute after:top-3 after:left-0 after:bg-gray-200' : ''
                                        } ${i <= step ? 'after:bg-primary' : ''}`}
                                >
                                    <div
                                        className={`h-6 w-6 rounded-full ${i <= step ? 'bg-primary' : 'bg-gray-200'
                                            } flex items-center justify-center text-sm text-white relative z-10`}
                                    >
                                        {i}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-500">Personal Info</span>
                            <span className="text-xs text-gray-500">Farm Details</span>
                            <span className="text-xs text-gray-500">Contact Info</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {step === 1 && renderStep1()}
                            {step === 2 && renderStep2()}
                            {step === 3 && renderStep3()}
                        </motion.div>

                        <div className="flex justify-between">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="btn-secondary"
                                >
                                    Previous
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Processing...' : step === 3 ? 'Register' : 'Next'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}