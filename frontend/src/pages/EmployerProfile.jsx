import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile, reset } from '../features/auth/authSlice';

const EmployerProfile = () => {
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        professionalRole: '',
        company: '',
        about: '',
    });

    const { name, email, professionalRole, company, about } = formData;

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                professionalRole: user.professionalRole || '',
                company: user.company || '',
                about: user.about || '',
            });
        }
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            alert('Profile updated successfully!');
            dispatch(reset());
            navigate('/');
        }
        if (isError) {
            alert(message);
            dispatch(reset());
        }
    }, [isSuccess, isError, message, dispatch, navigate]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white text-center">
                        <h1 className="text-4xl font-extrabold mb-2">My Professional Profile</h1>
                        <p className="text-indigo-100 opacity-90">Manage your identity and company presence</p>
                    </div>

                    <div className="p-8 lg:p-12">
                        <form onSubmit={onSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            placeholder="e.g. John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            placeholder="john@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                                        <input
                                            type="text"
                                            name="professionalRole"
                                            value={professionalRole}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            placeholder="e.g. HR Manager / CEO"
                                        />
                                    </div>
                                </div>

                                {/* Company Info */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Company Details</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={company}
                                            onChange={onChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            placeholder="e.g. Acme Inc."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">About Me / Company</label>
                                        <textarea
                                            name="about"
                                            value={about}
                                            onChange={onChange}
                                            rows="5"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                                            placeholder="Tell potential candidates about yourself or your company values..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-indigo-200"
                                >
                                    Save Profile Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerProfile;
