import { useDispatch, useSelector } from 'react-redux';
import { deleteJob } from '../features/jobs/jobSlice';
import { applyForJob } from '../features/applications/applicationSlice';
import { useNavigate } from 'react-router-dom';

const JobItem = ({ job, onEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const jobEmployerId = job.employerID._id || job.employerID;
    const isEmployer = user && user.role === 'employer' && user._id === jobEmployerId;
    const isSeeker = user && user.role === 'seeker';

    const onViewProfile = () => {
        navigate(`/profile/${job.employerID._id || job.employerID}`);
    };

    const onApply = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate(`/apply/${job._id}`);
    };

    const onViewApplications = () => {
        navigate(`/employer/job/${job._id}/applications`);
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xl">
                        {(job.employerID?.name || 'C').charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h3>
                        <div className="flex items-center mt-1">
                            <button
                                onClick={onViewProfile}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                            >
                                {job.employerID?.name || 'Unknown Company'}
                            </button>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{job.location}</span>
                        </div>
                    </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${job.jobType === 'Remote' ? 'bg-purple-100 text-purple-700' :
                    job.jobType === 'Full-time' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                    }`}>
                    {job.jobType}
                </span>
            </div>

            <div className="mb-6">
                <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed mb-4">
                    {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold border border-gray-100 uppercase tracking-tighter">
                        {job.category}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-gray-50 text-indigo-600 rounded-lg text-xs font-bold border border-gray-100">
                        {job.salaryRange}
                    </span>
                </div>
            </div>

            <div className="pt-5 border-t border-gray-100">
                {isEmployer ? (
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={onViewApplications}
                            className="col-span-1 bg-indigo-50 text-indigo-700 py-3 px-4 rounded-xl hover:bg-indigo-100 transition font-bold text-sm"
                        >
                            Applicants
                        </button>
                        <button
                            onClick={() => onEdit(job)}
                            className="col-span-1 bg-amber-50 text-amber-700 py-3 px-4 rounded-xl hover:bg-amber-100 transition font-bold text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this post? This cannot be undone.')) {
                                    dispatch(deleteJob(job._id));
                                }
                            }}
                            className="col-span-1 bg-red-50 text-red-700 py-3 px-4 rounded-xl hover:bg-red-100 transition font-bold text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-3">
                        <button
                            onClick={onApply}
                            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100"
                        >
                            {isSeeker ? 'Apply Now' : 'Sign in to Apply'}
                        </button>
                        <button
                            onClick={onViewProfile}
                            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-bold text-sm"
                        >
                            View Company
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobItem;
