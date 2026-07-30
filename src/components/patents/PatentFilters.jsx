import React from "react";
import { Search } from "lucide-react";

const PatentFilters = ({
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm p-4 mb-10">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">

        {/* Search */}
        <div className="relative xl:col-span-2">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search patent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 rounded-xl border border-gray-300 dark:border-slate-600 pl-12 pr-4 text-gray-700 dark:text-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]"
          />
        </div>

        {/* Year */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 dark:border-slate-600 px-4 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Year</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>

        {/* Department */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 dark:border-slate-600 px-4 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Department</option>
          <option value="Computer Science & Engineering">
            Computer Science
          </option>
          <option value="Electronics & Communication Engineering">
            Electronics
          </option>
          <option value="Applied Sciences">
            Applied Sciences
          </option>
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="h-11 rounded-xl border border-gray-300 dark:border-slate-600 px-4 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Status</option>
          <option value="Granted">Granted</option>
          <option value="Published">Published</option>
          <option value="Filed">Filed</option>
          <option value="Design Registered">Design Registered</option>
        </select>

      </div>
    </div>
  );
};

export default PatentFilters;