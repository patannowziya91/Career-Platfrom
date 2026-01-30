import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import JobForm from '../components/JobForm';
import JobItem from '../components/JobItem';
import { getMyJobs, reset } from '../features/jobs/jobSlice';

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [jobToEdit, setJobToEdit] = useState(null);

    const { user } = useSelector((state) => state.auth);
    const { jobs, isLoading, isError, message } = useSelector(
        (state) => state.jobs
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate('/login');
        }

        dispatch(getMyJobs());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    const handleEdit = (job) => {
        setJobToEdit(job);
        window.scrollTo(0, 0); // Scroll to form
    };

    const clearEdit = () => {
        setJobToEdit(null);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Employer Hub</h1>
                            <p className="mt-1 text-lg text-gray-500">
                                Welcome back, <span className="font-semibold text-indigo-600">{user?.name}</span>. Manage your talent pipeline here.
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setJobToEdit(null)}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Post New Job
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center">
                            <div className="p-3 bg-indigo-50 rounded-xl">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Listings</p>
                                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                            </div>
                        </div>
                    </div>
                    {/* Placeholder for more stats */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 opacity-60">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-50 rounded-xl">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Applications</p>
                                <p className="text-2xl font-bold text-gray-900">--</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Right Column: List (Moved to left on large screens for priority) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Your Postings</h2>
                            <span className="text-sm text-gray-500">{jobs.length} jobs total</span>
                        </div>

                        {jobs.length > 0 ? (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <JobItem key={job._id} job={job} onEdit={handleEdit} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl py-16 px-4 text-center">
                                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No active postings</h3>
                                <p className="mt-1 text-gray-500">Get started by creating your first job listing.</p>
                            </div>
                        )}
                    </div>

                    {/* Left Column: Form (Sticky sidebar) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="p-6 bg-indigo-600 text-white">
                                    <h2 className="text-xl font-bold">{jobToEdit ? 'Update details' : 'Post a new role'}</h2>
                                    <p className="text-indigo-100 text-sm mt-1">
                                        {jobToEdit ? 'Modify your existing job listing' : 'Fill in the information below to start hiring'}
                                    </p>
                                </div>
                                <div className="p-6">
                                    <JobForm jobToEdit={jobToEdit} clearEdit={clearEdit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
