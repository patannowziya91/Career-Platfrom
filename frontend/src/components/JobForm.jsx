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
        <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{jobToEdit ? 'Edit Job' : 'Post a New Job'}</h2>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={onChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input
                                type="text"
                                name="salaryRange"
                                value={salaryRange}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g. $50k - $70k"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={category}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                name="jobType"
                                value={jobType}
                                onChange={onChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group mt-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="form-group mt-4">
                    <label className="block text-sm font-medium text-gray-700">Requirements</label>
                    <textarea
                        name="requirements"
                        value={requirements}
                        onChange={onChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="List requirements..."
                        required
                    ></textarea>
                </div>

                <div className="mt-4 flex space-x-3">
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                        {jobToEdit ? 'Update Job' : 'Publish Job'}
                    </button>
                    {jobToEdit && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default JobForm;
