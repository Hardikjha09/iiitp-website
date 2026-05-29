import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';
import { Users } from 'lucide-react';

const NonTeachingStaffPage = () => {
  return (
    <div className="bg-bg dark:bg-bg-dark min-h-screen">
      <PageHeader 
        title="Non-Teaching Staff" 
        subtitle="The dedicated team supporting our institution"
        backgroundImage="/campus-image.jpg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb 
          items={[
            { label: 'Home', path: '/' },
            { label: 'People', path: '/people' },
            { label: 'Non-Teaching Staff' }
          ]} 
        />
        
        <div 
          className="mt-12 text-center py-24 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center animate-fade-in-up"
        >
          <div className="w-20 h-20 bg-blue-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-primary dark:text-gray-400" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Content Being Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto text-lg">
            We are currently gathering and updating the profiles for our Non-Teaching Staff. 
            This page will be populated with their information very soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NonTeachingStaffPage;
