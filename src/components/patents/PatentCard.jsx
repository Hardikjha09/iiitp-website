import React from "react";
import PatentIllustration from "./PatentIllustration";
import {
  BrainCircuit,
  Network,
  Leaf,
  FileText,
  Users,
  Building2,
  Globe,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const PatentCard = ({ patent }) => {
  const getIcon = () => {
    switch (patent.status) {
      case "Granted":
        return <BrainCircuit size={42} className="text-blue-600" />;
      case "Published":
        return <Network size={42} className="text-blue-600" />;
      default:
        return <Leaf size={42} className="text-green-600" />;
    }
  };

  const badgeColor = () => {
    switch (patent.status) {
      case "Granted":
        return "bg-green-100 text-green-700";
      case "Published":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="
        group
        bg-white
        dark:bg-slate-900
        rounded-3xl
        border
        border-gray-200
        dark:border-slate-700
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
        overflow-hidden
    ">

      {/* Header */}
            <div className="relative p-6">

            {/* Status Badge */}
            <div className="absolute top-6 right-6">
                <span
                className={`px-4 py-1 rounded-full text-xs font-semibold ${badgeColor()}`}
                >
                {patent.status}
                </span>
            </div>

  {/* Illustration */}
  <PatentIllustration type={patent.status} />

</div>

      {/* Title */}
      <div className="px-6">

        <h3 className="text-2xl font-bold text-slate-800 dark:text-white leading-9 min-h-[90px]">
          {patent.title}
        </h3>

      </div>

      <div className="mx-6 my-5 border-b"></div>

      {/* Details */}

      <div className="px-6 space-y-5 text-[15px] text-slate-700 dark:text-slate-300">

        <div className="flex items-center gap-3">
          <FileText size={18} className="text-blue-600" />
          <span>
            <strong>Patent No:</strong> {patent.patentNumber}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <Users size={18} className="text-blue-600 mt-1" />
          <span>
            <strong>Inventors:</strong>
            <br />
            {patent.inventors.join(", ")}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-blue-600" />
          <span>{patent.department}</span>
        </div>

        <div className="flex items-center gap-3">
          <Globe size={18} className="text-blue-600" />
          <span>{patent.country}</span>
        </div>

      </div>

      <div className="mx-6 my-5 border-b"></div>

      {/* Dates */}

      <div className="grid grid-cols-2 gap-6 px-6">

        <div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CalendarDays size={16} />
            Published
          </div>

          <p className="mt-1 font-semibold">
            {patent.publishedDate}
          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CalendarDays size={16} />
            Grant Date
          </div>

          <p className="mt-1 font-semibold">
            {patent.grantDate}
          </p>

        </div>

      </div>

      {/* Button */}

      <div className="p-4">

        <button
            className="
            w-full
            rounded-xl
            border-2
            border-[#0F4C81]
            py-3
            font-semibold
            text-[#0F4C81]
            flex
            justify-center
            items-center
            gap-2
            group-hover:bg-[#0F4C81]
            group-hover:text-white
            transition-all
            duration-300
            ">
          View Details

          <ArrowRight size={18} />

        </button>

      </div>

    </div>
  );
};

export default PatentCard;