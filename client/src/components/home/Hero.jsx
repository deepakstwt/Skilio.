import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Hero = () => {

    const {user} = useSelector(state => state.auth)

    const [menuOpen, setMenuOpen] = React.useState(false);

    const logos = [
        'https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/framer.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg',
        'https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg',
    ]

  return (
    <>
    <div className="min-h-screen pb-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 text-sm bg-white/80 backdrop-blur-md border-b border-blue-100/50 sticky top-0">
            <a href="/" className="flex items-center gap-1.5 group">
                <span className="font-bold text-slate-900 text-xl group-hover:text-blue-600 transition-colors">Skilio.</span>
                <span className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/50"></span>
            </a>

            <div className="hidden md:flex items-center gap-10 transition duration-500 text-slate-700 font-medium">
                <a href="#" className="hover:text-blue-600 transition-colors relative group">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#features" className="hover:text-blue-600 transition-colors relative group">
                    Features
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#testimonials" className="hover:text-blue-600 transition-colors relative group">
                    Testimonials
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#cta" className="hover:text-blue-600 transition-colors relative group">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
            </div>

            <div className="flex gap-3">
                <Link to='/app?state=register' className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all rounded-full text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-purple-500/50" hidden={user}>
                    Get started
                </Link>
                <Link to='/app?state=login' className="hidden md:block px-6 py-2.5 border-2 border-slate-300 active:scale-95 hover:border-blue-500 hover:text-blue-600 transition-all rounded-full text-slate-700 hover:bg-blue-50 font-medium" hidden={user}>
                    Login
                </Link>
                <Link to='/app' className='hidden md:block px-8 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all rounded-full text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-purple-500/50' hidden={!user}>
                    Dashboard
                </Link>
            </div>

            <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition text-slate-700" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" className="lucide lucide-menu" >
                    <path d="M4 5h16M4 12h16M4 19h16" />
                </svg>
            </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} >
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col gap-6 min-w-[280px]">
                <a href="#" className="text-slate-800 hover:text-blue-600 transition-colors font-medium" onClick={() => setMenuOpen(false)}>Home</a>
                <a href="#features" className="text-slate-800 hover:text-blue-600 transition-colors font-medium" onClick={() => setMenuOpen(false)}>Features</a>
                <a href="#testimonials" className="text-slate-800 hover:text-blue-600 transition-colors font-medium" onClick={() => setMenuOpen(false)}>Testimonials</a>
                <a href="#cta" className="text-slate-800 hover:text-blue-600 transition-colors font-medium" onClick={() => setMenuOpen(false)}>Contact</a>
                <button onClick={() => setMenuOpen(false)} className="mt-4 p-3 items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition text-white rounded-lg flex font-medium" >
                    Close
                </button>
            </div>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute top-20 xl:top-10 -z-10 left-1/4 size-96 sm:size-[500px] xl:size-[600px] bg-gradient-to-br from-blue-400/40 via-indigo-300/30 to-purple-200/20 blur-[120px] animate-pulse"></div>
            <div className="absolute top-40 right-1/4 -z-10 size-72 sm:size-96 xl:size-[500px] bg-gradient-to-br from-purple-300/30 via-pink-200/20 to-blue-200/20 blur-[100px] animate-pulse delay-1000"></div>

            {/* Badge + Avatars */}
            <div className="flex items-center justify-center mt-20 mb-8">
                <div className="flex items-center gap-4 px-5 py-3 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
                    {/* Overlapping User Avatars */}
                    <div className="flex -space-x-2">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user" className="size-8 object-cover rounded-full border-2 border-white shadow-sm" />
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user" className="size-8 object-cover rounded-full border-2 border-white shadow-sm" />
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user" className="size-8 object-cover rounded-full border-2 border-white shadow-sm" />
                        <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60" alt="user" className="size-8 object-cover rounded-full border-2 border-white shadow-sm" />
                    </div>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5">
                        {Array(5).fill(0).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 fill-yellow-400" aria-hidden="true">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                            </svg>
                        ))}
                    </div>
                    
                    {/* Text */}
                    <span className="text-sm font-semibold text-slate-800">
                        <span className="font-bold">10,000+</span> happy users
                    </span>
                </div>
            </div>

            {/* Headline + CTA */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-6xl text-center mt-6 md:leading-[1.1] animate-fade-in">
                <div>Land your <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">dream job</span></div>
                <div>with{' '}
                    <span>
                        <span className="text-blue-700">AI</span><span className="text-blue-700">-</span>
                        <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-600 bg-clip-text text-transparent">powered</span>
                    </span> resumes
                </div>
            </h1>

            <p className="max-w-xl text-center text-lg md:text-xl my-8 text-slate-600 leading-relaxed">Create, edit, and download professional resumes in minutes with intelligent AI-powered assistance that helps you stand out.</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
                <Link to='/app' className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-10 py-4 flex items-center gap-2 transition-all shadow-xl shadow-blue-500/30 hover:shadow-purple-500/50 hover:scale-105 font-semibold text-base">
                    Get started free
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
                    </svg>
                </Link>
                <button className="group flex items-center gap-2 border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all rounded-full px-8 py-4 text-slate-700 hover:text-blue-700 font-semibold text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play-circle" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                    </svg>
                    <span>Watch demo</span>
                </button>
            </div>

            <p className="py-8 text-slate-500 mt-16 text-sm font-medium tracking-wide uppercase">Trusted by leading brands</p>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-4xl w-full mx-auto py-6 opacity-60 grayscale hover:grayscale-0 transition-all" id="logo-container">
                {logos.map((logo, index) => (
                    <img key={index} src={logo} alt="company logo" className="h-8 w-auto max-w-xs hover:scale-110 transition-transform duration-300" />
                ))}
            </div>
        </div>
    </div>
    <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

            * {
                font-family: 'Poppins', sans-serif;
            }

            @keyframes fade-in {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .animate-fade-in {
                animation: fade-in 0.8s ease-out;
            }

            .delay-1000 {
                animation-delay: 1s;
            }
        `}
    </style>
    </>
  )
}

export default Hero
