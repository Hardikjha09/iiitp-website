import React from "react";
//import CountUp from "react-countup";
import {
  FileCheck2,
  FolderOpen,
  FileSearch,
  BadgeCheck,
} from "lucide-react";

const PatentStats = ({ patents }) => {
  const totalPatents = patents.length;

  const filed = patents.filter(
    (patent) =>
      patent.status === "Filed" ||
      patent.status === "Design Registered"
  ).length;

  const published = patents.filter(
    (patent) => patent.status === "Published"
  ).length;

  const granted = patents.filter(
    (patent) => patent.status === "Granted"
  ).length;

  const stats = [
    {
      title: "Total Patents",
      value: totalPatents,
      subtitle: "All time",
      icon: FileCheck2,
    },
    {
      title: "Filed",
      value: filed,
      subtitle: "Applications filed",
      icon: FolderOpen,
    },
    {
      title: "Published",
      value: published,
      subtitle: "Published patents",
      icon: FileSearch,
    },
    {
      title: "Granted",
      value: granted,
      subtitle: "Patents granted",
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon
                  size={30}
                  className="text-[#0F4C81]"
                />
              </div>

              <div>
                <h4 className="text-base font-medium text-gray-700 dark:text-gray-300">
                  {item.title}
                </h4>

                <h2 className="text-4xl font-bold text-[#0F4C81]">
  {item.value}
</h2>

                <p className="text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PatentStats;