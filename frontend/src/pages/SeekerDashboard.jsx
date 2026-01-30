import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyApplications, reset } from '../features/applications/applicationSlice';
import { useNavigate } from 'react-router-dom';

const SeekerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { applications, isLoading } = useSelector((state) => state.applications);

    useEffect(() => {
        if (!user) navigate('/login');
        dispatch(getMyApplications());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, dispatch]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Welcome Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                Welcome back, <span className="text-indigo-600 font-black">{user?.name}</span>
                            </h1>
                            <p className="text-gray-500 mt-2 text-lg">Track your career progress and applications.</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate('/jobs')}
                                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1"
                            >
                                Browse New Jobs
                            </button>
                            <button
                                onClick={() => navigate('/seeker/profile/edit')}
                                className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Sticky Sidebar / Profile Overview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 sticky top-8">
                            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 font-black text-3xl mb-6">
                                {user?.name?.charAt(0)}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
                            <p className="text-gray-500 font-medium mb-6">{user?.email}</p>

                            <div className="space-y-6 border-t border-gray-50 pt-6">
                                <div>
                                    <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">My Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {user?.skills && user.skills.length > 0 ? (
                                            user.skills.map((skill, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-bold rounded-lg border border-gray-100 italic">
                                                    #{skill}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-400">No skills added yet.</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">My Resume</h3>
                                    {user?.resume ? (
                                        <a href={user.resume} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold text-sm hover:underline">
                                            View Uploaded Document &rarr;
                                        </a>
                                    ) : (
                                        <p className="text-sm text-gray-400">Not uploaded.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Application History List */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Application History</h2>
                            <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">
                                {applications.length} Applications Total
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-28 bg-white rounded-[2rem] animate-pulse border border-gray-100"></div>
                                ))}
                            </div>
                        ) : applications.length > 0 ? (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div
                                        key={app._id}
                                        className="bg-white rounded-[2rem] p-8 border border-gray-50 shadow-sm hover:shadow-md transition-all group"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-6">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                    {(app.jobID?.title || 'J').charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{app.jobID?.title || 'Job Unavailable'}</h3>
                                                    <p className="text-gray-500 font-medium">{app.jobID?.location || 'Remote'}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-10">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Status</p>
                                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black border transition-colors ${app.status === 'Accepted' ? 'bg-green-50 text-green-700 border-green-100' :
                                                            app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                                                'bg-yellow-50 text-yellow-700 border-yellow-100'
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                                <div className="text-right hidden md:block">
                                                    <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Applied On</p>
                                                    <p className="font-bold text-gray-900">{new Date(app.appliedDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2rem] py-20 border border-dashed border-gray-200 text-center">
                                <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
                                <p className="text-gray-500 mb-8">Start your journey today by applying to jobs.</p>
                                <button
                                    onClick={() => navigate('/jobs')}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition"
                                >
                                    Browse Job Feed
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeekerDashboard;
