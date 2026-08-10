import React, { useState } from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import careersData from '../data/careers.json';

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState('live');
  const expiredRecruitmentMessage = 'You missed the opportunity. The recruitment date has ended for this position. Please keep checking our careers page for upcoming positions.';

  const parseDmyDate = (value) => {
    if (!value || typeof value !== 'string') {
      return null;
    }

    const [day, month, year] = value.split('-').map((part) => Number(part));
    if (!day || !month || !year) {
      return null;
    }

    const parsedDate = new Date(year, month - 1, day);
    parsedDate.setHours(0, 0, 0, 0);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const isRecruitmentEnded = (job, btn) => {
    if (typeof btn.isRecruitmentEnded === 'boolean') {
      return btn.isRecruitmentEnded;
    }

    const lastDate = parseDmyDate(job.lastDate);
    if (!lastDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today > lastDate;
  };

  const handleApplyNowClick = (event) => {
    event.preventDefault();
    window.alert(expiredRecruitmentMessage);
  };

  const jobs = activeTab === 'live' ? careersData.live : careersData.archive;

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Careers @ IIIT Pune" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        
        {/* Tab Selection */}
        <div className="flex justify-center mb-8 w-full overflow-x-auto pb-2 custom-scrollbar">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 min-w-max">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'live'
                  ? 'bg-white dark:bg-surface-dark text-primary dark:text-accent-dark shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Active Postings
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'archive'
                  ? 'bg-white dark:bg-surface-dark text-primary dark:text-accent-dark shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Archived Postings
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-800 w-full overflow-x-auto custom-scrollbar">
          <div className="flex flex-col min-w-[600px] md:min-w-0">
            {jobs.length > 0 ? (
              jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors last:border-b-0"
                >
                  <div className="flex-1 mb-4 md:mb-0 md:pr-8">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-relaxed mb-2">
                      {job.title}
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-600 dark:text-gray-300">Date of Upload:</span> {job.date}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {job.buttons.map((btn, bidx) => (
                      btn.isInternalRoute ? (
                        <Link
                          key={bidx}
                          to={btn.link}
                          onClick={btn.label?.toLowerCase() === 'apply now' && isRecruitmentEnded(job, btn) ? handleApplyNowClick : undefined}
                          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-xs font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow active:scale-95 text-center"
                        >
                          {btn.label}
                        </Link>
                      ) : (
                        <a
                          key={bidx}
                          href={btn.link || btn.file}
                          target="_blank" rel="noopener noreferrer"
                          onClick={btn.label?.toLowerCase() === 'apply now' && isRecruitmentEnded(job, btn) ? handleApplyNowClick : undefined}
                          className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white text-xs font-semibold py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow active:scale-95 text-center"
                        >
                          {btn.label}
                        </a>
                      )
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No postings found in this section.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
