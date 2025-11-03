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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        
        {/* Header Section */}
        <div className='mb-10'>
          <div className='mb-8'>
            <h1 className='text-4xl sm:text-5xl font-bold text-slate-900 mb-3'>
              Welcome back, <span className='text-purple-600'>{user?.name || 'User'}</span>
            </h1>
            <p className='text-slate-500 text-lg'>Manage and create your professional resumes</p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
              {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              
              // Get gradient background based on stat color
              const getStatGradient = () => {
                if (stat.color === 'from-blue-500 to-cyan-500') return 'from-blue-50/80 to-cyan-50/80';
                if (stat.color === 'from-purple-500 to-pink-500') return 'from-purple-50/80 to-pink-50/80';
                if (stat.color === 'from-indigo-500 to-purple-500') return 'from-indigo-50/80 to-purple-50/80';
                return 'from-slate-50 to-white';
              };
              
              return (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${getStatGradient()} rounded-3xl p-8 border-2 border-slate-200/50 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 cursor-default group backdrop-blur-sm`}
                >
                  <div className='flex items-center justify-between mb-5'>
                    <div 
                      className='p-4 rounded-2xl transition-all group-hover:scale-110 group-hover:rotate-6'
                      style={{ 
                        background: stat.color === 'from-blue-500 to-cyan-500' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.18), rgba(6, 182, 212, 0.18))' :
                                  stat.color === 'from-purple-500 to-pink-500' ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.18), rgba(236, 72, 153, 0.18))' :
                                  'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(168, 85, 247, 0.18))'
                      }}
                    >
                      <IconComponent 
                        className='size-7'
                        style={{ 
                          color: stat.color === 'from-blue-500 to-cyan-500' ? '#3b82f6' :
                                 stat.color === 'from-purple-500 to-pink-500' ? '#a855f7' :
                                 '#6366f1'
                        }} 
                      />
                    </div>
                  </div>
                  <p className='text-4xl font-extrabold text-slate-900 mb-3 group-hover:scale-105 transition-transform duration-300'>{stat.value}</p>
                  <p className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-4 mb-10'>
          <button 
            onClick={()=> setShowCreateResume(true)} 
            className='group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold'
          >
            <div className='p-2 bg-white/25 rounded-lg group-hover:bg-white/35 transition-colors'>
              <PlusIcon className='size-5'/>
            </div>
            <span>Create New Resume</span>
          </button>
          <button 
            onClick={()=> setShowUploadResume(true)} 
            className='group flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 text-slate-700 hover:text-purple-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-semibold'
          >
            <div className='p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors'>
              <UploadCloudIcon className='size-5 text-purple-600'/>
            </div>
            <span>Upload Existing Resume</span>
          </button>
        </div>

        {/* Resumes Grid */}
        {allResumes.length > 0 ? (
          <>
            <div className='flex items-center gap-4 mb-6'>
              <h2 className='text-2xl font-bold text-slate-900'>Your Resumes</h2>
              <div className='flex-1 h-px bg-slate-200'></div>
              <span className='text-sm font-medium text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full'>{allResumes.length} {allResumes.length === 1 ? 'resume' : 'resumes'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {allResumes.map((resume, index)=>{
                const baseColor = colors[index % colors.length];
                const isBlue = baseColor === '#3b82f6' || baseColor === '#6366f1';
                const isPurple = baseColor === '#8b5cf6' || baseColor === '#a855f7';
                const textColor = isBlue ? '#2563eb' : isPurple ? '#9333ea' : '#6366f1';
                
                // Get gradient class based on color
                const getGradientClass = () => {
                  if (baseColor === '#3b82f6') return 'from-blue-50 to-white';
                  if (baseColor === '#6366f1') return 'from-indigo-50 to-white';
                  if (baseColor === '#8b5cf6') return 'from-purple-50 to-white';
                  if (baseColor === '#a855f7') return 'from-violet-50 to-white';
                  return 'from-slate-50 to-white';
                };
                
                // Get hover border color matching the card's primary color
                const getHoverBorder = () => {
                  if (baseColor === '#3b82f6') return 'hover:border-blue-400';
                  if (baseColor === '#6366f1') return 'hover:border-indigo-400';
                  if (baseColor === '#8b5cf6') return 'hover:border-purple-400';
                  if (baseColor === '#a855f7') return 'hover:border-violet-400';
                  return 'hover:border-slate-400';
                };
                
                return (
                  <div 
                    key={index} 
                    onClick={()=> navigate(`/app/builder/${resume._id}`)} 
                    className={`group relative bg-gradient-to-br ${getGradientClass()} rounded-2xl p-6 border-2 border-slate-200/50 ${getHoverBorder()} hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden`}
                  >
                    <div className='flex flex-col h-full'>
                      {/* Icon and Actions */}
                      <div className='flex items-start justify-between mb-5'>
                        <div 
                          className='p-3.5 rounded-xl transition-transform group-hover:scale-110 group-hover:rotate-3'
                          style={{
                            background: isBlue ? 'rgba(59, 130, 246, 0.12)' : 
                                       isPurple ? 'rgba(168, 85, 247, 0.12)' : 
                                       'rgba(99, 102, 241, 0.12)'
                          }}
                        >
                          <FilePenLineIcon className="size-5.5" style={{ color: textColor }}/>
                        </div>
                        <div 
                          onClick={e=> e.stopPropagation()} 
                          className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                        >
                          <button 
                            onClick={(e) => {e.stopPropagation(); setEditResumeId(resume._id); setTitle(resume.title)}} 
                            className='p-1.5 hover:bg-blue-50 rounded-md transition-colors'
                            title='Edit title'
                          >
                            <PencilIcon className="size-3.5 text-slate-400 hover:text-blue-600"/>
                          </button>
                          <button 
                            onClick={(e) => {e.stopPropagation(); deleteResume(resume._id)}} 
                            className='p-1.5 hover:bg-red-50 rounded-md transition-colors'
                            title='Delete resume'
                          >
                            <TrashIcon className="size-3.5 text-slate-400 hover:text-red-600"/>
                          </button>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className='text-lg font-bold mb-auto line-clamp-2 group-hover:translate-x-1 transition-transform duration-300' style={{ color: textColor }}>
                        {resume.title}
                      </h3>
                      
                      {/* Date */}
                      <div className='flex items-center gap-1.5 text-xs text-slate-500 mt-5 font-medium'>
                        <Clock className='size-3.5' style={{ color: textColor }}/>
                        <span>Updated {new Date(resume.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <div className='text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200'>
            <div className='inline-flex p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6'>
              <FileText className='size-14 text-blue-600'/>
            </div>
            <h3 className='text-2xl font-bold text-slate-900 mb-3'>No resumes yet</h3>
            <p className='text-slate-600 mb-8 max-w-md mx-auto text-lg'>Get started by creating your first professional resume or uploading an existing one.</p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button 
                onClick={()=> setShowCreateResume(true)} 
                className='px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95'
              >
                Create Resume
              </button>
              <button 
                onClick={()=> setShowUploadResume(true)} 
                className='px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all font-semibold hover:scale-105 active:scale-95'
              >
                Upload Resume
              </button>
            </div>
          </div>
        )}

        {/* Coming Soon Features */}
        <div className='mt-16 mb-8'>
          <div className='flex items-center gap-4 mb-8'>
            <h2 className='text-2xl font-bold text-slate-900'>Coming Soon</h2>
            <div className='flex-1 h-px bg-slate-200'></div>
            <span className='text-sm font-medium text-slate-500 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full'>New Features</span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Job Recommendations Card */}
            <div className='group relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 border-2 border-blue-200/50 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 overflow-hidden'>
              {/* Decorative Background */}
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-blue-200/20 rounded-full blur-2xl'></div>
              
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
            <div className='group relative bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-8 border-2 border-purple-200/50 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 overflow-hidden'>
              {/* Decorative Background */}
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-full blur-2xl'></div>
              
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
          <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-100'>
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
          <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-100'>
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
          <form onSubmit={editTitle} onClick={()=> setEditResumeId('')} className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
            <div onClick={e => e.stopPropagation()} className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-100'>
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
