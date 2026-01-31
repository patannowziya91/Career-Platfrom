import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createJob, updateJob } from '../features/jobs/jobSlice';

const JobForm = ({ jobToEdit, clearEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salaryRange: '',
        location: '',
        jobType: 'Full-time',
        category: '',
    });

    const { title, description, requirements, salaryRange, location, jobType, category } = formData;

    const dispatch = useDispatch();

    useEffect(() => {
        if (jobToEdit) {
            setFormData({
                title: jobToEdit.title,
                description: jobToEdit.description,
                requirements: jobToEdit.requirements,
                salaryRange: jobToEdit.salaryRange,
                location: jobToEdit.location,
                jobType: jobToEdit.jobType,
                category: jobToEdit.category,
            });
        }
    }, [jobToEdit]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (jobToEdit) {
            dispatch(updateJob({ id: jobToEdit._id, jobData: formData }));
            clearEdit();
        } else {
            dispatch(createJob(formData));
        }
        setFormData({
            title: '',
            description: '',
            requirements: '',
            salaryRange: '',
            location: '',
            jobType: 'Full-time',
            category: '',
        });
    };

    const onCancel = () => {
        clearEdit();
        setFormData({
            title: '',
            description: '',
            requirements: '',
            salaryRange: '',
            location: '',
            jobType: 'Full-time',
            category: '',
        });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-4">
                <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChange}
                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        placeholder="e.g. Senior Software Engineer"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={onChange}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                            placeholder="City, Country"
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Salary</label>
                        <input
                            type="text"
                            name="salaryRange"
                            value={salaryRange}
                            onChange={onChange}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                            placeholder="e.g. $80k - $120k"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={category}
                            onChange={onChange}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                            placeholder="IT, Design, etc."
                            required
                        />
                    </div>
                    <div className="group">
                        <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Job Type</label>
                        <select
                            name="jobType"
                            value={jobType}
                            onChange={onChange}
                            className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Remote">Remote</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>

                <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
                        rows="3"
                        placeholder="Tell us about the role..."
                        required
                    ></textarea>
                </div>

                <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-1 ml-1">Requirements</label>
                    <textarea
                        name="requirements"
                        value={requirements}
                        onChange={onChange}
                        className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
                        rows="3"
                        placeholder="List the key requirements..."
                        required
                    ></textarea>
                </div>
            </div>

            <div className="flex flex-col space-y-3 pt-2">
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-200"
                >
                    {jobToEdit ? 'Update Job Posting' : 'Publish Job Opportunity'}
                </button>
                {jobToEdit && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-slate-100 text-slate-600 py-3 px-6 rounded-2xl font-bold hover:bg-slate-200 transition-all duration-200"
                    >
                        Cancel Editing
                    </button>
                )}
            </div>
        </form>
    );
};

export default JobForm;
