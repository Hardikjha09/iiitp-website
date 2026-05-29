import React, { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';
import { FileText, ArrowLeft, Mail, Phone, BookOpen, GraduationCap, Link as LinkIcon, User } from 'lucide-react';
import facultyDetails from '../data/faculty_details.json';
import peopleData from '../data/people.json';

const FacultyProfilePage = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('biography');

  // Combine the clean name/designation from people.json with the rich data from faculty_details.json
  const profile = useMemo(() => {
    const details = facultyDetails[slug];
    if (!details) return null;

    const cleanEntry = peopleData.faculty.find(p => {
      if (!p.name) return false;
      const pSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return slug.includes(pSlug) || pSlug.includes(slug.replace('dr-', '').replace('prof-', ''));
    });

    let rawData = details.raw_data || '';

    // Parse contact info from raw data if available
    let email = '';
    let phone = '';
    let researchLinks = [];

    if (rawData) {
      const emailMatch = rawData.match(/Email:\s*([^\n]+)/i);
      if (emailMatch) email = emailMatch[1].trim();

      const phoneMatch = rawData.match(/Phone\+?\s*([^\n]+)/i) || rawData.match(/Phone:\s*([^\n]+)/i);
      if (phoneMatch) phone = phoneMatch[1].trim();

      // Extract links like google scholar, orcid
      const httpMatches = rawData.match(/https?:\/\/[^\s]+/g);
      if (httpMatches) {
        researchLinks = httpMatches.map(link => link.replace(/["'].*$/, ''));
      }
    }

    // Guess department from text
    let department = 'Faculty Member';
    const textToCheck = (rawData || details.bio || '').toLowerCase();
    if (textToCheck.includes('computer science') || textToCheck.includes('cse')) {
      department = 'Computer Science & Engineering';
    } else if (textToCheck.includes('electronics') || textToCheck.includes('ece') || textToCheck.includes('vlsi')) {
      department = 'Electronics & Communication Engineering';
    } else if (textToCheck.includes('applied science') || textToCheck.includes('humanities') || textToCheck.includes('mathematics') || textToCheck.includes('physics')) {
      department = 'Applied Science & Humanities';
    }

    return {
      ...details,
      name: cleanEntry?.name && cleanEntry.name !== 'Language' ? cleanEntry.name : details.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      designation: cleanEntry?.designation || 'Faculty Member',
      image: cleanEntry?.image || details.image,
      department,
      email,
      phone,
      researchLinks
    };
  }, [slug]);

  if (!profile) {
    return <Navigate to="/people/faculty" replace />;
  }

  const tabs = [
    { id: 'biography', label: 'Biography', icon: <User className="w-4 h-4 mr-2" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4 mr-2" /> },
    { id: 'contact', label: 'Contact Info', icon: <Mail className="w-4 h-4 mr-2" /> },
    { id: 'research', label: 'Research & Links', icon: <LinkIcon className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="bg-bg dark:bg-bg-dark min-h-screen pb-20">
      
      <PageHeader
        title="Faculty Profile"
        backgroundImage="/campus-image.jpg"
      >
        <Link
          to="/people/faculty"
          className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wide font-medium group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all faculty
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Sidebar - Sticky */}
          <div className="w-full lg:w-1/3 xl:w-1/4 sticky top-24 shrink-0">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="h-24 bg-gradient-to-r from-primary to-blue-800"></div>
              <div className="px-6 pb-6 flex flex-col items-center text-center -mt-12">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-surface-dark bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-md mb-4">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name) + "&background=1B3A6B&color=fff&size=512";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-primary font-serif">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h1 className="text-2xl font-bold font-serif text-gray-900 dark:text-white mb-1">
                  {profile.name}
                </h1>
                <p className="text-brand-red font-semibold text-sm mb-2">
                  {profile.designation}
                </p>
                {profile.department !== 'Faculty Member' && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-6">
                    {profile.department}
                  </p>
                )}

                {profile.resume && (
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Resume
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 min-h-[500px]">

              {/* Tabs Navigation */}
              <div className="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center whitespace-nowrap px-6 py-4 font-medium text-sm transition-colors relative ${activeTab === tab.id
                      ? 'text-primary dark:text-accent'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-accent rounded-t-full"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'biography' && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Biography</h2>
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                      {profile.bio || "No biography provided."}
                    </p>
                  </div>
                )}

                {activeTab === 'education' && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Educational Qualification</h2>
                    {profile.education ? (
                      <ul className="space-y-3 list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed marker:text-primary">
                        {profile.education.split('\n').filter(line => line.trim() !== '').map((line, idx) => (
                          <li key={idx} className="pl-2">
                            {/* If it's a comma separated string without newlines like "B Tech, M Tech, Phd.", we can just display it */}
                            {line.trim()}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        No educational qualifications provided.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mr-4 shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Email Address</h4>
                          {profile.email ? (
                            <a href={`mailto:${profile.email}`} className="text-lg text-primary dark:text-accent hover:underline font-medium break-all">
                              {profile.email}
                            </a>
                          ) : (
                            <p className="text-lg text-gray-900 dark:text-white font-medium">Not provided</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center mr-4 shrink-0">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Phone Number</h4>
                          {profile.phone ? (
                            <div className="flex flex-col space-y-1">
                              {profile.phone.split(/,|and|&/i).map((p, idx) => {
                                const cleanPhone = p.trim();
                                if (!cleanPhone) return null;
                                return (
                                  <a key={idx} href={`tel:${cleanPhone.replace(/[^\d+]/g, '')}`} className="text-lg text-primary dark:text-accent hover:underline font-medium">
                                    {cleanPhone}
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-lg text-gray-900 dark:text-white font-medium">Not provided</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'research' && (
                  <div className="animate-fade-in-up">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Research Profiles & Links</h2>
                    {profile.researchLinks.length > 0 ? (
                      <ul className="space-y-4">
                        {profile.researchLinks.map((link, idx) => {
                          // Try to guess link type
                          let type = "Research Profile";
                          if (link.includes('scholar.google')) type = "Google Scholar";
                          else if (link.includes('orcid')) type = "ORCID";
                          else if (link.includes('scopus')) type = "Scopus";

                          return (
                            <li key={idx}>
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-800 transition-all"
                              >
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                  <BookOpen className="w-5 h-5" />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="text-gray-900 dark:text-white font-semibold">{type}</h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-md">{link}</p>
                                </div>
                                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-primary transform rotate-135 opacity-0 group-hover:opacity-100 transition-all" style={{ transform: 'rotate(135deg)' }} />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No external research links available.</p>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FacultyProfilePage;
