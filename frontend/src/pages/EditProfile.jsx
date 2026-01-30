import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        skills: '',
        experience: '',
        education: '',
        resume: '',
    });

    const { name, email, skills, experience, education, resume } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                skills: user.skills ? user.skills.join(', ') : '',
                experience: user.experience || '',
                education: user.education || '',
                resume: user.resume || '',
            });
        }
    }, [user]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Convert comma-separated skills back to array
        const skillsArray = skills.split(',').map(skill => skill.trim());

        const userData = {
            name,
            email,
            skills: skillsArray,
            experience,
            education,
            resume
        };

        dispatch(updateProfile(userData))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    alert('Profile Updated!');
                    navigate('/seeker/dashboard');
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Your Profile</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email (Read Only)</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            disabled
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                        <input
                            type="text"
                            name="skills"
                            value={skills}
                            onChange={onChange}
                            placeholder="Java, Python, React, etc."
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <textarea
                            name="experience"
                            value={experience}
                            onChange={onChange}
                            rows="4"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Describe your work history..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Education</label>
                        <textarea
                            name="education"
                            value={education}
                            onChange={onChange}
                            rows="2"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="University, Degree, Year..."
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Resume Link (URL)</label>
                        <input
                            type="text"
                            name="resume"
                            value={resume}
                            onChange={onChange}
                            placeholder="https://drive.google.com/..."
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/seeker/dashboard')}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
