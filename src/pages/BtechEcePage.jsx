import React, { useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import { Radio, Clock, Users, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BtechEcePage = () => {
  const [activeSemester, setActiveSemester] = useState(1);

  const curriculum = [
    {
      semester: 1,
      totalCredits: 19,
      courses: [
        { name: "Basic Electronics Engineering", hours: "3-0-2", credits: 4 },
        { name: "Foundations of Computer Science", hours: "3-0-0", credits: 3 },
        { name: "Computer Programming Concept & Practice", hours: "3-0-2", credits: 4 },
        { name: "Engineering Mathematics-I", hours: "3-0-0", credits: 3 },
        { name: "Language & Writing Skills", hours: "2-0-0", credits: 2 },
        { name: "Innovation", hours: "1-0-0", credits: 1 },
        { name: "Environmental Science", hours: "2-0-0", credits: 2 }
      ]
    },
    {
      semester: 2,
      totalCredits: 20,
      courses: [
        { name: "Digital Logic & Design", hours: "3-0-2", credits: 4 },
        { name: "Data Structure & Algorithms", hours: "3-0-2", credits: 4 },
        { name: "Object Oriented Programming Language", hours: "3-0-2", credits: 4 },
        { name: "Engineering Mathematics-II", hours: "3-0-0", credits: 3 },
        { name: "Humanities", hours: "2-0-0", credits: 2 },
        { name: "Entrepreneurship Studies", hours: "1-0-0", credits: 1 },
        { name: "Consciousness and Values", hours: "2-0-0", credits: 2 }
      ]
    },
    {
      semester: 3,
      totalCredits: 21,
      courses: [
        { name: "Analysis & Design of Algorithm", hours: "3-0-2", credits: 4 },
        { name: "Computer Organization and Architecture", hours: "3-0-0", credits: 3 },
        { name: "Network Analysis and Theory", hours: "3-0-0", credits: 3 },
        { name: "Database Management System", hours: "3-0-2", credits: 4 },
        { name: "Python Programming", hours: "3-0-2", credits: 4 },
        { name: "Probability and Random Process", hours: "3-0-0", credits: 3 }
      ]
    },
    {
      semester: 4,
      totalCredits: 22,
      courses: [
        { name: "Analog Electronics Circuit", hours: "3-0-2", credits: 4 },
        { name: "Artificial Intelligence", hours: "3-0-0", credits: 3 },
        { name: "Operating System", hours: "3-0-2", credits: 4 },
        { name: "Java Programming", hours: "2-0-2", credits: 3 },
        { name: "Signals and Systems", hours: "3-0-0", credits: 3 },
        { name: "Analog Communication", hours: "3-0-2", credits: 4 },
        { name: "Minor Project-I", hours: "0-0-2", credits: 1 }
      ]
    },
    {
      semester: 5,
      totalCredits: 24,
      courses: [
        { name: "Digital Communication", hours: "3-0-2", credits: 4 },
        { name: "VLSI Design", hours: "3-0-2", credits: 4 },
        { name: "Antenna and RF Microwave", hours: "3-0-2", credits: 4 },
        { name: "Elective 1 (DE)", hours: "3-0-0", credits: 3 },
        { name: "Elective 2 (OE)", hours: "3-0-0", credits: 3 },
        { name: "Linear and Nonlinear Optimization", hours: "3-0-0", credits: 3 },
        { name: "Minor Project-II", hours: "0-0-6", credits: 3 }
      ]
    },
    {
      semester: 6,
      totalCredits: 22,
      courses: [
        { name: "Information Theory and Coding", hours: "3-0-0", credits: 3 },
        { name: "Wireless communication", hours: "3-0-2", credits: 4 },
        { name: "Embedded System", hours: "3-0-0", credits: 3 },
        { name: "Elective 1 (DE)", hours: "3-0-0", credits: 3 },
        { name: "Elective 2 (OE)", hours: "3-0-0", credits: 3 },
        { name: "Elective 3 (OE)", hours: "3-0-0", credits: 3 },
        { name: "Minor Project-III", hours: "0-0-6", credits: 3 }
      ]
    },
    {
      semester: 7,
      totalCredits: 17,
      courses: [
        { name: "Intelligent Systems and Robotics", hours: "3-0-0", credits: 3 },
        { name: "Internet of Things", hours: "3-0-0", credits: 3 },
        { name: "Elective 1 (DE)", hours: "3-0-0", credits: 3 },
        { name: "Elective 2 (OE)", hours: "3-0-0", credits: 3 },
        { name: "Major Project-I", hours: "0-0-6", credits: 3 },
        { name: "Internship", hours: "0-0-4", credits: 2 }
      ]
    },
    {
      semester: 8,
      totalCredits: 16,
      courses: [
        { name: "Major Project-II", hours: "0-0-32", credits: 16 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors duration-200">
      <PageHeader title="B.Tech Electronics and Communication Engineering" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-3 space-y-12">
            
            <section className="relative overflow-hidden bg-gradient-to-br from-green-900 to-teal-900 rounded-2xl shadow-xl text-white p-8 md:p-10 h-full flex flex-col justify-center">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-white">
                  Program Overview
                </h2>
                <div className="text-green-100 text-lg leading-relaxed mb-6 space-y-4">
                  <p>
                    The primary focus of the Department of Electronics and Communication Engineering (ECE) at IIIT Pune is on collaborative research and practical education in the field of electronics and communication. The department also offers PG and doctoral courses.
                  </p>
                  <div>
                    <strong>The broad areas of research in the department are:</strong>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      <li>Communication System</li>
                      <li>RF and Microwave Engineering</li>
                      <li>Microelectronics and VLSI</li>
                      <li>IoT and Robotics</li>
                      <li>Image Processing</li>
                    </ul>
                  </div>
                  <div>
                    <strong>In addition, the ECE department is equipped with the following laboratories:</strong>
                    <ul className="list-disc list-inside mt-2 ml-4">
                      <li>Communications Laboratory</li>
                      <li>VLSI Lab</li>
                      <li>IoT Lab</li>
                      <li>Semiconductor and Devices Lab</li>
                    </ul>
                  </div>
                  <p>
                    In addition, students are also provided with training in computing and use of Electronic Design Automation (EDA) tools.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                    <Clock className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-xs text-green-200 font-medium uppercase tracking-wider">Duration</p>
                      <p className="font-bold text-lg">4 Years (8 Semesters)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-lg border border-white/20">
                    <Users className="w-6 h-6 text-green-300" />
                    <div>
                      <p className="text-xs text-green-200 font-medium uppercase tracking-wider">Intake Capacity</p>
                      <p className="font-bold text-lg">---</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-24 h-full flex flex-col">
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
                  <a href="/academics/btech/honors" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    B.Tech Honours
                  </a>
                </li>
                <li className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                  <a href="/academics/mtech/cse" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    M.Tech CSE
                  </a>
                </li>
                <li>
                  <a href="/academics/mtech/ece" className="block text-gray-600 dark:text-gray-400 hover:text-accent-dark dark:hover:text-accent-dark transition-colors font-medium">
                    M.Tech ECE
                  </a>
                </li>
              </ul>

              <div className="mt-8 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-900/50">
                <h4 className="font-bold text-primary dark:text-white mb-2 text-sm uppercase tracking-wider">Contact Department</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <strong>Head of Department</strong>
                </p>
                <p className="text-sm text-brand-red dark:text-brand-red-dark font-medium break-all">
                  hodece@iiitp.ac.in
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum & Syllabus */}
        <section className="mt-12 w-full">
          <div className="flex justify-between items-end mb-8 border-b pb-4 border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-3xl font-bold font-serif text-primary dark:text-white">
                Curriculum & Syllabus
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Explore the semester-wise course structure.</p>
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 mb-6 pb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
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

          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">
                    <th className="w-[60%] py-2.5 px-4 font-bold text-sm tracking-wider border-b border-gray-200 dark:border-gray-700">Course Name</th>
                    <th className="w-[25%] py-2.5 px-4 font-bold text-sm tracking-wider border-b border-gray-200 dark:border-gray-700 text-center whitespace-nowrap">Hours/Week(L-T-P)</th>
                    <th className="w-[15%] py-2.5 px-4 font-bold text-sm tracking-wider border-b border-gray-200 dark:border-gray-700 text-center">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {curriculum.find(c => c.semester === activeSemester)?.courses.map((course, idx) => (
                      <motion.tr
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        key={course.name}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors"
                      >
                        <td className="py-2.5 px-4 text-gray-800 dark:text-gray-200 font-medium">{course.name}</td>
                        <td className="py-2.5 px-4 text-center text-gray-700 dark:text-gray-300 font-bold">{course.hours}</td>
                        <td className="py-2.5 px-4 text-center text-accent-dark font-bold">{course.credits}</td>
                      </motion.tr>
                    )) || (
                      <tr>
                        <td colSpan="3" className="py-12 text-center text-gray-500 dark:text-gray-400 italic">
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
                        className="bg-green-50/80 dark:bg-green-900/20 border-t-2 border-green-200 dark:border-green-800"
                      >
                        <td className="py-2.5 px-4 text-right font-bold text-gray-800 dark:text-gray-200">
                          Total Credits
                        </td>
                        <td colSpan="2" className="py-2.5 px-4 text-center text-accent-dark font-black text-lg">
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

export default BtechEcePage;
