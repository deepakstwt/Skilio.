import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Award, Briefcase, ChevronLeft, ChevronRight, Copy, DownloadIcon, EyeIcon, EyeOffIcon, ExternalLink, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User, Check, X } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import CertificationForm from '../components/CertificationForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { generateLaTeX } from '../utils/latexGenerator'

const ResumeBuilder = () => {

  const { resumeId } = useParams()
  const {token} = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    certifications: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const loadExistingResume = async () => {
   try {
    const {data} = await api.get('/api/resumes/get/' + resumeId, {headers: { Authorization: token }})
    if(data.resume){
      // Ensure certifications field exists
      const resume = {
        ...data.resume,
        certifications: data.resume.certifications || []
      }
      setResumeData(resume)
      document.title = data.resume.title;
    }
   } catch (error) {
    console.log(error.message)
   }
  }

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);
  const [showOverleafModal, setShowOverleafModal] = useState(false);
  const [latexCode, setLatexCode] = useState('');
  const [copied, setCopied] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "certifications", name: "Certifications", icon: Award },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(()=>{
    loadExistingResume()
  },[])

  const changeResumeVisibility = async () => {
    try {
       const formData = new FormData()
       formData.append("resumeId", resumeId)
       formData.append("resumeData", JSON.stringify({public: !resumeData.public}))

       const {data} = await api.put('/api/resumes/update', formData, {headers: { Authorization: token }})

       setResumeData({...resumeData, public: !resumeData.public})
       toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume:", error)
    }
  }

  const handleShare = () =>{
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share){
      navigator.share({url: resumeUrl, text: "My Resume", })
    }else{
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = ()=>{
    window.print();
  }

  const exportToOverleaf = () => {
    try {
      // Generate LaTeX code from resume data
      const generatedCode = generateLaTeX(resumeData);
      setLatexCode(generatedCode);
      setShowOverleafModal(true);
      
      // Open Overleaf in new tab
      window.open('https://www.overleaf.com/project', '_blank');
      
    } catch (error) {
      console.error('Error generating LaTeX:', error);
      toast.error('Failed to generate LaTeX file. Please try again.');
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    toast.success('LaTeX code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  }

  const downloadTexFile = () => {
    const blob = new Blob([latexCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(resumeData.title || 'resume').replace(/[^a-z0-9]/gi, '_')}.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('LaTeX file downloaded!');
  }

const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData)

    // remove image from updatedResumeData
    if(typeof resumeData.personal_info.image === 'object'){
      delete updatedResumeData.personal_info.image
    }

    const formData = new FormData();
    formData.append("resumeId", resumeId)
    formData.append('resumeData', JSON.stringify(updatedResumeData))
    removeBackground && formData.append("removeBackground", "yes");
    typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

    const { data } = await api.put('/api/resumes/update', formData, {headers: { Authorization: token }})

    setResumeData(data.resume)
    toast.success(data.message)
  } catch (error) {
    console.error("Error saving resume:", error)
  }
}

  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className="size-4"/> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200"/>
              <hr className="absolute top-0 left-0  h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000" style={{width: `${activeSectionIndex * 100 / (sections.length - 1)}%`}}/>

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">

                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev => ({...prev, template}))}/>
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev => ({...prev, accent_color: color}))}/>
                </div>

                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className="size-4"/> Previous
                    </button>
                  )}
                  <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}>
                      Next <ChevronRight className="size-4"/>
                    </button>
                </div>
              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data)=>setResumeData(prev => ({...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=> setResumeData(prev=> ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data)=> setResumeData(prev=> ({...prev, experience: data}))}/>
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data)=> setResumeData(prev=> ({...prev, education: data}))}/>
                  )}
                  {activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data)=> setResumeData(prev=> ({...prev, project: data}))}/>
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data)=> setResumeData(prev=> ({...prev, skills: data}))}/>
                  )}
                  {activeSection.id === 'certifications' && (
                    <CertificationForm data={resumeData.certifications || []} onChange={(data)=> setResumeData(prev=> ({...prev, certifications: data}))}/>
                  )}
                  
              </div>
              <button onClick={()=> {toast.promise(saveResume, {loading: 'Saving...'})}} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
              <div className='relative w-full'>
                <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                    {resumeData.public && (
                      <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                        <Share2Icon className='size-4'/> Share
                      </button>
                    )}
                    <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                      {resumeData.public ? <EyeIcon className="size-4"/> : <EyeOffIcon className="size-4"/>}
                      {resumeData.public ? 'Public' : 'Private'}
                    </button>
                    <button 
                      onClick={exportToOverleaf} 
                      className='flex items-center gap-2 px-4 py-2 text-xs bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 rounded-lg ring-orange-300 hover:ring transition-colors'
                      title='Export to Overleaf as LaTeX'
                    >
                      <ExternalLink className='size-4'/> Export to Overleaf
                    </button>
                    <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                      <DownloadIcon className='size-4'/> Download
                    </button>
                </div>
              </div>

              <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
          </div>
        </div>
      </div>

      {/* Overleaf Export Modal */}
      {showOverleafModal && (
        <div 
          onClick={() => setShowOverleafModal(false)} 
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
        >
          <div 
            onClick={e => e.stopPropagation()} 
            className='relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-100'
          >
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg'>
                  <ExternalLink className='size-5 text-white'/>
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900'>Export to Overleaf</h2>
                  <p className='text-sm text-slate-500'>Follow these steps to use your resume in Overleaf</p>
                </div>
              </div>
              <button 
                onClick={() => setShowOverleafModal(false)} 
                className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
              >
                <X className='size-5 text-slate-400 hover:text-slate-600'/>
              </button>
            </div>

            {/* Content */}
            <div className='px-8 py-6'>
              {/* Step 1 */}
              <div className='mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm'>
                    1
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900'>Create a New Project in Overleaf</h3>
                </div>
                <p className='text-slate-600 ml-11 mb-3'>
                  In the Overleaf tab that just opened, click <strong>"New Project"</strong> and select <strong>"Blank Project"</strong>.
                </p>
                <div className='ml-11 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-sm text-blue-800'>
                    💡 <strong>Tip:</strong> You can also search for "ModernCV" template to get a similar layout, but a blank project works perfectly!
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className='mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm'>
                    2
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900'>Copy Your LaTeX Code</h3>
                </div>
                <div className='ml-11 space-y-3'>
                  <div className='flex gap-3'>
                    <button
                      onClick={copyToClipboard}
                      className='flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md shadow-blue-500/30'
                    >
                      {copied ? (
                        <>
                          <Check className='size-4'/> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className='size-4'/> Copy LaTeX Code
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadTexFile}
                      className='flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all font-medium'
                    >
                      <DownloadIcon className='size-4'/> Download .tex File
                    </button>
                  </div>
                  <p className='text-sm text-slate-500'>
                    Choose either option above. Copying is faster, but downloading gives you a backup file.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className='mb-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm'>
                    3
                  </div>
                  <h3 className='text-lg font-semibold text-slate-900'>Paste into Overleaf</h3>
                </div>
                <div className='ml-11'>
                  <ol className='list-decimal list-inside space-y-2 text-slate-600'>
                    <li>In your Overleaf project, delete the default <code className='bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono'>\documentclass{article}</code> content</li>
                    <li>Paste your LaTeX code (or upload the .tex file if you downloaded it)</li>
                    <li>Click <strong>"Recompile"</strong> to see your resume!</li>
                  </ol>
                </div>
              </div>

              {/* Quick Actions */}
              <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200'>
                <div className='flex items-start gap-3'>
                  <div className='p-2 bg-blue-100 rounded-lg mt-0.5'>
                    <Sparkles className='size-5 text-blue-600'/>
                  </div>
                  <div>
                    <h4 className='font-semibold text-slate-900 mb-1'>Quick Tips</h4>
                    <ul className='text-sm text-slate-600 space-y-1'>
                      <li>• Your resume uses the ModernCV class - make sure it's available in your Overleaf project</li>
                      <li>• You can customize colors, fonts, and layout directly in Overleaf</li>
                      <li>• Save your project to access it anytime</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className='sticky bottom-0 bg-slate-50 border-t border-slate-200 px-8 py-4 flex items-center justify-end gap-3'>
              <button
                onClick={() => setShowOverleafModal(false)}
                className='px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-700 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all font-medium'
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.open('https://www.overleaf.com/project', '_blank');
                  copyToClipboard();
                }}
                className='px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md shadow-blue-500/30'
              >
                Open Overleaf & Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default ResumeBuilder
