import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/shared/PageHeader';

// ---------------------------------------------------------------------------
// Data – mirrors the galleries object in campusnew.html
// ---------------------------------------------------------------------------
const FACILITY_CARDS = [
  {
    id: 'academic',
    title: 'Academic Building',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/inline-images/DSC06517%20%281%29%20%281%29_0.jpg',
    description:
      'The campus features a state-of-the-art Academic Building equipped with smart classrooms, advanced laboratories, collaborative learning spaces, and facilities. Classrooms are equipped with projectors, audio-visual systems, and digital learning tools to enhance the teaching-learning experience.',
    galleryTitle: 'Academic Building',
    galleryDescription:
      "IIIT Pune's Academic Building houses smart classrooms, laboratories, seminar halls, innovation spaces, and collaborative learning environments.",
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/entrence.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/side%20angle%20pic.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/CL.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/electrical%20lab%20.jpg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/confrence%20room.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/IMG_2760.JPG',
    ],
  },
  {
    id: 'library',
    title: 'Library & Auditorium',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/2026-06/induction%202026.jpg',
    description:
      'Students also have access to a well-stocked library with ample reading and study space. The building also houses seminar halls and a spacious auditorium that facilitates technical learning, workshops, conferences, cultural events, and industry interactions, contributing to the holistic development of students.',
    galleryTitle: 'Library & Auditorium',
    galleryDescription:
      'The library and auditorium provide extensive academic resources, seminar spaces, workshops, conferences, and cultural event facilities.',
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/induction%202026.jpg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/IMG_2553.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/DSC06493.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/DSC_9960.NEF_.jpg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/_THC2635.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/IMG_2760.JPG',
    ],
  },
  {
    id: 'hostel',
    title: 'Hostel Facilities',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/2026-06/boys%20hostel.jpeg',
    description:
      'IIIT Pune offers comfortable and secure hostel facilities for both boys and girls, fostering a vibrant residential community that encourages collaboration, cultural exchange, and lifelong friendships.',
    galleryTitle: 'Hostel Facilities',
    galleryDescription:
      'Comfortable and secure accommodation with modern amenities and vibrant student life.',
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/boys%20hostel.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/girls%20hostel.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/hostel%20pics.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/GH.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/bh2.JPG',
    ],
  },
  {
    id: 'dining',
    title: 'Dining Facilities',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/2026-06/mess%20pic2.jpeg',
    description:
      'The institute provides spacious dining facilities through two independent messes on campus, serving nutritious and hygienically prepared meals. High standards of cleanliness, food safety, and quality ensure a comfortable and healthy dining experience for students.',
    galleryTitle: 'Dining Facilities',
    galleryDescription:
      'Clean and hygienic dining halls serving nutritious meals for students.',
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/mess.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/mess.JPG',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/mess%20pic2.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/pic%20mess.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/mess01.jpeg',
    ],
  },
  {
    id: 'sports',
    title: 'Sports & Fitness Centre',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/2026-06/gym%20pic_0.jpeg',
    description:
      'IIIT Pune provides dedicated gym facilities for both boys and girls, encouraging students to maintain an active and healthy lifestyle. The campus also features well-maintained sports grounds and a dedicated coaching and training instructor for sports and yoga. Equipped with modern fitness equipment, these spaces promote physical well-being, discipline, teamwork, and a balanced lifestyle.',
    galleryTitle: 'Sports & Fitness Centre',
    galleryDescription:
      'Gymnasiums, sports grounds, and wellness facilities promoting an active lifestyle.',
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/boys%20g.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/gym%20pic_0.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/girls%20gym.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/tt.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/running.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/carom.jpeg',
    ],
  },
  {
    id: 'medical',
    title: 'Medical Facility',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/2026-06/medical%20room.jpeg',
    description:
      'IIIT Pune provides an on-campus medical room to address the immediate healthcare needs of students and staff. The institute also has tie-ups with reputed hospitals to ensure timely access to professional medical consultation and emergency care.',
    galleryTitle: 'Medical Facility',
    galleryDescription:
      'On-campus medical support with access to healthcare professionals and emergency services.',
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/medical%20room.jpeg',
    ],
  },
  {
    id: 'transport',
    title: 'Transportation Services',
    coverImage: 'https://www.iiitp.ac.in/sites/default/files/2026-06/bus.jpeg',
    description:
      'The Institute provides a dedicated bus service operating multiple times throughout the week between IIIT Pune and Talegaon Railway Station, ensuring convenient connectivity for students and staff. In addition, the PMPML bus service connecting IIIT Pune to Nigdi Bus Stand via Talegaon Railway Station offers a reliable and accessible public transportation option for daily commuting.',
    galleryTitle: 'Transportation Services',
    galleryDescription:
      'Bus connectivity between the campus and nearby transportation hubs.',
    images: [
      'https://www.iiitp.ac.in/sites/default/files/2026-06/bus%20pics%20.jpeg',
      'https://www.iiitp.ac.in/sites/default/files/2026-06/bus.jpeg',
    ],
  },
];

