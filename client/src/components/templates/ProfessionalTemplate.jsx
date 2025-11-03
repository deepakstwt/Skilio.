import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    const personal = data.personal_info || {};

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {/* Header */}
            <header className="mb-8">
                <h1 
                    className="text-4xl font-bold mb-2"
                    style={{ color: accentColor }}
                >
                    {personal.full_name || "Your Name"}
                </h1>
                {personal.profession && (
                    <p className="text-lg text-gray-700 mb-4">
                        {personal.profession}
                    </p>
                )}
                
                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                    {personal.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="size-4" style={{ color: accentColor }} />
                            <span>{personal.email}</span>
                        </div>
                    )}
                    {personal.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="size-4" style={{ color: accentColor }} />
                            <span>{personal.phone}</span>
                        </div>
                    )}
                    {personal.location && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-4" style={{ color: accentColor }} />
                            <span>{personal.location}</span>
                        </div>
                    )}
                    {personal.linkedin && (
                        <a 
                            target="_blank" 
                            href={personal.linkedin} 
                            className="flex items-center gap-1.5 hover:underline"
                        >
                            <Linkedin className="size-4" style={{ color: accentColor }} />
                            <span className="text-xs break-all">
                                {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                            </span>
                        </a>
                    )}
                    {personal.website && (
                        <a 
                            target="_blank" 
                            href={personal.website} 
                            className="flex items-center gap-1.5 hover:underline"
                        >
                            <Globe className="size-4" style={{ color: accentColor }} />
                            <span className="text-xs break-all">
                                {personal.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </span>
                        </a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 
                        className="text-lg font-bold mb-3 uppercase tracking-wide"
                        style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px' }}
                    >
                        Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 
                        className="text-lg font-bold mb-4 uppercase tracking-wide"
                        style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px' }}
                    >
                        Professional Experience
                    </h2>

                    <div className="space-y-5">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                                        <p className="font-semibold text-gray-700 text-sm" style={{ color: accentColor }}>
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600 text-right ml-4">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-inside text-gray-700 text-sm leading-relaxed mt-2 space-y-1 ml-2">
                                        {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 
                        className="text-lg font-bold mb-4 uppercase tracking-wide"
                        style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px' }}
                    >
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-base">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="font-semibold text-gray-700 text-sm" style={{ color: accentColor }}>
                                        {edu.institution}
                                    </p>
                                    {edu.gpa && (
                                        <p className="text-sm text-gray-600">CGPA: {edu.gpa}</p>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600 text-right ml-4">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 
                        className="text-lg font-bold mb-4 uppercase tracking-wide"
                        style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px' }}
                    >
                        Technical Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900 text-base mb-1">{proj.name}</h3>
                                {proj.description && (
                                    <ul className="list-disc list-inside text-gray-700 text-sm leading-relaxed space-y-1 ml-2">
                                        {proj.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                            <li key={i}>{line.trim()}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 
                        className="text-lg font-bold mb-4 uppercase tracking-wide"
                        style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px' }}
                    >
                        Technical Skills
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs font-medium rounded-full text-gray-700 border"
                                style={{ borderColor: accentColor, backgroundColor: `${accentColor}15` }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
                <section className="mb-6">
                    <h2 
                        className="text-lg font-bold mb-4 uppercase tracking-wide"
                        style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, paddingBottom: '4px' }}
                    >
                        Certifications & Achievements
                    </h2>

                    <div className="space-y-3">
                        {data.certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-base">{cert.name}</h3>
                                    {cert.issuing_organization && (
                                        <p className="font-semibold text-gray-700 text-sm" style={{ color: accentColor }}>
                                            {cert.issuing_organization}
                                        </p>
                                    )}
                                    {cert.credential_id && (
                                        <p className="text-xs text-gray-600">ID: {cert.credential_id}</p>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600 text-right ml-4">
                                    {cert.issue_date && (
                                        <p>{formatDate(cert.issue_date)}{cert.expiry_date ? ` - ${formatDate(cert.expiry_date)}` : ''}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ProfessionalTemplate;

