import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PublicProfile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/profile/${id}`);
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading profile...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-3xl overflow-hidden">
                    {/* Header/Cover */}
                    <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    {/* Profile Information */}
                    <div className="relative px-8 pb-12">
                        <div className="relative -mt-16 mb-6">
                            <div className="inline-block p-2 bg-white rounded-full shadow-lg">
                                <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-4xl font-bold text-indigo-600">
                                    {profile.name?.charAt(0)}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="md:col-span-2">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                                <p className="text-xl text-indigo-600 font-medium mb-4">
                                    {profile.professionalRole || 'Professional'} {profile.company && `at ${profile.company}`}
                                </p>

                                <div className="prose max-w-none text-gray-600 mb-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                                    <p className="whitespace-pre-line">
                                        {profile.about || "No about information provided."}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm truncate">{profile.email}</span>
                                    </div>
                                    {profile.company && (
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                            </svg>
                                            <span className="text-sm font-medium">{profile.company}</span>
                                        </div>
                                    )}
                                </div>
                                <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300">
                                    Contact {profile.name.split(' ')[0]}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link to="/jobs" className="text-indigo-600 font-medium hover:text-indigo-800 transition">
                        ← Back to Job Listings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
