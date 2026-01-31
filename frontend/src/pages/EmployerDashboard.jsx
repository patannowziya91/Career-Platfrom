import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
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
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly
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
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200/60 sticky top-[72px] z-40 backdrop-blur-md bg-white/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Employer Hub</h1>
                            <p className="mt-1 text-slate-500 font-medium">
                                Welcome back, <span className="text-indigo-600 font-bold">{user?.name}</span>. Here's your recruitment overview.
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setJobToEdit(null)}
                                className="inline-flex items-center px-6 py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all duration-200"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Post New Job
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Main Content: Postings List */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Stats Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="glass p-6 rounded-[2rem] border border-slate-200/50 flex items-center space-x-5">
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                    <svg className="h-7 w-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Listings</p>
                                    <p className="text-3xl font-black text-slate-900">{jobs.length}</p>
                                </div>
                            </div>

                            <div className="glass p-6 rounded-[2rem] border border-slate-200/50 flex items-center space-x-5">
                                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center">
                                    <svg className="h-7 w-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Applicants</p>
                                    <p className="text-3xl font-black text-slate-900 placeholder:opacity-50">--</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-end justify-between px-2">
                                <h2 className="text-2xl font-black text-slate-900">Your Active Postings</h2>
                                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                    {jobs.length} Total
                                </span>
                            </div>

                            {jobs.length > 0 ? (
                                <div className="space-y-6">
                                    {jobs.map((job) => (
                                        <JobItem key={job._id} job={job} onEdit={handleEdit} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] py-20 px-4 text-center">
                                    <div className="mx-auto w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No active postings yet</h3>
                                    <p className="mt-2 text-slate-500 font-medium">Get started by creating your first job listing on the right.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Form Container */}
                    <div className="lg:col-span-4 lg:sticky lg:top-[180px]">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden"
                        >
                            <div className="p-8 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white relative h-32 flex flex-col justify-center">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-black leading-tight">
                                    {jobToEdit ? 'Refine Role' : 'Launch New Role'}
                                </h2>
                                <p className="text-indigo-100/80 text-sm font-medium mt-1">
                                    {jobToEdit ? 'Update existing requirements' : 'Start your talent search today'}
                                </p>
                            </div>
                            <div className="p-8">
                                <JobForm jobToEdit={jobToEdit} clearEdit={clearEdit} />
                            </div>
                        </motion.div>

                        <div className="mt-6 p-6 bg-slate-100/50 rounded-3xl border border-slate-200 text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-loose">
                                Need help with your listing?<br />
                                <a href="#" className="text-indigo-600 hover:text-indigo-700">Read our Hiring Guide</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
