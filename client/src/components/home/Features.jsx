import { Zap, Sparkles, Wand2, FileText, Download, Palette } from 'lucide-react';
import React from 'react'
import Title from './Title';

const Features = () => {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Suggestions',
            description: 'Get intelligent recommendations to enhance your resume content and make it ATS-friendly.',
            color: 'violet',
            gradient: 'from-violet-500 to-purple-600'
        },
        {
            icon: FileText,
            title: 'Multiple Templates',
            description: 'Choose from professional, modern, and creative templates designed by experts.',
            color: 'green',
            gradient: 'from-green-500 to-emerald-600'
        },
        {
            icon: Palette,
            title: 'Customizable Design',
            description: 'Personalize colors, fonts, and layouts to match your professional brand.',
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-600'
        },
        {
            icon: Download,
            title: 'Export & Download',
            description: 'Download your resume in PDF format, ready to share with employers instantly.',
            color: 'orange',
            gradient: 'from-orange-500 to-amber-600'
        },
        {
            icon: Wand2,
            title: 'Smart Formatting',
            description: 'Automatic formatting ensures your resume looks professional and polished.',
            color: 'pink',
            gradient: 'from-pink-500 to-rose-600'
        },
        {
            icon: Zap,
            title: 'Quick & Easy',
            description: 'Create a professional resume in minutes with our streamlined interface.',
            color: 'yellow',
            gradient: 'from-yellow-500 to-amber-500'
        },
    ];

  return (
    <div id='features' className='flex flex-col items-center py-20 px-4 scroll-mt-12 bg-gradient-to-b from-white via-slate-50/50 to-white'>
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-100/50 rounded-full px-6 py-2 border border-blue-200 shadow-sm">
            <Zap className="size-4 fill-blue-600 text-blue-600"/>
            <span className="font-semibold">Powerful Features</span>
        </div>
        <Title 
            title='Build Your Perfect Resume' 
            description='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features that make you stand out.'
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mt-16 px-4">
            {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                    <div 
                        key={index}
                        className="group relative p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2"
                    >
                        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="size-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {feature.description}
                        </p>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                );
            })}
        </div>

        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
            * {
                font-family: 'Poppins', sans-serif;
            }
        `}</style>
    </div>
  )
}

export default Features
