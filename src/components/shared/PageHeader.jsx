import React from 'react';
import Breadcrumb from './Breadcrumb';

const PageHeader = ({ title, subtitle, backgroundImage, children }) => {
  return (
    <div className="bg-primary dark:bg-surface-dark py-8 md:py-12 relative overflow-hidden transition-colors duration-200 border-b border-blue-900/50 dark:border-gray-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 dark:bg-accent-dark/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4 shadow-sm break-words">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mb-6">
            {subtitle}
          </p>
        )}
        <Breadcrumb />
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
