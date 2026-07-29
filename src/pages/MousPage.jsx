import React, { useEffect, useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import YearAccordion from "../components/mou/YearAccordion";
import GalleryModal from "../components/mou/GalleryModal";
import mousData from "../data/mous.json";

const MousPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Gallery State
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryTitle, setGalleryTitle] = useState("");

  // Open Gallery
  const openGallery = (mou) => {
    setGalleryImages(mou.gallery || []);
    setGalleryTitle(mou.organization);
    setGalleryOpen(true);
  };

  // Group by Year
  const groupedData = mousData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }

    acc[item.year].push(item);

    return acc;
  }, {});

  const years = Object.keys(groupedData).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

      <PageHeader title="MOUs" />

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* Intro */}

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-10">

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Memorandum of Understanding (MOUs)
          </h2>

          <div className="w-24 h-1 bg-blue-600 mt-3 rounded-full"></div>

          <p className="mt-6 text-gray-600 dark:text-gray-300 leading-8">
            The Institute has established Memorandums of Understanding
            (MOUs) with leading industries, universities and research
            organizations to promote academic collaboration,
            internships, faculty exchange, research activities,
            innovation and skill development.
          </p>

        </div>

        {/* Accordions */}

        <div className="space-y-6">

          {years.map((year, index) => (
            <YearAccordion
              key={year}
              year={year}
              data={groupedData[year]}
              onOpenGallery={openGallery}
              defaultOpen={index === 0}
            />
          ))}

        </div>

      </div>

      {/* Gallery */}

      <GalleryModal
        isOpen={galleryOpen}
        images={galleryImages}
        title={galleryTitle}
        onClose={() => setGalleryOpen(false)}
      />

    </div>
  );
};

export default MousPage;