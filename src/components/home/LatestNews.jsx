import React, { useState, useEffect } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    import("../../data/news.json")
      .then((module) => {
        if (module.default && module.default.length > 0) {
          setNews(module.default.slice(0, 3));
        }
      })
      .catch(() => {
        setNews([
          {
            id: 109,
            title: "SAC Club Heads and Co-Heads for the Academic Year 2026–27",
            date: "21-08-2026",
            excerpt: "The Student Activity Council (SAC) has announced the Club Heads and Co-Heads for the Academic Year 2026–27.",
            link: "/documents/SAC Club Heads and Co-Heads.pdf"
          },
          {
            id: 108,
            title: "Orientation Programme for B.Tech./ M.Tech I Year (AY 2026-27)",
            date: "19-08-2026",
            excerpt: "Orientation Programme for B.Tech./ M.Tech I Year students for the Academic Year 2026-27.",
            link: "/documents/Final orientation.pdf"
          },
          {
            id: 107,
            title: "Institute Bus Service: Extra Running Bus-32A on 13th August 2026",
            date: "13-08-2026",
            excerpt: "Extra running bus service for Bus-32A has been arranged on 13th August 2026.",
            link: "/documents/Institte_Bus_Service_Extra Running_Bus-32A_13th_August2026..pdf"
          },
          {
            id: 106,
            title: "ADVERTISEMENT FOR POSITIONS IN START-UP & INCUBATION CELL IN INSTITUTE",
            date: "11-08-2026",
            excerpt:"Applications are invited for the positions of CEO, CIO, and Manager in the Start-up & Incubation Cell at IIIT Pune.",
            link: "/careers-documents/Advt. for CEO, CIO, Manager.pdf",
          },
          {
            id: 105,
            title: "Shortlisted Candidates for Stage - II (Presentation)in Start-up & Incubation Centre",
            date: "07-08-2026",
            excerpt: "List of Shortlisted Candidates for Second Stage of Selection Process (Presentation) in Start-up & Incubation Centre (S&IC), IIIT Pune",
            link: "https://www.iiitp.ac.in/careers-documents/2nd%20Stage%20of%20Selection%20-%20Presentation.pdf",
          },
          {
            id: 104,
            title: "SPOT Admission for M.Tech. (Without Scholarship) Programme 2026-27",
            date: "06-08-2026",
            excerpt: "SPOT Admission for M.Tech. (Without Scholarship) Programme 2026-27 has been announced.",
            link: "/admissions",
          },
          {
            id: 101,
            title: "Assistant Professor (Temporary) in the Department of Electronics and Communication Engineering (ECE)",
            date: "29-07-2026",
            excerpt:
              "Applications are invited for the position of Assistant Professor (Temporary) in the Department of Electronics and Communication Engineering (ECE) at IIIT Pune.",
            link: "/careers-documents/ECE - AP Temp advt.pdf",
          },
          {
            id: 103,
            title: "Physical Reporting Instructions: JoSAA/CSAB 2026",
            date: "21-07-2026",
            excerpt:
              "Physical Reporting Instructions for B.Tech candidates admitted through JoSAA/CSAB 2026 are now available.",
            link: "/documents/DETAILS%20OF%20ADMISSION%20PROCESS%20FOR%20FIRST%20SEMESTER%202026-27.pdf",
          },
          {
            id: 2,
            title: "IIIT Pune secures top rank in recent Hackathon",
            date: "May 10, 2025",
            excerpt:
              "Our students demonstrated excellent problem-solving skills at the national level hackathon.",
            link: "/notice",
          },
          {
            id: 3,
            title: "New AI Research lab inaugurated by the Director",
            date: "May 02, 2025",
            excerpt:
              "The new laboratory is equipped with state-of-the-art GPUs for deep learning research.",
            link: "/notice",
          },
        ]);
      });

    import("../../data/notices.json")
      .then((module) => {
        if (module.default && module.default.length > 0) {
          setNotices(module.default.slice(0, 8));
        }
      })
      .catch(() => {
        setNotices([]);
      });
  }, []);

  return (
    <section className="py-16 bg-surface dark:bg-bg-dark transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Announcements */}
          <div className="lg:w-1/3 bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col">
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-6 font-bold text-lg font-serif">
              Announcements
            </div>

            <div className="relative flex-grow h-[350px] overflow-hidden bg-white dark:bg-surface-dark p-4 group">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-surface-dark to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-surface-dark to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee group-hover:[animation-play-state:paused] flex flex-col space-y-4 pt-4 absolute w-[calc(100%-2rem)]">
                {notices.map((notice) => {
                  const isExternal = notice.link && (notice.link.endsWith('.pdf') || notice.link.startsWith('http'));
                  return isExternal ? (
                    <a
                      key={notice.id}
                      href={notice.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-text dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark border-b border-gray-100 dark:border-gray-800 pb-3 block transition-colors"
                    >
                      <span className="text-accent dark:text-accent-dark font-bold mr-2 text-xs uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                        New
                      </span>
                      {notice.title}
                    </a>
                  ) : (
                    <Link
                      key={notice.id}
                      to={notice.link || "/notice"}
                      className="text-sm font-medium text-text dark:text-gray-300 hover:text-accent dark:hover:text-accent-dark border-b border-gray-100 dark:border-gray-800 pb-3 block transition-colors"
                    >
                      <span className="text-accent dark:text-accent-dark font-bold mr-2 text-xs uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                        New
                      </span>
                      {notice.title}
                    </Link>
                  );
                })}
                {notices.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No recent announcements.</p>
                )}
              </div>
            </div>

            <Link
              to="/notice"
              className="block text-center py-3 bg-gray-50 dark:bg-gray-800/80 text-brand-red dark:text-brand-red-dark font-semibold text-sm hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 transition-colors border-t border-gray-100 dark:border-gray-800"
            >
              View All Notices
            </Link>
          </div>

          {/* Latest News */}
          <div className="lg:w-2/3 bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
            {/* Blue Header */}
            <div className="bg-primary dark:bg-gray-800 text-white py-3 px-6 font-bold text-lg font-serif flex justify-between items-center">
              <h2>Latest News</h2>

              <Link
                to="/notice"
                className="text-white text-sm font-medium hover:underline flex items-center"
              >
                More News
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Cards */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-surface-dark rounded-xl shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300 border border-gray-100 dark:border-gray-800 flex flex-col"
                  >
                    <div className="h-40 bg-gray-100 dark:bg-gray-800 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Calendar className="w-12 h-12 text-blue-200 dark:text-gray-600" />
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                        <Calendar
                          size={12}
                          className="mr-1.5 text-accent dark:text-accent-dark"
                        />

                        {item.date}
                      </div>

                      <h3 className="font-bold text-text dark:text-gray-100 mb-2 line-clamp-2 hover:text-accent dark:hover:text-accent-dark transition-colors text-lg">
                        {item.link && (item.link.endsWith('.pdf') || item.link.startsWith('http')) ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        ) : (
                          <Link to={item.link || "/news"}>{item.title}</Link>
                        )}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow text-justify">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateY(350px); }
              100% { transform: translateY(-100%); }
            }

            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
          `,
        }}
      />
    </section>
  );
};

export default LatestNews;
