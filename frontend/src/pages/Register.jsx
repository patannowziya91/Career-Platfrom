import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowRight, Loader2, Eye, EyeOff, Briefcase, GraduationCap } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'seeker', // Default role
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { name, email, password, confirmPassword, role } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess || user) {
            if (user?.role === 'employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/seeker/dashboard');
            }
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const setRole = (newRole) => {
        setFormData((prevState) => ({
            ...prevState,
            role: newRole,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const userData = { name, email, password, role };
        dispatch(register(userData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 gradient-bg relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full"
            >
                <div className="glass p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />

                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                            className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200"
                        >
                            <UserPlus className="text-white w-8 h-8" />
                        </motion.div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                            Create Account
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Join our community and find your dream career
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4 md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                    I am registering as:
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole('seeker')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${role === 'seeker'
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md shadow-indigo-100'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                            }`}
                                    >
                                        <GraduationCap className={`w-8 h-8 mb-2 ${role === 'seeker' ? 'text-indigo-600' : 'text-slate-400'}`} />
                                        <span className="font-bold">Job Seeker</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('employer')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${role === 'employer'
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md shadow-indigo-100'
                                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                                            }`}
                                    >
                                        <Briefcase className={`w-8 h-8 mb-2 ${role === 'employer' ? 'text-indigo-600' : 'text-slate-400'}`} />
                                        <span className="font-bold">Employer</span>
                                    </button>
                                </div>
                            </div>

                            <div className="relative group md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1" htmlFor="name">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div className="relative group md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div className="relative group md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={onChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="relative group md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={onChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-500 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start ml-1">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    required
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-slate-600">
                                    By registering, you agree to our{' '}
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Terms of Service</a> and{' '}
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                                </label>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-base font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-xl shadow-indigo-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-slate-100">
                        <p className="text-sm text-slate-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                        &copy; 2026 Career Platform. All rights reserved.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
