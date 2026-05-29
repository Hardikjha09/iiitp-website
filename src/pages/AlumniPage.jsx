import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';
import alumniData from '../data/alumni.json';
import { GraduationCap, Briefcase, Globe, MapPin } from 'lucide-react';

const AlumniPage = () => {
  const TableHeader = ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {children}
    </th>
  );

  const TableCell = ({ children, isFirst }) => (
    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isFirst ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
      {children}
    </td>
  );

  return (
    <div className="bg-bg dark:bg-bg-dark min-h-screen">
      <PageHeader 
        title="Our Alumni" 
        subtitle="The pride of IIIT Pune making global impact"
        backgroundImage="/campus-image.jpg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'People', path: '/people' },
            { label: 'Alumni' }
          ]} 
        />
        
        <div className="mt-8 space-y-16">
          
          {/* Intro Section */}
          <section className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
            <h2 className="text-2xl font-serif font-bold text-primary dark:text-accent mb-6 flex items-center">
              <GraduationCap className="w-8 h-8 mr-3" />
              Alumni Overview
            </h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 whitespace-pre-line text-lg">
              {alumniData.intro}
            </div>
          </section>

          {/* Higher Education Section */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8 border-b-2 border-primary inline-block pb-2">Higher Education</h2>
            
            <div className="space-y-12">
              {/* Abroad */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-brand-red" />
                  Pursuing Higher Studies Abroad
                </h3>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <TableHeader>Name of Alumni</TableHeader>
                          <TableHeader>Branch-Year</TableHeader>
                          <TableHeader>Name of the University</TableHeader>
                          <TableHeader>Masters or PhD</TableHeader>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800">
                        {alumniData.higherEducation.abroad.map((alumnus, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <TableCell isFirst>{alumnus.name}</TableCell>
                            <TableCell>{alumnus.branchYear}</TableCell>
                            <TableCell>{alumnus.university}</TableCell>
                            <TableCell>{alumnus.degree}</TableCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* India */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-green-600" />
                  Pursuing Higher Studies in India
                </h3>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <TableHeader>Name of Alumni</TableHeader>
                          <TableHeader>Branch-Year</TableHeader>
                          <TableHeader>Name of the University</TableHeader>
                          <TableHeader>Masters or PhD</TableHeader>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800">
                        {alumniData.higherEducation.india.map((alumnus, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <TableCell isFirst>{alumnus.name}</TableCell>
                            <TableCell>{alumnus.branchYear}</TableCell>
                            <TableCell>{alumnus.university}</TableCell>
                            <TableCell>{alumnus.degree}</TableCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Industry Placements Section */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-8 border-b-2 border-primary inline-block pb-2">Industry Placements</h2>
            
            <div className="space-y-12">
              {/* Batch 2017-2021 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-primary" />
                  Alumni working in MNCs (Batch 2017-2021)
                </h3>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <TableHeader>Name of Alumni</TableHeader>
                          <TableHeader>Company</TableHeader>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800">
                        {alumniData.placements.batch2017_2021.map((alumnus, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <TableCell isFirst>{alumnus.name}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {alumnus.company}
                              </span>
                            </TableCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Batch 2016-2020 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-primary" />
                  Alumni working in MNCs (Batch 2016-2020)
                </h3>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <TableHeader>Name of Alumni</TableHeader>
                          <TableHeader>Company</TableHeader>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800">
                        {alumniData.placements.batch2016_2020.map((alumnus, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <TableCell isFirst>{alumnus.name}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {alumnus.company}
                              </span>
                            </TableCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* M.Tech Batch 2019-2021 */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                  <Briefcase className="w-6 h-6 mr-2 text-primary" />
                  Alumni working in MNCs (M.Tech Batch 2019-2021)
                </h3>
                <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <TableHeader>Name of Alumni</TableHeader>
                          <TableHeader>Company</TableHeader>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-200 dark:divide-gray-800">
                        {alumniData.placements.mtech2019_2021.map((alumnus, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <TableCell isFirst>{alumnus.name}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                {alumnus.company}
                              </span>
                            </TableCell>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-12 pb-8 italic">
            Last Updated: {alumniData.lastUpdated}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
