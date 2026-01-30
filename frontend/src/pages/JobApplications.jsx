import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getJobApplications, updateApplicationStatus, reset } from '../features/applications/applicationSlice';

const JobApplications = () => {
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { applications, isLoading } = useSelector((state) => state.applications);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        dispatch(getJobApplications(jobId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, jobId]);

    const handleStatusChange = (e, id, newStatus) => {
        e.stopPropagation(); // Prevent card from collapsing when changing status
        dispatch(updateApplicationStatus({ id, status: newStatus }));
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate('/employer/dashboard')}
                            className="flex items-center text-indigo-600 font-bold text-sm mb-4 hover:translate-x-1 transition"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Dashboard
                        </button>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Applications</h1>
                        <p className="text-gray-500 mt-1">Review and manage candidates for this position</p>
                    </div>
                    <div className="bg-indigo-50 px-6 py-4 rounded-3xl border border-indigo-100">
                        <span className="text-indigo-600 font-bold text-2xl">{applications.length}</span>
                        <span className="text-indigo-400 font-medium ml-2">Submissions</span>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {isLoading ? (
                    <div className="flex flex-col space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-gray-100"></div>
                        ))}
                    </div>
                ) : applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                onClick={() => toggleExpand(app._id)}
                                className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden cursor-pointer ${expandedId === app._id
                                    ? 'border-indigo-300 shadow-xl shadow-indigo-100'
                                    : 'border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {/* Main Content - Always Visible */}
                                <div className="p-6 md:p-8 flex flex-wrap items-center justify-between gap-6">
                                    <div className="flex items-center space-x-5">
                                        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xl uppercase">
                                            {app.seekerName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{app.seekerName}</h3>
                                            <p className="text-sm text-gray-500 font-medium">{app.expertise || 'General Applicant'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-8">
                                        <div className="hidden md:block">
                                            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Status</p>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-inset ${app.status === 'Accepted' ? 'bg-green-50 text-green-700 ring-green-200' :
                                                app.status === 'Rejected' ? 'bg-red-50 text-red-700 ring-red-200' :
                                                    'bg-yellow-50 text-yellow-700 ring-yellow-200'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <div className="hidden lg:block text-right">
                                            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Applied On</p>
                                            <p className="font-bold text-gray-700">{new Date(app.appliedDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className={`p-2 rounded-full transition-transform duration-300 ${expandedId === app._id ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content - Details Table */}
                                <div className={`transition-all duration-300 ease-in-out border-t border-gray-50 bg-gray-50/30 ${expandedId === app._id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                                    }`}>
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Professional Summary</h4>
                                                <p className="text-gray-700 leading-relaxed font-medium">Expertise in <span className="text-gray-900">{app.expertise}</span></p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Academic Background</h4>
                                                <p className="text-gray-700 leading-relaxed font-medium">{app.education || 'No education background specified'}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Contact Email</h4>
                                                <p className="text-gray-700 font-bold">{app.seekerID.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-between">
                                            <div className="space-y-6">
                                                <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-3">Application Pipeline</h4>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" onClick={(e) => e.stopPropagation()}>
                                                    {['Pending', 'Reviewed', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'].map((status) => (
                                                        <button
                                                            key={status}
                                                            onClick={(e) => handleStatusChange(e, app._id, status)}
                                                            className={`py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all duration-200 border-2 ${app.status === status
                                                                    ? status === 'Accepted' ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-100' :
                                                                        status === 'Rejected' ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-100' :
                                                                            status === 'Shortlisted' ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-100' :
                                                                                'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-200 hover:text-indigo-600'
                                                                }`}
                                                        >
                                                            {status}
                                                        </button>
                                                    ))}
                                                </div>

                                                <a
                                                    href={app.resumeURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center justify-center space-x-3 py-4 bg-white border-2 border-indigo-100 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all shadow-sm w-full"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    <span>Open Portfolio / Resume</span>
                                                </a>
                                            </div>
                                            <p className="text-[10px] text-gray-400 text-center mt-6">Application Reference: {app._id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-500">Share your job post to start receiving candidate submissions.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplications;
