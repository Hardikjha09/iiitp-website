import React, { useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import { BookOpen, Clock, Users, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MtechCsePage = () => {
  const [activeSemester, setActiveSemester] = useState(1);

  const curriculum = [
    {
      semester: 1,
      totalCredits: 16,
      courses: [
        { name: "IoT and Sensor Data Visualization", hours: "3-0-0", credits: 3 },
        { name: "Artificial Intelligence (Program Elective)", hours: "3-0-0", credits: 3 },
        { name: "Linear and Nonlinear Optimization (Institute Core)", hours: "3-0-0", credits: 3 },
        { name: "Machine Learning (Open Elective)", hours: "3-0-2", credits: 4 },
        { name: "Research Methodology (Institute Core)", hours: "1-0-0", credits: 1 },
        { name: "Minor Project", hours: "0-0-4", credits: 2 }
      ]
    },
    {
      semester: 2,
      totalCredits: 14,
      courses: [
        { name: "Big Data Analytics", hours: "3-0-0", credits: 3 },
        { name: "Cloud Architecture and Computing", hours: "3-0-0", credits: 3 },
        { name: "Swarm Intelligence (Program Elective)", hours: "3-0-0", credits: 3 },
        { name: "Deep Learning", hours: "3-0-0", credits: 3 },
        { name: "Minor Project", hours: "0-0-4", credits: 2 }
      ]
    },
    {
      semester: 3,
      totalCredits: 12,
      courses: [
        { name: "Major Project-I / Internship-I", hours: "0-0-24", credits: 12 }
      ]
    },
    {
      semester: 4,
      totalCredits: 12,
      courses: [
        { name: "Major Project-II / Internship-II", hours: "0-0-24", credits: 12 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors duration-200">
      <PageHeader title="M.Tech. Computer Science and Engineering" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-12">
            
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl shadow-xl text-white p-8 md:p-10 h-full flex flex-col justify-center">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-white">
                  Program Overview
                </h2>
                <div className="text-indigo-100 text-lg leading-relaxed mb-6 space-y-4">
                  <p>
                    The M.Tech. CSE in AI programme is designed to impart students with latest aspects in Machine Learning, Data Science and Data Visualization, Deep Learning, Big Data Analytics, Cloud Computing, and other topics related to it. Students are encouraged to participate in research within their field of specialization.
                  </p>
                  <div>
                    <strong>Admissions:</strong>
                    <p>Admission is based on two modes:</p>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      <li>GATE through CCMT</li>
                      <li>Non-GATE through written test and interview</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                    <Clock className="w-6 h-6 text-indigo-300" />
                    <div>
                      <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">Duration</p>
                      <p className="font-bold text-lg">2 Years (4 Semesters)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                    <Users className="w-6 h-6 text-indigo-300" />
                    <div>
                      <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">Intake</p>
                      <p className="font-bold text-lg">36 Students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                    <Award className="w-6 h-6 text-indigo-300" />
                    <div>
                      <p className="text-xs text-indigo-200 font-medium uppercase tracking-wider">Specialization</p>
                      <p className="font-bold text-lg">Artificial Intelligence</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 h-full flex flex-col">
              <h3 className="font-bold font-serif text-lg text-primary dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                Department Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/academics/btech/cse" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    B.Tech CSE
                  </a>
                </li>
                <li>
                  <a href="/academics/btech/ece" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    B.Tech ECE
                  </a>
                </li>
                <li>
                  <a href="/academics/btech/honors" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    B.Tech Honors
                  </a>
                </li>
                <li className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                  <a href="/academics/mtech/ece" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    M.Tech ECE
                  </a>
                </li>
                <li>
                  <a href="/academics/phd" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    Ph.D.
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
        </div>

        <section className="mt-12 w-full">
          <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">
                Curriculum & Syllabus
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Explore the semester-wise course structure (Total Credits: 54).</p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 mb-6 pb-4">
            {[1, 2, 3, 4].map((sem) => (
              <button
                key={sem}
                onClick={() => setActiveSemester(sem)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeSemester === sem
                    ? "bg-brand-red text-white shadow-md dark:bg-brand-red-dark"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                Semester {sem}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden relative min-h-[300px]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-16">
                      S.No
                    </th>
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-[60%]">
                      Course Title
                    </th>
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-[25%] text-center">
                      Hours/Week(L-T-P)
                    </th>
                    <th className="py-2.5 px-4 font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-700 w-[15%] text-center">
                      Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {curriculum.find(c => c.semester === activeSemester)?.courses.map((course, index) => (
                      <motion.tr
                        key={`${activeSemester}-${course.name}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="group border-b border-gray-100 dark:border-gray-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors"
                      >
                        <td className="py-2.5 px-4 text-gray-500 dark:text-gray-400 font-medium">
                          {index + 1}.
                        </td>
                        <td className="py-2.5 px-4 font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                          {course.name}
                        </td>
                        <td className="py-2.5 px-4 text-gray-600 dark:text-gray-400 text-center font-medium">
                          {course.hours}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 font-bold text-sm">
                            {course.credits}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                    {!curriculum.find(c => c.semester === activeSemester)?.courses && (
                      <tr>
                        <td colSpan="4" className="py-12 text-center text-gray-500 dark:text-gray-400 italic">
                          Curriculum details for Semester {activeSemester} will be updated soon.
                        </td>
                      </tr>
                    )}
                    {curriculum.find(c => c.semester === activeSemester)?.totalCredits && (
                      <motion.tr
                        key="total"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-indigo-50/80 dark:bg-indigo-900/20 border-t-2 border-indigo-200 dark:border-indigo-800"
                      >
                        <td colSpan="2" className="py-2.5 px-4 text-right font-bold text-gray-800 dark:text-gray-200">
                          Total Credits
                        </td>
                        <td colSpan="2" className="py-2.5 px-4 text-center text-indigo-700 dark:text-indigo-500 font-black text-lg">
                          {curriculum.find(c => c.semester === activeSemester).totalCredits}
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MtechCsePage;
