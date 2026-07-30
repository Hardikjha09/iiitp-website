import React, { useEffect, useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import PatentStats from "../components/patents/PatentStats";
import PatentFilters from "../components/patents/PatentFilters";
import PatentCard from "../components/patents/PatentCard";

const PatentsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
    
  //Patent Data
  const patents = [
    {
      id: 1,
      title: "AI-Based Energy Consumption Monitoring Device",
      patentNumber: "----",
      inventors: ["Dr. Mahendra Pratap Yadav"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "---",
      grantDate: "---",
      year: "2025",
    },
    {
      id: 2,
      title: "Blockchain-Based Medical Data Storage Cloud Device",
      patentNumber: "---",
      inventors: ["Dr. Mahendra Pratap Yadav"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "---",
      grantDate: "-",
      year: "2025",
    },
    {
      id: 3,
      title: "Mirror List Query Architecture of Multi Architecture Cloud Platform Mirror Warehouse",
      patentNumber: "---",
      inventors: ["Dr. Mahendra Pratap Yadav"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "-",
      grantDate: "-",
      year: "2022",
    },
    {
      id: 4,
      title: "Delay Tolerant Internet of Things Smart Wallet with Enhanced Features for Preventing Misuse",
      patentNumber: "202241027994",
      inventors: ["Dr. Sonam Morya"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "27-05-2022",
      grantDate: "-",
      year: "2022",
    },
    {
      id: 5,
      title: "Alarm System for the Same",
      patentNumber: "202241026708",
      inventors: ["Dr. Sonam Morya"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "20-05-2022",
      grantDate: "-",
      year: "2022",
    },
    {
      id: 6,
      title: "Board Game Based on Ramayana",
      patentNumber: "350861-001",
      inventors: ["Dr. Sonam Morya"],
      department: "Computer Science & Engineering",
      status: "Design Registered",
      country: "India",
      publishedDate: "07-10-2021",
      grantDate: "-",
      year: "2021",
    },
    {
      id: 7,
      title: "Board Game Based on Historical Indian",
      patentNumber: "350860-001",
      inventors: ["Dr. Sonam Morya"],
      department: "Computer Science & Engineering",
      status: "Design Registered",
      country: "India",
      publishedDate: "07-10-2021",
      grantDate: "-",
      year: "2021",
    },
    {
      id: 8,
      title: "Board Game Based on King",
      patentNumber: "350859-001",
      inventors: ["Dr. Sonam Morya"],
      department: "Computer Science & Engineering",
      status: "Design Registered",
      country: "India",
      publishedDate: "07-10-2021",
      grantDate: "-",
      year: "2021",
    },
  ];

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Filter Logic
  const filteredPatents = patents.filter((patent) => {
  const search = searchTerm.trim().toLowerCase();

  const matchesSearch =
    search === "" ||
    patent.title.toLowerCase().includes(search) ||
    patent.patentNumber?.toLowerCase().includes(search) ||
    patent.department?.toLowerCase().includes(search) ||
    patent.country?.toLowerCase().includes(search) ||
    patent.status?.toLowerCase().includes(search) ||
    patent.year?.toLowerCase().includes(search) ||
    patent.inventors.join(" ").toLowerCase().includes(search);

  const matchesYear =
    selectedYear === "" || patent.year === selectedYear;

  const matchesDepartment =
    selectedDepartment === "" ||
    patent.department === selectedDepartment;

  const matchesStatus =
    selectedStatus === "" ||
    patent.status === selectedStatus;

  return (
    matchesSearch &&
    matchesYear &&
    matchesDepartment &&
    matchesStatus
  );
});

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-200">
      <PageHeader title="Patents" />

      <div className="container mx-auto px-4 py-10">

        {/* Statistics */}
        <PatentStats patents={patents} />

        {/* Search & Filters */}
        <PatentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Patents Portfolio
              </h2>

              <p className="text-gray-500 mt-2">
                Discover innovative technologies developed by IIIT Pune.
              </p>

            </div>

            <div className="text-sm text-gray-500 bg-white rounded-full px-5 py-2 shadow-sm border">
              {filteredPatents.length} Patents
            </div>

          </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPatents.length > 0 ? (
            filteredPatents.map((patent) => (
              <PatentCard key={patent.id} patent={patent} />
            ))
          ) : (
            <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              No patents found for the selected filters.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PatentsPage;