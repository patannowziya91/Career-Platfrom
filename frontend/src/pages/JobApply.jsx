import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { applyForJob } from '../features/applications/applicationSlice';

const JobApply = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        seekerName: user ? user.name : '',
        expertise: '',
        education: '',
        resumeURL: ''
    });

    const { seekerName, expertise, education, resumeURL } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const applicationData = {
            jobID: jobId,
            ...formData
        };

        dispatch(applyForJob(applicationData))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    alert('Application submitted successfully!');
                    navigate('/seeker/dashboard');
                } else {
                    alert('Error: ' + res.payload);
                }
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white text-center">
                    <h1 className="text-3xl font-bold mb-2">Apply for Position</h1>
                    <p className="opacity-90">Please fill out the form below precisely</p>
                </div>

                <form onSubmit={onSubmit} className="p-8 md:p-12 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                        <input
                            type="text"
                            name="seekerName"
                            value={seekerName}
                            onChange={onChange}
                            required
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
                            placeholder="Your name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Area of Expertise</label>
                        <input
                            type="text"
                            name="expertise"
                            value={expertise}
                            onChange={onChange}
                            required
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
                            placeholder="e.g. Frontend Development, UX Design"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Study Background / Education</label>
                        <textarea
                            name="education"
                            value={education}
                            onChange={onChange}
                            required
                            rows="3"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 resize-none"
                            placeholder="Your current studies or highest degree..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Resume / Portfolio Link</label>
                        <input
                            type="text"
                            name="resumeURL"
                            value={resumeURL}
                            onChange={onChange}
                            required
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900"
                            placeholder="Link to your resume or portfolio"
                        />
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full py-5 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2"
                        >
                            <span>Submit Application</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApply;
