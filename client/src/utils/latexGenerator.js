/**
 * Generates LaTeX code from resume data for Overleaf export
 * Uses ModernCV class for professional resume formatting
 */

export const generateLaTeX = (resumeData) => {
  // Escape LaTeX special characters
  const escapeLaTeX = (text) => {
    if (!text) return '';
    return String(text)
      .replace(/\\/g, '\\textbackslash{}')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
      .replace(/\$/g, '\\$')
      .replace(/&/g, '\\&')
      .replace(/#/g, '\\#')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/_/g, '\\_')
      .replace(/%/g, '\\%')
      .replace(/~/g, '\\textasciitilde{}');
  };

  // Format date from YYYY-MM to "Month YYYY"
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [year, month] = dateStr.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  const personal = resumeData.personal_info || {};
  const accentColor = resumeData.accent_color || '#3B82F6';
  
  // Convert hex color to color name for ModernCV
  const getColorName = (hex) => {
    const colorMap = {
      '#3B82F6': 'blue',
      '#8b5cf6': 'purple',
      '#a855f7': 'purple',
      '#6366f1': 'blue',
      '#10b981': 'green',
      '#ef4444': 'red',
      '#f59e0b': 'orange',
    };
    return colorMap[hex] || 'blue';
  };

  let latex = `\\documentclass[11pt,a4paper,sans]{moderncv}

% ModernCV theme and color
\\moderncvstyle{classic}
\\moderncvcolor{${getColorName(accentColor)}}

% Character encoding
\\usepackage[utf8]{inputenc}
\\usepackage[scale=0.75]{geometry}

% Personal data
\\name{${escapeLaTeX(personal.full_name || 'Your Name')}}{}
${personal.profession ? `\\title{${escapeLaTeX(personal.profession)}}` : ''}
${personal.location ? `\\address{${escapeLaTeX(personal.location)}}{}{}` : ''}
${personal.phone ? `\\phone{${escapeLaTeX(personal.phone)}}` : ''}
${personal.email ? `\\email{${escapeLaTeX(personal.email)}}` : ''}
${personal.linkedin ? `\\social[linkedin]{${escapeLaTeX(personal.linkedin)}}` : ''}
${personal.website ? `\\social[github]{${escapeLaTeX(personal.website)}}` : ''}

\\begin{document}

\\makecvtitle

`;

  // Professional Summary
  if (resumeData.professional_summary) {
    latex += `% Professional Summary
\\section{Professional Summary}
\\cvitem{}{${escapeLaTeX(resumeData.professional_summary)}}

`;
  }

  // Experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    latex += `% Experience
\\section{Experience}
`;
    resumeData.experience.forEach((exp) => {
      const startDate = formatDate(exp.start_date || '');
      const endDate = exp.is_current ? 'Present' : formatDate(exp.end_date || '');
      const description = exp.description ? escapeLaTeX(exp.description).replace(/\n/g, '\\\\') : '';
      latex += `\\cventry{${startDate} -- ${endDate}}{${escapeLaTeX(exp.position || '')}}{${escapeLaTeX(exp.company || '')}}{}{}{${description}}}
`;
    });
    latex += '\n';
  }

  // Education
  if (resumeData.education && resumeData.education.length > 0) {
    latex += `% Education
\\section{Education}
`;
    resumeData.education.forEach((edu) => {
      const date = formatDate(edu.graduation_date || '');
      const degree = escapeLaTeX(edu.degree || '');
      const field = edu.field ? ` in ${escapeLaTeX(edu.field)}` : '';
      const institution = escapeLaTeX(edu.institution || '');
      const gpa = edu.gpa ? `GPA: ${escapeLaTeX(edu.gpa)}` : '';
      latex += `\\cventry{${date}}{${degree}${field}}{${institution}}{}{${gpa}}{}}
`;
    });
    latex += '\n';
  }

  // Projects
  if (resumeData.project && resumeData.project.length > 0) {
    latex += `% Projects
\\section{Projects}
`;
    resumeData.project.forEach((proj) => {
      const description = proj.description ? escapeLaTeX(proj.description).replace(/\n/g, '\\\\') : '';
      latex += `\\cvitem{${escapeLaTeX(proj.name || '')}}{${description}}
`;
    });
    latex += '\n';
  }

  // Skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    const skillsList = resumeData.skills.map(skill => escapeLaTeX(skill)).join(', ');
    latex += `% Skills
\\section{Skills}
\\cvitem{}{${skillsList}}

`;
  }

  // Certifications
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    latex += `% Certifications
\\section{Certifications \\& Achievements}
`;
    resumeData.certifications.forEach((cert) => {
      const issueDate = formatDate(cert.issue_date || '');
      const expiryDate = cert.expiry_date ? ` -- ${formatDate(cert.expiry_date)}` : '';
      const credentialId = cert.credential_id ? ` (ID: ${escapeLaTeX(cert.credential_id)})` : '';
      latex += `\\cventry{${issueDate}${expiryDate}}{${escapeLaTeX(cert.name || '')}}{${escapeLaTeX(cert.issuing_organization || '')}}{}{}{${credentialId}}
`;
    });
    latex += '\n';
  }

  latex += `\\end{document}`;

  return latex;
};

