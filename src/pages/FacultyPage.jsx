import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import facultyDetails from '../data/faculty_details.json';

const FacultyPage = () => {
  // Extract and format valid faculty from faculty_details.json
  const validFaculty = useMemo(() => {
    return Object.entries(facultyDetails).map(([slug, details]) => {
      // Derive name from slug
      const nameParts = slug.split('-');
      const formattedName = nameParts.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      
      return {
        ...details,
        name: formattedName,
        slug: slug
      };
    });
  }, []);

  const cseFaculty = validFaculty.filter(f => f.department === 'CSE');
  const eceFaculty = validFaculty.filter(f => f.department === 'ECE');
  const ashFaculty = validFaculty.filter(f => f.department === 'ASH');

  const renderFacultyGrid = (facultyList) => {
    if (facultyList.length === 0) {
      return (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 mb-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No faculty found matching your search.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 h-full">
      {facultyList.map((person, index) => {
        const slug = person.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
        <Link
          to={`/people/faculty/${slug}`}
          key={index}
          className="bg-white dark:bg-surface-dark rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full group relative"
        >
          {/* Subtle Background Accent */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-800/50 pointer-events-none"></div>

          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mt-6 bg-gray-100 dark:bg-gray-800 relative z-10 overflow-hidden rounded-full shadow-md border-4 border-white dark:border-gray-800">
            {person.image ? (
              <img 
                src={person.image} 
                alt={person.name} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
          
          <div className="p-4 flex-grow flex flex-col items-center text-center bg-white dark:bg-surface-dark z-10 w-full mt-1">
            <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-1 w-full">
              {person.name}
            </h3>
            
            {/* Fixed height container for designation (up to 2 lines) */}
            <div className="h-10 flex items-start justify-center w-full mb-1">
              <p className="text-sm text-brand-red font-medium whitespace-pre-line line-clamp-2">
                {person.designation || "Faculty Member"}
              </p>
            </div>
            
            {/* Fixed height container for expertise to ensure consistent sizing */}
            <div className="h-16 w-full flex flex-col items-center">
              {person.expertise ? (
                <>
                  <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mb-1.5 mt-0.5 shrink-0"></div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed line-clamp-2 w-full">
                    <span className="text-gray-400 dark:text-gray-500 font-semibold block mb-0.5">Expertise:</span>
                    {person.expertise}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </Link>
      )})}
    </div>
    );
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('dept')?.toUpperCase();
  const [activeTab, setActiveTab] = useState(
    initialTab === 'ECE' || initialTab === 'ASH' ? initialTab : 'CSE',
  );
  const [searchQuery, setSearchQuery] = useState('');

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
    setSearchParams({ dept: tab.toLowerCase() }, { replace: true });
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Faculty Members" 
        subtitle="Meet the distinguished faculty of IIIT Pune"
        backgroundImage="/campus-image.jpg"
        compact={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 dark:border-gray-700">
          
          {/* Controls: Search and Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative w-full sm:w-56 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
              />
            </div>

            <div className="flex flex-wrap bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full w-fit shrink-0 shadow-inner gap-1">
              <button
                onClick={() => updateActiveTab('CSE')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'CSE' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                CSE
              </button>
              <button
                onClick={() => updateActiveTab('ECE')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'ECE' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                ECE
              </button>
              <button
                onClick={() => updateActiveTab('ASH')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'ASH' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                ASH
              </button>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-primary dark:text-white flex items-center shrink-0">
              {activeTab === 'CSE' ? 'Computer Science & Engineering' :
               activeTab === 'ECE' ? 'Electronics & Communication Engineering' :
               'Applied Sciences & Humanities'}
            </h2>
          </div>

          {/* <div className="flex justify-end mb-6">
            <Link 
              to={`/departments/${activeTab.toLowerCase()}`} 
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-50 dark:bg-gray-800 text-primary dark:text-accent rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 font-medium text-sm group shrink-0"
            >
              View {activeTab} Department
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div> */}

          <div className="animate-fade-in-up">
            {activeTab === 'CSE' && renderFacultyGrid(cseFaculty.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())))}
            {activeTab === 'ECE' && renderFacultyGrid(eceFaculty.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())))}
            {activeTab === 'ASH' && renderFacultyGrid(ashFaculty.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase())))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyPage;
