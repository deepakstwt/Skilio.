import React from 'react'

const Banner = () => {
  return ( 
    <div className="w-full py-3 font-medium text-sm text-center bg-gradient-to-r from-blue-500/10 via-indigo-50 to-purple-500/10 border-b border-blue-100">
        <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold shadow-md shadow-blue-500/30 animate-pulse">NEW</span>
            <p className="text-blue-700 font-semibold">✨ AI-Powered Resume Enhancement Feature Now Available!</p>
        </div>
    </div>
  )
}

export default Banner
