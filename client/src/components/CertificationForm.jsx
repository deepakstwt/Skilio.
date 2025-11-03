import { Award, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const CertificationForm = ({ data = [], onChange }) => {

const addCertification = () =>{
    const newCertification = {
        name: "",
        issuing_organization: "",
        issue_date: "",
        expiry_date: "",
        credential_id: "",
        credential_url: ""
    };
    onChange([...(data || []), newCertification])
}

const removeCertification = (index)=>{
    const updated = (data || []).filter((_, i)=> i !== index);
    onChange(updated)
}

const updateCertification = (index, field, value)=>{
    const updated = [...(data || [])];
    updated[index] = {...updated[index], [field]: value}
    onChange(updated)
}

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Certifications & Achievements</h3>
            <p className='text-sm text-gray-500'>Add your certifications and achievements</p>
        </div>
        <button onClick={addCertification} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
            <Plus className="size-4"/>
            Add Certification
        </button>
      </div>

      {!data || data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
            <Award className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
            <p>No certifications added yet.</p>
            <p className="text-sm">Click "Add Certification" to get started.</p>
        </div>
      ): (
        <div className='space-y-4'>
            {(data || []).map((certification, index)=>(
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className='flex justify-between items-start'>
                        <h4>Certification #{index + 1}</h4>
                        <button onClick={()=> removeCertification(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                            <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-3'>
                        <input 
                            value={certification.name || ""} 
                            onChange={(e)=>updateCertification(index, "name", e.target.value)} 
                            type="text" 
                            placeholder="Certification Name *" 
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input 
                            value={certification.issuing_organization || ""} 
                            onChange={(e)=>updateCertification(index, "issuing_organization", e.target.value)} 
                            type="text" 
                            placeholder="Issuing Organization" 
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input 
                            value={certification.issue_date || ""} 
                            onChange={(e)=>updateCertification(index, "issue_date", e.target.value)} 
                            type="month" 
                            placeholder="Issue Date" 
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input 
                            value={certification.expiry_date || ""} 
                            onChange={(e)=>updateCertification(index, "expiry_date", e.target.value)} 
                            type="month" 
                            placeholder="Expiry Date (optional)" 
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input 
                            value={certification.credential_id || ""} 
                            onChange={(e)=>updateCertification(index, "credential_id", e.target.value)} 
                            type="text" 
                            placeholder="Credential ID (optional)" 
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input 
                            value={certification.credential_url || ""} 
                            onChange={(e)=>updateCertification(index, "credential_url", e.target.value)} 
                            type="url" 
                            placeholder="Credential URL (optional)" 
                            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default CertificationForm

