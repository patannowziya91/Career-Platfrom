import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, User as UserIcon, LogIn, UserPlus, Briefcase } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 glass border-b border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-18 py-3">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <motion.div
                                whileHover={{ rotate: 10 }}
                                className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200"
                            >
                                <Briefcase className="text-white w-6 h-6" />
                            </motion.div>
                            <span className="text-2xl font-black tracking-tight text-slate-900">
                                Career<span className="text-indigo-600">Hub</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {user ? (
                            <>
                                {user.role === 'employer' ? (
                                    <>
                                        <Link
                                            to="/employer/dashboard"
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/employer/dashboard')
                                                    ? 'bg-indigo-50 text-indigo-600'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <LayoutDashboard size={18} />
                                            <span className="hidden md:block">Dashboard</span>
                                        </Link>
                                        <Link
                                            to="/employer/profile"
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/employer/profile')
                                                    ? 'bg-indigo-50 text-indigo-600'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            <UserIcon size={18} />
                                            <span className="hidden md:block">Profile</span>
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        to="/seeker/dashboard"
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isActive('/seeker/dashboard')
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <LayoutDashboard size={18} />
                                        <span className="hidden md:block">Dashboard</span>
                                    </Link>
                                )}
                                <button
                                    onClick={onLogout}
                                    className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                >
                                    <LogOut size={18} />
                                    <span className="hidden md:block">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200"
                                >
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                >
                                    <UserPlus size={18} />
                                    <span>Register</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
