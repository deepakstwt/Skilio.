import React from 'react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div id='cta' className='relative w-full py-24 px-4 overflow-hidden'>
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600"></div>
        <div 
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
        ></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                <span className="text-white text-sm font-semibold">🚀 Ready to get started?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Build Your Professional Resume Today
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands of professionals who landed their dream jobs with Skilio. Start creating your perfect resume in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                    to='/app?state=register' 
                    className="group bg-white text-blue-700 hover:bg-blue-50 rounded-full px-10 py-4 flex items-center gap-2 transition-all shadow-2xl hover:shadow-blue-900/20 hover:scale-105 font-bold text-lg"
                >
                    <span>Get Started Free</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                </Link>
                <Link 
                    to='/app?state=login' 
                    className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 rounded-full px-10 py-4 flex items-center gap-2 transition-all font-semibold text-lg"
                >
                    <span>Sign In</span>
                </Link>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                    <svg className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"/>
                    </svg>
                    <span className="text-sm font-medium">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"/>
                    </svg>
                    <span className="text-sm font-medium">Free Forever Plan</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"/>
                    </svg>
                    <span className="text-sm font-medium">AI-Powered Features</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CallToAction