// ---------------------------------------------------------------------------
// Modal Gallery Component
// ---------------------------------------------------------------------------
const GalleryModal = ({ card, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + card.images.length) % card.images.length);
  }, [card.images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % card.images.length);
  }, [card.images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-5 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close gallery"
      >
        <X size={36} />
      </button>

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full" style={{ height: '55vh' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={card.images[currentIndex]}
              alt={`${card.galleryTitle} — photo ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {/* Prev / Next arrows */}
          {card.images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Counter */}
          {card.images.length > 1 && (
            <div className="absolute bottom-3 right-4 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {currentIndex + 1} / {card.images.length}
            </div>
          )}
        </div>

        {/* Dot indicators */}
        {card.images.length > 1 && (
          <div className="flex justify-center gap-1.5 py-3 bg-white dark:bg-surface-dark">
            {card.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-surface-dark">
          <h2 className="text-xl font-bold font-serif text-primary dark:text-white mb-2">
            {card.galleryTitle}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-350 leading-relaxed text-justify">
            {card.galleryDescription}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
const LifeCampusPage = () => {
  const [activeGallery, setActiveGallery] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openGallery = (card) => setActiveGallery(card);
  const closeGallery = () => setActiveGallery(null);

  return (
    <div className="min-h-screen transition-colors duration-200 pb-16">
      <PageHeader
        title="Campus Tour"
        subtitle="Explore the permanent campus of IIIT Pune at Nanoli, surrounded by the serene Sahyadri hill ranges"
        backgroundImage="/campus-image.jpg"
        compact={true}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Intro */}
        <section className="bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-primary dark:text-white">
            Tour of Our Permanent Campus
          </h2>
          <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm md:text-base">
            Established in 2016, IIIT Pune is located at Nanoli, Talegaon Dabhade in Pune district, Maharashtra, amidst the serene and picturesque Sahyadri hill ranges. The campus is surrounded by lush greenery, providing a tranquil and inspiring environment for academic pursuits. Designed with sustainability in mind, the institute promotes eco-friendly practices and maintains a clean, green, and student-centric atmosphere.
          </p>
          <p className="text-gray-650 dark:text-gray-350 leading-relaxed text-justify text-sm md:text-base">
            The campus is committed to ensuring student well-being through safe and hygienic dining facilities, nutritious food options, and initiatives that encourage healthy living. Modern infrastructure, state-of-the-art academic facilities, and ample open spaces create an ideal setting for learning, innovation, and personal growth.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs font-bold">
            <MapPin size={14} />
            <span>Gat No. 5 &amp; 6, Village Nanoli-Tathawade, Tal. Maval, Dist. Pune — 412106</span>
          </div>
        </section>

        {/* Gallery Grid */}
        <section>
          <h3 className="text-xl font-bold font-serif text-primary dark:text-white mb-6 text-center">
            Campus Facilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {FACILITY_CARDS.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                onClick={() => openGallery(card)}
                className="group bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl cursor-pointer flex flex-col h-full transition-shadow duration-300"
              >
                {/* Cover image */}
                <div className="relative overflow-hidden h-60">
                  <img
                    src={card.coverImage}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay badge: photo count */}
                  {card.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      {card.images.length} photos
                    </div>
                  )}
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-bold bg-primary/80 px-3 py-1 rounded-full">
                      Click to view gallery
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold font-serif text-primary dark:text-white mb-2 group-hover:text-brand-red dark:group-hover:text-accent transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify flex-grow">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Connectivity info */}
        {/* <section className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-white/10">
            <MapPin size={150} />
          </div>
          <h3 className="text-xl font-bold font-serif mb-6 relative z-10">Campus Connectivity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {[
              { emoji: '🛣️', label: 'Nearest Highway', value: 'Pune–Mumbai Expressway (NH-48)' },
              { emoji: '🚉', label: 'Nearest Railway', value: 'Talegaon Railway Station (~5 km)' },
              { emoji: '✈️', label: 'Nearest Airport', value: 'Pune International Airport (~40 km)' },
              { emoji: '🏙️', label: 'Major Hubs', value: 'Pune City (~35 km) | Pimpri Chinchwad (~20 km)' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-base">
                  {item.emoji}
                </div>
                <div>
                  <p className="text-xs font-bold text-white/90">{item.label}</p>
                  <p className="text-[11px] text-white/70 leading-snug mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeGallery && (
          <GalleryModal card={activeGallery} onClose={closeGallery} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LifeCampusPage;
