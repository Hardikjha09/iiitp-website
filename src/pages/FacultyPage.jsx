import React, { useMemo } from 'react';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';
import { Link } from 'react-router-dom';
import peopleData from '../data/people.json';

const FacultyPage = () => {
  // Filter out the noise from the scraped data
  const validFaculty = useMemo(() => {
    return peopleData.faculty.filter(person => {
      if (!person.name) return false;
      const invalidNames = ['Language', 'Main navigation', 'Quick Links', 'Locate us'];
      if (invalidNames.includes(person.name)) return false;
      return true;
    });
  }, []);

  return (
    <div className="bg-bg dark:bg-bg-dark min-h-screen">
      <PageHeader 
        title="Faculty Members" 
        subtitle="Meet the distinguished faculty of IIIT Pune"
        backgroundImage="/campus-image.jpg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-full">
          {validFaculty.map((person, index) => {
            const slug = person.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return (
            <Link
              to={`/people/faculty/${slug}`}
              key={index}
              className="bg-white dark:bg-surface-dark rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full group"
            >
              <div className="w-full aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                {person.image ? (
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(person.name) + "&background=1B3A6B&color=fff&size=512";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-800 text-primary dark:text-gray-400">
                    <span className="text-5xl font-serif opacity-30">{person.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-grow flex flex-col items-center text-center bg-white dark:bg-surface-dark z-10">
                <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                  {person.name}
                </h3>
                <p className="text-sm text-brand-red font-medium mb-3 whitespace-pre-line">
                  {person.designation || "Faculty Member"}
                </p>
                {person.expertise && (
                  <>
                    <div className="w-12 h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-3 line-clamp-3">
                      <span className="text-gray-400 dark:text-gray-500 font-semibold block mb-1">Expertise:</span>
                      {person.expertise}
                    </p>
                  </>
                )}

              </div>
            </Link>
          )})}
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
