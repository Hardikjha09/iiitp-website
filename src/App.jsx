import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/shared/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoadingFallback from "./components/shared/LoadingFallback";

// Pages (Lazy Loaded for performance)
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const DirectorDeskPage = lazy(() => import("./pages/DirectorDeskPage"));
const VisionMissionPage = lazy(() => import("./pages/VisionMissionPage"));
const AboutPlaceholderPage = lazy(() => import("./pages/AboutPlaceholderPage"));
const AdministrationPage = lazy(() => import("./pages/AdministrationPage"));
const ChairpersonPage = lazy(() => import("./pages/ChairpersonPage"));
const RegistrarPage = lazy(() => import("./pages/RegistrarPage"));
const BoardOfGovernorsPage = lazy(() => import("./pages/BoardOfGovernorsPage"));
const FinanceCommitteePage = lazy(() => import("./pages/FinanceCommitteePage"));
const BuildingWorksCommitteePage = lazy(() => import("./pages/BuildingWorksCommitteePage"));
const SenatePage = lazy(() => import("./pages/SenatePage"));
const BoardOfStudiesCsePage = lazy(() => import("./pages/BoardOfStudiesCsePage"));
const BoardOfStudiesEcePage = lazy(() => import("./pages/BoardOfStudiesEcePage"));
const BoardOfStudiesAshPage = lazy(() => import("./pages/BoardOfStudiesAshPage"));
const BtechCsePage = lazy(() => import("./pages/BtechCsePage"));
const BtechEcePage = lazy(() => import("./pages/BtechEcePage"));
const BtechHonorsPage = lazy(() => import("./pages/BtechHonorsPage"));
const MtechCsePage = lazy(() => import("./pages/MtechCsePage"));
const MtechEcePage = lazy(() => import("./pages/MtechEcePage"));
const PhdPage = lazy(() => import("./pages/PhdPage"));
const AcademicCalendarPage = lazy(() => import("./pages/AcademicCalendarPage"));
const OrdinancePage = lazy(() => import("./pages/OrdinancePage"));
const CentresPage = lazy(() => import("./pages/CentresPage"));
const InternshipsPage = lazy(() => import("./pages/InternshipsPage"));
const FundedProjectsCompletedPage = lazy(() => import("./pages/FundedProjectsCompletedPage"));
const FundedProjectsOngoingPage = lazy(() => import("./pages/FundedProjectsOngoingPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const PostDocFellowPage = lazy(() => import("./pages/PostDocFellowPage"));
const ResearchScholarInstitutePage = lazy(() => import("./pages/ResearchScholarInstitutePage"));
const ResearchScholarVisvesvarayaPage = lazy(() => import("./pages/ResearchScholarVisvesvarayaPage"));
const ResearchScholarGraduatedPage = lazy(() => import("./pages/ResearchScholarGraduatedPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const PeoplePage = lazy(() => import("./pages/PeoplePage"));
const FacultyPage = lazy(() => import("./pages/FacultyPage"));
const FacultyProfilePage = lazy(() => import("./pages/FacultyProfilePage"));
const VisitingFacultyPage = lazy(() => import("./pages/VisitingFacultyPage"));
const NonTeachingStaffPage = lazy(() => import("./pages/NonTeachingStaffPage"));
const AlumniPage = lazy(() => import("./pages/AlumniPage"));
const LifePage = lazy(() => import("./pages/LifePage"));
const NoticePage = lazy(() => import("./pages/NoticePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const AntiRaggingPage = lazy(() => import("./pages/AntiRaggingPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const ETenderPage = lazy(() => import("./pages/ETenderPage"));
const PlacementPage = lazy(() => import("./pages/PlacementPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NIRFPage = lazy(() => import("./pages/NIRFPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const StudentAchievementsPage = lazy(() => import('./pages/StudentAchievementsPage'));
const FacultyAchievementsPage = lazy(() => import('./pages/FacultyAchievementsPage'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-bg dark:bg-bg-dark transition-colors duration-200">
        <Navbar />
        <main className="flex-grow w-full overflow-x-hidden flex flex-col">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              
              {/* About */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/director-desk" element={<DirectorDeskPage />} />
              <Route path="/about/vision-mission" element={<VisionMissionPage />} />
              <Route path="/about/student-achievements" element={<StudentAchievementsPage />} />
              <Route path="/about/faculty-achievements" element={<FacultyAchievementsPage />} />
              <Route path="/about/act" element={<AboutPlaceholderPage title="ACT(PPP)" />} />
              <Route path="/about/statute" element={<AboutPlaceholderPage title="STATUTE" />} />
              <Route path="/about/overview" element={<AboutPlaceholderPage title="Overview" />} />
              <Route path="/about/ariia" element={<AboutPlaceholderPage title="ARIIA Ranking" />} />
              
              {/* Administration */}
              <Route path="/administration" element={<AdministrationPage />} />
              <Route path="/administration/chairperson" element={<ChairpersonPage />} />
              <Route path="/administration/registrar" element={<RegistrarPage />} />
              <Route path="/administration/board-of-governors" element={<BoardOfGovernorsPage />} />
              <Route path="/administration/finance-committee" element={<FinanceCommitteePage />} />
              <Route path="/administration/building-and-works-committee" element={<BuildingWorksCommitteePage />} />
              <Route path="/administration/senate" element={<SenatePage />} />
              <Route path="/administration/board-of-studies-cse" element={<BoardOfStudiesCsePage />} />
              <Route path="/administration/board-of-studies-ece" element={<BoardOfStudiesEcePage />} />
              <Route path="/administration/board-of-studies-ash" element={<BoardOfStudiesAshPage />} />
              
              {/* Academics */}
              <Route path="/academics/btech/cse" element={<BtechCsePage />} />
              <Route path="/academics/btech/ece" element={<BtechEcePage />} />
              <Route path="/academics/btech/honors" element={<BtechHonorsPage />} />
              <Route path="/academics/mtech/cse" element={<MtechCsePage />} />
              <Route path="/academics/mtech/ece" element={<MtechEcePage />} />
              <Route path="/academics/phd" element={<PhdPage />} />
              <Route path="/academics/calendar" element={<AcademicCalendarPage />} />
              <Route path="/academics/Calendar" element={<AcademicCalendarPage />} />
              <Route path="/academics/ordinance" element={<OrdinancePage />} />
              
              {/* Research */}
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/research/centres" element={<CentresPage />} />
              <Route path="/research/internships" element={<InternshipsPage />} />
              <Route path="/research/funded-projects/completed" element={<FundedProjectsCompletedPage />} />
              <Route path="/research/funded-projects/ongoing" element={<FundedProjectsOngoingPage />} />
              <Route path="/research/events" element={<EventsPage />} />
              <Route path="/research/scholar/institute" element={<ResearchScholarInstitutePage />} />
              <Route path="/research/scholar/visvesvaraya" element={<ResearchScholarVisvesvarayaPage />} />
              <Route path="/research/scholar/graduated" element={<ResearchScholarGraduatedPage />} />
              <Route path="/research/postdoc-fellow" element={<PostDocFellowPage />} />
              
              {/* People */}
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/people/faculty" element={<FacultyPage />} />
              <Route path="/people/faculty/:slug" element={<FacultyProfilePage />} />
              <Route path="/people/visiting-faculty" element={<VisitingFacultyPage />} />
              <Route path="/people/non-teaching-staff" element={<NonTeachingStaffPage />} />
              <Route path="/people/alumni" element={<AlumniPage />} />
              
              {/* Other Pages */}
              <Route path="/life" element={<LifePage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/notice/anti-ragging" element={<AntiRaggingPage />} />
              <Route path="/notice/late-fee" element={<AboutPlaceholderPage title="Late Fee for the even semester" />} />
              <Route path="/careers" element={<CareersPage />} />
              
              {/* E-Tenders */}
              <Route path="/e-tender" element={<Navigate to="/e-tender/live" replace />} />
              <Route path="/e-tender/:type" element={<ETenderPage />} />
              
              <Route path="/placement" element={<PlacementPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/nirf" element={<NIRFPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
