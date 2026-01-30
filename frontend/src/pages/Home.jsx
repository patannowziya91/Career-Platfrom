import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const isEmployer = user && user.role === 'employer';
    return (
        <div className="relative overflow-hidden bg-white">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-40">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-8 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span>Over 10,000+ Active Jobs</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-8">
                            {isEmployer ? 'Acquire Top-Tier' : 'Empowering Your'} <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                                {isEmployer ? 'Global Talent' : 'Professional Journey'}
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed mb-12">
                            {isEmployer ?
                                'Access a pool of exceptional candidates ready to take your company to the next level. Post jobs and manage applications in minutes.' :
                                'The bridge between visionary companies and exceptional talent. Build your career with precision or hire with confidence.'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {isEmployer ? (
                                <Link
                                    to="/employer/dashboard"
                                    className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
                                >
                                    Manage Job Postings
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        to="/jobs"
                                        className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 font-bold rounded-2xl border-2 border-gray-100 hover:border-indigo-100 hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Explore Opportunities
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Social Proof / Stats */}
                        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-16">
                            {[
                                { label: 'Active Jobs', value: '12k+' },
                                { label: 'Top Companies', value: '500+' },
                                { label: 'Daily Applications', value: '45k' },
                                { label: 'Success Rate', value: '98%' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feature Highlight */}
                <div className="pb-32">
                    <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[80px]"></div>
                        <div className="relative z-10 lg:grid lg:grid-cols-2 lg:items-center gap-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    For Employers who seek <br />
                                    the absolute best talent.
                                </h2>
                                <p className="text-gray-400 text-lg mb-8">
                                    Our platform provides advanced tools for tracking, managing, and engaging
                                    with candidates. Simplify your hiring process with our intelligent dashboard.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {['Deep Talent Analytics', 'Seamless Candidate Management', 'Professional Branding'].map(item => (
                                        <li key={item} className="flex items-center text-indigo-100">
                                            <svg className="w-5 h-5 mr-3 text-indigo-400 underline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/login" className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-indigo-50 transition">
                                    Post a Job Now
                                </Link>
                            </div>
                            <div className="mt-12 lg:mt-0">
                                <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-indigo-400 font-mono text-sm">Design Preview Area</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
