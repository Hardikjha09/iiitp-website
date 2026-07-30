import React from "react";
import {
  BrainCircuit,
  Network,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const PatentIllustration = ({ type }) => {
  const renderIcon = () => {
    switch (type) {
      case "Granted":
        return <BrainCircuit size={54} strokeWidth={1.7} />;

      case "Published":
        return <Network size={54} strokeWidth={1.7} />;

      case "Filed":
        return <Leaf size={54} strokeWidth={1.7} />;

      default:
        return <ShieldCheck size={54} strokeWidth={1.7} />;
    }
  };

  return (
    <div className="relative w-28 h-28">

      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-blue-100 blur-xl opacity-70"></div>

      {/* Main Circle */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-200 shadow-md flex items-center justify-center">

        <div className="text-[#0F4C81]">
          {renderIcon()}
        </div>

      </div>

    </div>
  );
};

export default PatentIllustration;