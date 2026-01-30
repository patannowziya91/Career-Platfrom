import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getJobs, reset } from '../features/jobs/jobSlice';
import JobItem from '../components/JobItem';

const JobFeed = () => {
    const dispatch = useDispatch();

    // Filter State
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        jobType: '',
        category: ''
    });

    const { user } = useSelector((state) => state.auth);
    const { jobs, isLoading, isError, message } = useSelector(
        (state) => state.jobs
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role === 'employer') {
            navigate('/employer/dashboard');
            return;
        }

        if (isError) {
            console.log(message);
        }

        // Initial load
        dispatch(getJobs());

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getJobs(filters));
    };

    const handleReset = () => {
        setFilters({
            keyword: '',
            location: '',
            jobType: '',
            category: ''
        });
        dispatch(getJobs());
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <div className="bg-white border-b relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-indigo-50/50 skew-x-12 -mr-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Discover Your <span className="text-indigo-600">Perfect Career</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            Browse through thousands of high-quality job opportunities from top-tier companies around the world.
                        </p>

                        {/* Search Bar Container */}
                        <div className="bg-white p-2 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto">
                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="keyword"
                                        placeholder="Job title or keywords..."
                                        value={filters.keyword}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-gray-900"
                                    />
                                </div>
                                <div className="h-10 w-px bg-gray-100 hidden md:block self-center"></div>
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="City or Remote"
                                        value={filters.location}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-gray-900"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                                >
                                    Search Jobs
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                {/* Advanced Filters Toolbar */}
                <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                    <div className="flex items-center space-x-4">
                        <select
                            name="jobType"
                            value={filters.jobType}
                            onChange={(e) => {
                                handleChange(e);
                                dispatch(getJobs({ ...filters, jobType: e.target.value }));
                            }}
                            className="bg-white border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 focus:ring-indigo-500 shadow-sm"
                        >
                            <option value="">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <button
                            onClick={handleReset}
                            className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition"
                        >
                            Clear All Filters
                        </button>
                    </div>
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-bold text-gray-900">{jobs.length}</span> positions
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white p-8 rounded-3xl animate-pulse h-64 border border-gray-100"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        {jobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {jobs.map((job) => (
                                    <JobItem key={job._id} job={job} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                                <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No jobs matched your search</h3>
                                <p className="text-gray-500">Try adjusting your keywords or location filters.</p>
                                <button
                                    onClick={handleReset}
                                    className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default JobFeed;
