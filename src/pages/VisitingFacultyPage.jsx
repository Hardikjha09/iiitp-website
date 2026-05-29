import React, { useMemo } from 'react';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';
import peopleData from '../data/people.json';

const VisitingFacultyPage = () => {
  const validFaculty = useMemo(() => {
    return [
      {
        name: "Prof. L D Behera",
        designation: "Director, IIT Mandi",
        image: "https://home.iitk.ac.in/~lbehera/img/personal.jpg"
      },
      {
        name: "Prof. J Dhar",
        designation: "Professor, ABV-IIITM Gwalior",
        image: "https://www.iiitm.ac.in/images/demo/teachers/1533094412_jdhar.jpg"
      },
      {
        name: "Prof. B B Gupta",
        designation: "Professor, Asia University, Taiwan",
        image: "https://aicybersecuritycenter.com/wp-content/uploads/2022/04/Brij-Photo.jpg"
      },
      {
        name: "Dr. Raghunath Tewari",
        designation: "Associate Professor, IIT Kanpur",
        image: "https://www.cse.iitk.ac.in/users/rtewari/jabalpur.jpg"
      },
      {
        name: "Dr. Soumya Prakash Dash",
        designation: "Assistant Professor, IIT Bhubaneswar",
        image: "http://www.iitbbs.ac.in/faculty/iit_1621523582.JPG"
      },
      {
        name: "Dr. Bodhisatwa Mazumdar",
        designation: "Assistant Professor, IIT Indore",
        image: "https://people.iiti.ac.in/~bodhisatwa/img/bodhi.jpg"
      }
    ];
  }, []);

  return (
    <div className="bg-bg dark:bg-bg-dark min-h-screen">
      <PageHeader 
        title="Visiting Faculty" 
        subtitle="Eminent scholars and industry experts"
        backgroundImage="/campus-image.jpg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'People', path: '/people' },
            { label: 'Visiting Faculty' }
          ]} 
        />
        
        {validFaculty.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 h-full">
            {validFaculty.map((person, index) => (
              <div
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
                  <p className="text-sm text-brand-red font-medium mb-3">
                    {person.designation || "Visiting Faculty"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-20 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">Content Being Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
              We are currently updating our Visiting Faculty profiles. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitingFacultyPage;
