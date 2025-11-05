import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, TrendingUp, Clock, FileText, Briefcase, Sparkles, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)

  const colors = ["#3b82f6", "#8b5cf6", "#6366f1", "#a855f7", "#6366f1", "#3b82f6"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () =>{
    try {
      const { data } = await api.get('/api/users/resumes', {headers: { Authorization: token }})
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
   try {
    event.preventDefault()
    const { data } = await api.post('/api/resumes/create', {title}, {headers: { Authorization: token }})
    setAllResumes([...allResumes, data.resume])
    setTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${data.resume._id}`)
   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
   }
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', {title, resumeText}, {headers: { Authorization: token }})
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault()
      const {data} = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData: { title }}, {headers: { Authorization: token }})
      setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title } : resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
     
  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
     if(confirm){
      const {data} = await api.delete(`/api/resumes/delete/${resumeId}`, {headers: { Authorization: token }})
      setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
      toast.success(data.message)
     }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
     
  }

  useEffect(()=>{
    loadAllResumes()
  },[])

  const stats = [
    { icon: FileText, label: 'Total Resumes', value: allResumes.length, color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, label: 'Last Updated', value: allResumes.length > 0 ? new Date(Math.max(...allResumes.map(r => new Date(r.updatedAt)))).toLocaleDateString() : 'N/A', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'This Month', value: allResumes.filter(r => {
      const updated = new Date(r.updatedAt);
      const now = new Date();
      return updated.getMonth() === now.getMonth() && updated.getFullYear() === now.getFullYear();
    }).length, color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className='fixed inset-0 opacity-[0.02] pointer-events-none'
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        {/* Header Section */}
        <div className='mb-12'>
          <div className='mb-10'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-full mb-6 shadow-sm'>
              <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse'></div>
              <span className='text-xs font-semibold text-slate-600 uppercase tracking-wider'>Dashboard</span>
            </div>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-4 leading-tight'>
              Welcome back,{' '}
              <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient'>
                {user?.name || 'User'}
              </span>
            </h1>
            <p className='text-slate-600 text-xl font-medium'>Manage and create your professional resumes with ease</p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
              {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              
              // Get gradient background based on stat color
              const getStatGradient = () => {
                if (stat.color === 'from-blue-500 to-cyan-500') return 'from-blue-500/10 via-cyan-500/5 to-transparent';
                if (stat.color === 'from-purple-500 to-pink-500') return 'from-purple-500/10 via-pink-500/5 to-transparent';
                if (stat.color === 'from-indigo-500 to-purple-500') return 'from-indigo-500/10 via-purple-500/5 to-transparent';
                return 'from-slate-500/10 to-transparent';
              };

              const getIconGradient = () => {
                if (stat.color === 'from-blue-500 to-cyan-500') return 'from-blue-500 to-cyan-500';
                if (stat.color === 'from-purple-500 to-pink-500') return 'from-purple-500 to-pink-500';
                return 'from-indigo-500 to-purple-500';
              };
              
              return (
                <div 
                  key={index} 
                  className={`group relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 hover:border-slate-300/80 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 cursor-default overflow-hidden`}
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getStatGradient()} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getIconGradient()} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className='relative z-10'>
                    <div className='flex items-center justify-between mb-6'>
                      <div 
                        className={`p-4 rounded-2xl bg-gradient-to-br ${getIconGradient()} shadow-lg shadow-blue-500/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl`}
                      >
                        <IconComponent className='size-7 text-white' />
                      </div>
                      <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse'></div>
                    </div>
                    <p className='text-5xl font-black text-slate-900 mb-3 group-hover:scale-105 transition-transform duration-500 tracking-tight'>{stat.value}</p>
                    <p className='text-sm font-bold text-slate-500 uppercase tracking-widest'>{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-4 mb-12'>
          <button 
            onClick={()=> setShowCreateResume(true)} 
            className='group relative flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98] font-bold text-base overflow-hidden'
          >
            {/* Animated shine effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
            <div className='relative p-2.5 bg-white/20 rounded-xl group-hover:bg-white/30 group-hover:rotate-12 transition-all duration-500'>
              <PlusIcon className='size-5'/>
            </div>
            <span className='relative'>Create New Resume</span>
          </button>
          <button 
            onClick={()=> setShowUploadResume(true)} 
            className='group relative flex items-center gap-3 px-8 py-5 bg-white/80 backdrop-blur-xl border-2 border-slate-200/80 hover:border-purple-400/60 hover:bg-white text-slate-700 hover:text-purple-700 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 active:scale-[0.98] font-bold text-base'
          >
            <div className='p-2.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover:from-purple-200 group-hover:to-pink-200 group-hover:rotate-12 transition-all duration-500'>
              <UploadCloudIcon className='size-5 text-purple-600'/>
            </div>
            <span>Upload Existing Resume</span>
          </button>
        </div>

        {/* Resumes Grid */}
        {allResumes.length > 0 ? (
          <>
            <div className='flex items-center gap-4 mb-8'>
              <h2 className='text-3xl font-black text-slate-900'>Your Resumes</h2>
              <div className='flex-1 h-0.5 bg-gradient-to-r from-slate-200 via-blue-200 to-purple-200 rounded-full'></div>
              <span className='text-sm font-bold text-slate-600 bg-white/80 backdrop-blur-sm border border-slate-200/60 px-5 py-2 rounded-full shadow-sm'>{allResumes.length} {allResumes.length === 1 ? 'resume' : 'resumes'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allResumes.map((resume, index)=>{
                const baseColor = colors[index % colors.length];
                const isBlue = baseColor === '#3b82f6' || baseColor === '#6366f1';
                const isPurple = baseColor === '#8b5cf6' || baseColor === '#a855f7';
                const textColor = isBlue ? '#2563eb' : isPurple ? '#9333ea' : '#6366f1';
                
                // Get gradient classes
                const getGradientClasses = () => {
                  if (baseColor === '#3b82f6') return { bg: 'from-blue-500/10 to-blue-50/50', icon: 'from-blue-500 to-blue-600', border: 'border-blue-300/40' };
                  if (baseColor === '#6366f1') return { bg: 'from-indigo-500/10 to-indigo-50/50', icon: 'from-indigo-500 to-indigo-600', border: 'border-indigo-300/40' };
                  if (baseColor === '#8b5cf6') return { bg: 'from-purple-500/10 to-purple-50/50', icon: 'from-purple-500 to-purple-600', border: 'border-purple-300/40' };
                  if (baseColor === '#a855f7') return { bg: 'from-violet-500/10 to-violet-50/50', icon: 'from-violet-500 to-violet-600', border: 'border-violet-300/40' };
                  return { bg: 'from-slate-500/10 to-slate-50/50', icon: 'from-slate-500 to-slate-600', border: 'border-slate-300/40' };
                };
                
                const gradients = getGradientClasses();
                
                return (
                  <div 
                    key={index} 
                    onClick={()=> navigate(`/app/builder/${resume._id}`)} 
                    className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border ${gradients.border} hover:border-opacity-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.03] hover:-translate-y-2 active:scale-[0.98] transition-all duration-500 cursor-pointer overflow-hidden`}
                  >
                    {/* Animated gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Decorative corner element */}
                    <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${gradients.icon} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}></div>
                    
                    <div className='relative z-10 flex flex-col h-full'>
                      {/* Icon and Actions */}
                      <div className='flex items-start justify-between mb-6'>
                        <div 
                          className={`p-4 rounded-2xl bg-gradient-to-br ${gradients.icon} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl`}
                        >
                          <FilePenLineIcon className="size-6 text-white"/>
                        </div>
                        <div 
                          onClick={e=> e.stopPropagation()} 
                          className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'
                        >
                          <button 
                            onClick={(e) => {e.stopPropagation(); setEditResumeId(resume._id); setTitle(resume.title)}} 
                            className='p-2 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110'
                            title='Edit title'
                          >
                            <PencilIcon className="size-4 text-slate-400 hover:text-blue-600"/>
                          </button>
                          <button 
                            onClick={(e) => {e.stopPropagation(); deleteResume(resume._id)}} 
                            className='p-2 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110'
                            title='Delete resume'
                          >
                            <TrashIcon className="size-4 text-slate-400 hover:text-red-600"/>
                          </button>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className='text-xl font-black mb-auto line-clamp-2 group-hover:translate-x-1 transition-transform duration-500' style={{ color: textColor }}>
                        {resume.title}
                      </h3>
                      
                      {/* Date */}
                      <div className='flex items-center gap-2 text-xs text-slate-500 mt-6 font-bold'>
                        <Clock className='size-4' style={{ color: textColor }}/>
                        <span>Updated {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className='relative text-center py-24 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-dashed border-slate-300/60 overflow-hidden'>
            {/* Animated background elements */}
            <div className='absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
            
            <div className='relative z-10'>
              <div className='inline-flex p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl shadow-blue-500/30'>
                <FileText className='size-16 text-white'/>
              </div>
              <h3 className='text-4xl font-black text-slate-900 mb-4'>No resumes yet</h3>
              <p className='text-slate-600 mb-10 max-w-md mx-auto text-lg font-medium'>Get started by creating your first professional resume or uploading an existing one.</p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button 
                  onClick={()=> setShowCreateResume(true)} 
                  className='group px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all font-bold text-base shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 overflow-hidden relative'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
                  <span className='relative'>Create Resume</span>
                </button>
                <button 
                  onClick={()=> setShowUploadResume(true)} 
                  className='px-10 py-4 bg-white/80 backdrop-blur-xl border-2 border-slate-300 text-slate-700 rounded-2xl hover:border-purple-400 hover:bg-white transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                >
                  Upload Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Coming Soon Features */}
        <div className='mt-20 mb-8'>
          <div className='flex items-center gap-4 mb-10'>
            <h2 className='text-3xl font-black text-slate-900'>Coming Soon</h2>
            <div className='flex-1 h-0.5 bg-gradient-to-r from-slate-200 via-purple-200 to-pink-200 rounded-full'></div>
            <span className='text-sm font-bold text-slate-600 bg-white/80 backdrop-blur-sm border border-slate-200/60 px-5 py-2 rounded-full shadow-sm'>New Features</span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Job Recommendations Card */}
            <div className='group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/40 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 overflow-hidden'>
              {/* Decorative Background */}
              <div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000'></div>
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000'></div>
              
              <div className='relative z-10'>
                <div className='flex items-start justify-between mb-6'>
                  <div className='p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30'>
                    <Briefcase className='size-6 text-white'/>
                  </div>
                  <span className='px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full'>
                    Soon
                  </span>
                </div>
                
                <h3 className='text-xl font-bold text-slate-900 mb-2'>Job Recommendations</h3>
                <p className='text-slate-600 mb-6 leading-relaxed'>
                  Get personalized job recommendations based on your skills, experience, and career goals. We'll match you with opportunities that align perfectly with your profile.
                </p>
                
                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 text-xs font-medium bg-blue-100/80 text-blue-700 rounded-full'>AI-Powered Matching</span>
                  <span className='px-3 py-1 text-xs font-medium bg-purple-100/80 text-purple-700 rounded-full'>Real-time Updates</span>
                  <span className='px-3 py-1 text-xs font-medium bg-indigo-100/80 text-indigo-700 rounded-full'>Industry Insights</span>
                </div>
                
                <div className='flex items-center gap-2 text-sm text-slate-500'>
                  <Clock className='size-4'/>
                  <span>Available in the next update</span>
                </div>
              </div>
            </div>

            {/* ATS Keywords Suggestions Card */}
            <div className='group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-purple-200/40 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 overflow-hidden'>
              {/* Decorative Background */}
              <div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000'></div>
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000'></div>
              
              <div className='relative z-10'>
                <div className='flex items-start justify-between mb-6'>
                  <div className='p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/30'>
                    <Zap className='size-6 text-white'/>
                  </div>
                  <span className='px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full'>
                    Soon
                  </span>
                </div>
                
                <h3 className='text-xl font-bold text-slate-900 mb-2'>ATS-Friendly Keyword Suggestions</h3>
                <p className='text-slate-600 mb-6 leading-relaxed'>
                  Optimize your resume with industry-relevant keywords that help you pass Applicant Tracking Systems. Get suggestions tailored to your target job and industry.
                </p>
                
                <div className='flex flex-wrap gap-2 mb-6'>
                  <span className='px-3 py-1 text-xs font-medium bg-purple-100/80 text-purple-700 rounded-full'>Keyword Analysis</span>
                  <span className='px-3 py-1 text-xs font-medium bg-pink-100/80 text-pink-700 rounded-full'>ATS Optimization</span>
                  <span className='px-3 py-1 text-xs font-medium bg-indigo-100/80 text-indigo-700 rounded-full'>Industry-Specific</span>
                </div>
                
                <div className='flex items-center gap-2 text-sm text-slate-500'>
                  <Clock className='size-4'/>
                  <span>Available in the next update</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-slate-200/60 animate-scale-in'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900 mb-1.5'>Create New Resume</h2>
                  <p className='text-sm text-slate-500'>Start building your professional resume</p>
                </div>
                <button 
                  onClick={()=> {setShowCreateResume(false); setTitle('')}} 
                  className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
                >
                  <XIcon className='size-5 text-slate-400 hover:text-slate-600'/>
                </button>
              </div>
              
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-slate-700 mb-3'>Resume Title</label>
                <input 
                  onChange={(e)=>setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder='e.g., Software Engineer Resume' 
                  className='w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400' 
                  required
                />
              </div>

              <button className='w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]'>
                Create Resume
              </button>
            </div>
          </form>
        )
        }

        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-slate-200/60 animate-scale-in'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900 mb-1.5'>Upload Resume</h2>
                  <p className='text-sm text-slate-500'>Upload your existing PDF resume</p>
                </div>
                <button 
                  onClick={()=> {setShowUploadResume(false); setTitle(''); setResume(null)}} 
                  className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
                >
                  <XIcon className='size-5 text-slate-400 hover:text-slate-600'/>
                </button>
              </div>
              
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-slate-700 mb-3'>Resume Title</label>
                <input 
                  onChange={(e)=>setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder='e.g., Software Engineer Resume' 
                  className='w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 mb-6' 
                  required
                />
                
                <label htmlFor="resume-input" className="block text-sm font-semibold text-slate-700 mb-3">
                  Select PDF File
                </label>
                <div className='relative'>
                  <label 
                    htmlFor="resume-input" 
                    className='flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200 rounded-xl p-10 hover:border-purple-400 hover:bg-purple-50/30 cursor-pointer transition-all group'
                  >
                    {resume ? (
                      <div className='text-center'>
                        <div className='inline-flex p-4 bg-green-100 rounded-full mb-3'>
                          <FileText className='size-7 text-green-600'/>
                        </div>
                        <p className='text-sm font-semibold text-green-700 mb-1'>{resume.name}</p>
                        <p className='text-xs text-slate-500'>Click to change file</p>
                      </div>
                    ) : (
                      <>
                        <div className='p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors'>
                          <UploadCloud className='size-8 text-purple-600'/>
                        </div>
                        <div className='text-center'>
                          <p className='text-sm font-semibold text-slate-700 mb-1'>Drop your PDF here or click to browse</p>
                          <p className='text-xs text-slate-500'>Supports PDF files only</p>
                        </div>
                      </>
                    )}
                  </label>
                  <input 
                    type="file" 
                    id='resume-input' 
                    accept='.pdf' 
                    hidden 
                    onChange={(e)=> setResume(e.target.files[0])}
                  />
                </div>
              </div>
              
              <button 
                disabled={isLoading} 
                className='w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]'
              >
                {isLoading && <LoaderCircleIcon className='animate-spin size-5'/>}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
              </button>
            </div>
          </form>
        )
        }

        {editResumeId && (
          <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-slate-200/60 animate-scale-in'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900 mb-1.5'>Edit Resume Title</h2>
                  <p className='text-sm text-slate-500'>Update your resume name</p>
                </div>
                <button 
                  onClick={()=> {setEditResumeId(''); setTitle('')}} 
                  className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
                >
                  <XIcon className='size-5 text-slate-400 hover:text-slate-600'/>
                </button>
              </div>
              
              <div className='mb-6'>
                <label className='block text-sm font-semibold text-slate-700 mb-3'>Resume Title</label>
                <input 
                  onChange={(e)=>setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder='Enter resume title' 
                  className='w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400' 
                  required
                />
              </div>

              <button className='w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]'>
                Update Title
              </button>
            </div>
          </form>
        )
        }
      
      </div>
    </div>
  )
}

export default Dashboard
