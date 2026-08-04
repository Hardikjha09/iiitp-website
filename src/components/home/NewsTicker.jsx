import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Megaphone } from 'lucide-react';

const NewsTicker = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    import('../../data/news.json')
      .then((module) => {
        if (module.default) {
          setNews(module.default);
        }
      })
      .catch(() => {
        // Fallback mock news
        setNews([
          { id: 101, title: "Assistant Professor (Temporary) in the Department of Electronics and Communication Engineering (ECE)", link: "/careers-documents/ECE - AP Temp advt.pdf" },
          { id: 103, title: "Physical Reporting Instructions: JoSAA/CSAB 2026", link: "/documents/DETAILS%20OF%20ADMISSION%20PROCESS%20FOR%20FIRST%20SEMESTER%202026-27.pdf" },
          { id: 1, title: "Admissions for B.Tech 2025-26 via JoSAA/CSAB are now open" },
          { id: 2, title: "IIIT Pune secures top rank in National Smart India Hackathon 2024" },
          { id: 3, title: "New AI & Robotics Research lab inaugurated by the Director" },
          { id: 4, title: "Call for Papers: International Conference on VLSI and Embedded Systems" },
          { id: 5, title: "Excellent Placement Season 2024-25 with Highest Package of 53 LPA" },
          { id: 6, title: "RECRUITMENT NOTICE FOR THE POST OF ASSISTANT PROFFESOR" }
        ]);
      });
  }, []);

  return (
    <div className="relative w-full bg-blue-950 dark:bg-gray-905 border-b border-blue-900 dark:border-gray-800 text-white h-10 flex items-center overflow-hidden z-40 select-none">
      {/* Title Tag */}
      <Link to="/news" className="absolute left-0 top-0 bottom-0 bg-brand-red text-white font-bold text-xs uppercase px-4 flex items-center gap-1.5 z-50 shadow-md hover:bg-red-700 transition-colors">
        <Megaphone size={14} className="animate-bounce" />
        <span className="whitespace-nowrap">Latest News</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </Link>

      {/* Marquee Container */}
      <div className="w-full pl-36 overflow-hidden flex items-center">
        <div className="animate-marquee-horizontal hover:[animation-play-state:paused] whitespace-nowrap flex items-center py-1">
          {news.map((item) => {
            const isExternal = item.link && (item.link.startsWith('http') || item.link.endsWith('.pdf'));
            return isExternal ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank" rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.link || "/news"}
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </Link>
            )
          })}
          {/* Duplicate news list for seamless looping */}
          {news.map((item) => {
            const isExternal = item.link && (item.link.startsWith('http') || item.link.endsWith('.pdf'));
            return isExternal ? (
              <a
                key={`dup-${item.id}`}
                href={item.link}
                target="_blank" rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </a>
            ) : (
              <Link
                key={`dup-${item.id}`}
                to={item.link || "/news"}
                className="text-xs md:text-sm font-semibold text-white hover:text-brand-red transition-colors mx-12 inline-flex items-center gap-2"
              >
                <span className="hover:underline">{item.title}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-horizontal {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-horizontal {
          display: inline-block;
          animation: marquee-horizontal 150s linear infinite;
        }
      `}} />
    </div>
  );
};

export default NewsTicker;
