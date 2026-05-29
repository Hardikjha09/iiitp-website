import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Search, Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Social Icons
const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("darkMode") === "true" ||
        (!("darkMode" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDark]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdowns({});
  }, [location.pathname]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const toggleDropdown = (name, e) => {
    e.preventDefault();
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Text size control
  const handleTextSize = (action) => {
    const root = document.documentElement;
    const current = parseFloat(getComputedStyle(root).fontSize);
    if (action === "increase") root.style.fontSize = Math.min(current + 1, 20) + "px";
    else if (action === "decrease") root.style.fontSize = Math.max(current - 1, 14) + "px";
    else root.style.fontSize = "16px";
  };

  const primaryLinks = [
    {
      name: "About Us",
      path: "#",
      hasDropdown: true,
      subLinks: [
        {
          name: "ACT(PPP)",
          path: "#",
          hasDropdown: true,
          subLinks: [
            { name: "Act", path: "/documents/IIIT_PPP_Act.pdf", isExternal: true },
            { name: "Amendment Act", path: "/documents/iiit_ppp_amendment_act.pdf", isExternal: true },
          ],
        },
        {
          name: "STATUTE",
          path: "#",
          hasDropdown: true,
          subLinks: [
            { name: "STATUTE", path: "/documents/IIIT_Pune_Statute_2017 22.10.2018.pdf", isExternal: true },
            { name: "statute(amendment)", path: "/documents/ammendment.pdf", isExternal: true },
          ],
        },
        { name: "Vision & Mission", path: "/about/vision-mission" },
        { name: "Director Desk", path: "/about/director-desk" },
        { name: "Student Achievements", path: "/about/student-achievements" },
        { name: "Faculty Achievements", path: "/about/faculty-achievements" },
        { name: "Overview", path: "/documents/INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, PUNE20240315-_0.pdf", isExternal: true },
        { name: "ARIIA Ranking", path: "/documents/ARI-U-0804-1-3.pdf", isExternal: true },
        { name: "NIRF", path: "/nirf" },
      ]
    },
    { name: "Administration", path: "/administration", hasDropdown: false },
    {
      name: "Academics",
      path: "#",
      hasDropdown: true,
      subLinks: [
        { name: "Academic Calendar", path: "/academics/Calendar" },
        {
          name: "B.Tech.",
          hasDropdown: true,
          subLinks: [
            { name: "Computer Science and Engineering", path: "/academics/btech/cse" },
            { name: "Electronics and Communication Engineering", path: "/academics/btech/ece" },
            { name: "B.Tech. Honours", path: "/academics/btech/honors" },
          ]
        },
        {
          name: "M.Tech.",
          hasDropdown: true,
          subLinks: [
            { name: "Computer Science and Engineering", path: "/academics/mtech/cse" },
            { name: "Electronics and Communication Engineering", path: "/academics/mtech/ece" },
          ]
        },
        { name: "Ph.D.", path: "/academics/phd" },
        { name: "Fee Structure", path: "/docs/Fee_Structure_2025-26.pdf", isExternal: true },
        { name: "Ordinance", path: "/academics/ordinance" },
        {
          name: "Library",
          hasDropdown: true,
          subLinks: [
            { name: "Library Website", path: "https://sites.google.com/iiitp.ac.in/library", isExternal: true },
            { name: "IRINS", path: "https://iiitp.irins.org/", isExternal: true },
            { name: "IDP", path: "https://idp.iiitp.ac.in/", isExternal: true },
          ]
        },
      ],
    },
    {
      name: "Research",
      path: "#",
      hasDropdown: true,
      subLinks: [
        { name: "Centres", path: "/research/centres" },
        { name: "Internship @IIIT Pune", path: "/research/internships" },
        { name: "Library", path: "https://sites.google.com/iiitp.ac.in/library", isExternal: true },
        {
          name: "Funded Projects",
          hasDropdown: true,
          subLinks: [
            { name: "Funded Project (Completed)", path: "/research/funded-projects/completed" },
            { name: "Funded Project (Ongoing)", path: "/research/funded-projects/ongoing" }
          ]
        },
        { name: "Events", path: "/research/events" },
        {
          name: "Research Scholar",
          hasDropdown: true,
          subLinks: [
            { name: "Institute Scheme", path: "/research/scholar/institute" },
            { name: "Visvesvaraya Scheme", path: "/research/scholar/visvesvaraya" },
            { name: "Graduated PhD Students", path: "/research/scholar/graduated" }
          ]
        },
        { name: "PostDoc Fellow", path: "/research/postdoc-fellow" },
      ]
    },
    {
      name: "People",
      path: "#",
      hasDropdown: true,
      subLinks: [
        { name: "Faculty", path: "/people/faculty" },
        { name: "Visiting Faculty", path: "/people/visiting-faculty" },
        { name: "Non-Teaching Staff", path: "/people/non-teaching-staff" },
        { name: "Alumni", path: "/people/alumni" },
      ],
    },
    {
      name: "Life@IIITP",
      path: "/life",
      hasDropdown: true,
      subLinks: [
        { name: "Overview", path: "/life" },
        { name: "ACM Chapter", path: "/#" },
      ]
    },
    { name: "Notice", path: "/notice", hasDropdown: false },
    { name: "Careers", path: "/careers", hasDropdown: false },
    { name: "Placement", path: "/placement", hasDropdown: false },
    { name: "Contact Us", path: "/contact", hasDropdown: false },
    { 
      name: "E-TENDER", 
      path: "#", 
      hasDropdown: true,
      subLinks: [
        { name: "Live E-Tender", path: "/e-tender/live" },
        { name: "Archive E-Tender", path: "/e-tender/archive" },
        { name: "Awarded Tender", path: "https://www.iiitp.ac.in/sites/default/files/2026-04/Awarde%20Tender.pdf", isExternal: true },
      ]
    },
  ];

  const secondaryLinks = [
    // { name: "Fees", path: "/fees" },
    // { name: "NIRF", path: "/nirf" },
    // { name: "Report and Minutes", path: "/#" },
    // { name: "RTI", path: "/#" },
    // { name: "Sports & Gymnasium", path: "/#" },
    // { name: "Suo-Motu Disclosure", path: "/#" },
    // { name: "राजभाषा अनुभाग", path: "/#" },
    // { name: "ACM Chapter", path: "/#" },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative py-2 px-3 text-sm font-medium transition-colors duration-200 group flex items-center ${isActive ? "text-brand-red dark:text-brand-red-dark" : "text-white hover:text-brand-red dark:text-gray-200 dark:hover:text-brand-red-dark"
    }`;

  const navLinkUnderline = ({ isActive }) => (
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-red dark:bg-brand-red-dark transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
    />
  );

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-primary dark:bg-surface-dark transition-colors duration-200">
      {/* Row 1: Logo + Name + Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-blue-800/50 dark:border-gray-800">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo + Name */}
          <Link to="/" className="flex items-start space-x-3">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center shrink-0">
              <img src="/iiitp-logo.png" alt="IIIT Pune Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-white dark:text-text-dark leading-tight">
              <h1 className="text-xl md:text-2xl font-bold font-serif">
                Indian Institute of Information Technology Pune
              </h1>
              <h2 className="text-sm md:text-2xl font-medium opacity-90 font-serif mt-1">
                भारतीय सूचना प्रौद्योगिकी संस्थान, पुणे
              </h2>
              <p className="text-[10px] md:text-sm opacity-80 mt-1">(An Institute of National Importance)</p>
              <p className="text-[8px] md:text-xs opacity-70 mt-0.5">
                Gat No. 5 &amp; 6, Village Nanoli-Tathawade, Tal. Maval, Pune - 412106
              </p>
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex flex-col items-end gap-3">
            {/* Top Row: Dark mode + Language + Text Size + Mobile menu */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-1.5 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                aria-label="Toggle dark mode"
                title={isDark ? "Light Mode" : "Dark Mode"}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <div className="hidden md:block h-5 w-px bg-blue-700 dark:bg-gray-600" />

              {/* Language Selector */}
              <div className="hidden md:flex items-center bg-blue-900/40 dark:bg-gray-800/40 rounded-lg px-1.5 py-1 gap-0.5">
                <button
                  className="px-1.5 py-0.5 rounded font-medium text-xs text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
                  title="English"
                >
                  EN
                </button>
                <span className="text-gray-400 dark:text-gray-500 text-xs font-light">|</span>
                <button
                  className="px-1.5 py-0.5 rounded font-medium text-xs text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
                  title="Hindi"
                >
                  हिं
                </button>
              </div>

              <div className="hidden md:block h-5 w-px bg-blue-700 dark:bg-gray-600" />

              {/* Text Size */}
              <div className="hidden md:flex items-center bg-blue-900/40 dark:bg-gray-800/40 rounded-lg px-1.5 py-1 gap-0.5">
                <button
                  onClick={() => handleTextSize("decrease")}
                  className="px-1.5 py-0.5 rounded text-xs font-light text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors leading-none"
                  title="Decrease Text Size"
                >
                  A-
                </button>
                <button
                  onClick={() => handleTextSize("reset")}
                  className="px-1.5 py-0.5 rounded text-xs font-medium text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors leading-none"
                  title="Default Text Size"
                >
                  A
                </button>
                <button
                  onClick={() => handleTextSize("increase")}
                  className="px-1.5 py-0.5 rounded text-sm font-bold text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors leading-none"
                  title="Increase Text Size"
                >
                  A+
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center p-1.5 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Bottom Row: Social Icons + Search (Desktop only) */}
            <div className="hidden md:flex items-center gap-1.5">
              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/iiitpune"
                  aria-label="Facebook"
                  className="opacity-80 hover:opacity-100 transition-opacity p-1.5"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href="https://x.com/IIIT_PUNE"
                  aria-label="Twitter"
                  className="opacity-80 hover:opacity-100 transition-opacity p-1.5"
                >
                  <TwitterIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/school/iiitpune/posts/?feedView=all"
                  aria-label="LinkedIn"
                  className="opacity-80 hover:opacity-100 transition-opacity p-1.5"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>

              <div className="h-5 w-px bg-blue-700 dark:bg-gray-600" />

              {/* Search */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center justify-center p-2 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                aria-label="Search"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 160, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && console.log("Search:", searchQuery)}
                    autoFocus
                    className="h-8 px-3 py-2 rounded-lg bg-blue-900/30 dark:bg-gray-800/50 text-white placeholder-gray-400 dark:placeholder-gray-500 border border-blue-700 dark:border-gray-700 focus:border-accent-dark focus:outline-none text-sm overflow-hidden"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Primary Nav Links (Desktop) */}
      <nav className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center py-2 gap-x-2 gap-y-1">
          {primaryLinks.map((link) => (
            <div key={link.name} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) => {
                  const isLinkActive = link.path === "#"
                    ? (link.name === "About Us" && location.pathname.startsWith("/about")) || (link.name === "Academics" && location.pathname.startsWith("/academics"))
                    : isActive;
                  return navLinkClass({ isActive: isLinkActive });
                }}
                onClick={link.path === "#" ? (e) => e.preventDefault() : undefined}
              >
                {({ isActive }) => {
                  const activeState = link.path === "#"
                    ? (link.name === "About Us" && location.pathname.startsWith("/about")) || (link.name === "Academics" && location.pathname.startsWith("/academics"))
                    : isActive;
                  return (
                    <>
                      {link.name}
                      {link.hasDropdown && (
                        <ChevronDown className="w-4 h-4 ml-1 opacity-70 transition-transform group-hover:rotate-180" />
                      )}
                      {navLinkUnderline({ isActive: activeState })}
                    </>
                  );
                }}
              </NavLink>
              {link.hasDropdown && link.subLinks && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white dark:bg-surface-dark rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 dark:border-gray-800 flex flex-col z-50">
                  {link.subLinks.map((sub) => (
                    <div key={sub.name} className="relative group/sub">
                      {sub.hasDropdown ? (
                        <>
                          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 hover:text-brand-red dark:hover:text-brand-red-dark cursor-pointer flex justify-between items-center transition-colors">
                            {sub.name}
                            <ChevronDown className="w-3 h-3 -rotate-90 opacity-70" />
                          </div>
                          <div className="absolute top-0 left-full ml-0 w-48 bg-white dark:bg-surface-dark rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 border border-gray-100 dark:border-gray-800 flex flex-col z-50">
                            {sub.subLinks.map((nested) =>
                              nested.isExternal ? (
                                <a
                                  key={nested.name}
                                  href={nested.path}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 hover:text-brand-red dark:hover:text-brand-red-dark first:rounded-t-md last:rounded-b-md transition-colors text-left"
                                >
                                  {nested.name}
                                </a>
                              ) : (
                                <Link
                                  key={nested.name}
                                  to={nested.path}
                                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 hover:text-brand-red dark:hover:text-brand-red-dark first:rounded-t-md last:rounded-b-md transition-colors text-left"
                                >
                                  {nested.name}
                                </Link>
                              ),
                            )}
                          </div>
                        </>
                      ) : sub.isExternal ? (
                        <a
                          href={sub.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors text-left"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link
                          to={sub.path}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-brand-red/10 dark:hover:bg-brand-red-dark/10 hover:text-brand-red dark:hover:text-brand-red-dark transition-colors text-left"
                        >
                          {sub.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-primary dark:bg-surface-dark border-t border-blue-800/50 dark:border-gray-800 shadow-xl"
          >
            <div className="px-4 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Mobile Search */}
              <div className="flex items-center gap-2 px-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && console.log("Search:", searchQuery)}
                  className="flex-1 h-8 px-3 py-2 rounded-lg bg-blue-900/30 dark:bg-gray-800/50 text-white placeholder-gray-400 border border-blue-700 dark:border-gray-700 focus:border-accent-dark focus:outline-none text-sm"
                />
                <Search className="w-4 h-4 text-white opacity-70" />
              </div>

              {/* Mobile Social + Language + Text Size */}
              <div className="flex items-center gap-4 px-3">
                <a
                  href="https://www.facebook.com/iiitpune"
                  aria-label="Facebook"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href="https://x.com/IIIT_PUNE"
                  aria-label="Twitter"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <TwitterIcon size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/school/iiitpune/posts/?feedView=all"
                  aria-label="LinkedIn"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <LinkedinIcon size={20} />
                </a>
                <div className="ml-auto flex items-center bg-blue-900/40 dark:bg-gray-800/40 rounded-lg px-1.5 py-1 gap-0.5">
                  <button className="px-1.5 py-0.5 rounded text-xs text-white hover:bg-blue-700 transition-colors">
                    EN
                  </button>
                  <span className="text-gray-400 text-xs">|</span>
                  <button className="px-1.5 py-0.5 rounded text-xs text-white hover:bg-blue-700 transition-colors">
                    हिं
                  </button>
                </div>
                <div className="flex items-center bg-blue-900/40 dark:bg-gray-800/40 rounded-lg px-1.5 py-1 gap-0.5">
                  <button
                    onClick={() => handleTextSize("decrease")}
                    className="px-1 py-0.5 rounded text-xs text-white hover:bg-blue-700 transition-colors"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => handleTextSize("reset")}
                    className="px-1 py-0.5 rounded text-xs text-white hover:bg-blue-700 transition-colors"
                  >
                    A
                  </button>
                  <button
                    onClick={() => handleTextSize("increase")}
                    className="px-1 py-0.5 rounded text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* Primary Links */}
              <div>
                <h3 className="text-blue-300 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 px-3">
                  Primary Links
                </h3>
                <div className="flex flex-col space-y-1">
                  {primaryLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <NavLink
                          to={link.path}
                          onClick={(e) => {
                            if (link.path === "#") {
                              e.preventDefault();
                              toggleDropdown(link.name, e);
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={({ isActive }) => {
                            const activeState = link.path === "#"
                              ? (link.name === "About Us" && location.pathname.startsWith("/about")) || (link.name === "Academics" && location.pathname.startsWith("/academics"))
                              : isActive;
                            return `flex-1 px-3 py-2 rounded-md text-base font-medium transition-colors ${activeState
                              ? "bg-brand-red text-white dark:bg-brand-red-dark/50"
                              : "text-white hover:bg-brand-red/50 dark:text-gray-300 dark:hover:bg-brand-red-dark/30"
                              }`;
                          }}
                        >
                          {link.name}
                        </NavLink>
                        {link.hasDropdown && (
                          <button
                            onClick={(e) => toggleDropdown(link.name, e)}
                            className="p-2 text-white hover:bg-blue-800/50 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-md"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${openDropdowns[link.name] ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {link.hasDropdown && link.subLinks && openDropdowns[link.name] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col pl-6 space-y-1 mt-1 overflow-hidden"
                          >
                            {link.subLinks.map((sub) => (
                              <div key={sub.name} className="flex flex-col">
                                {sub.hasDropdown ? (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1 px-3 py-2 text-sm font-medium text-gray-300">
                                        {sub.name}
                                      </div>
                                      <button
                                        onClick={(e) => toggleDropdown(sub.name, e)}
                                        className="p-2 text-white hover:bg-blue-800/50 rounded-md"
                                      >
                                        <ChevronDown
                                          className={`w-4 h-4 transition-transform ${openDropdowns[sub.name] ? "rotate-180" : ""}`}
                                        />
                                      </button>
                                    </div>
                                    <AnimatePresence>
                                      {openDropdowns[sub.name] && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="flex flex-col pl-4 space-y-1 mt-1 overflow-hidden"
                                        >
                                          {sub.subLinks.map((nested) =>
                                            nested.isExternal ? (
                                              <a
                                                key={nested.name}
                                                href={nested.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-300 hover:text-brand-red hover:bg-brand-red/10 dark:text-gray-400 dark:hover:text-brand-red-dark dark:hover:bg-brand-red-dark/10"
                                              >
                                                {nested.name}
                                              </a>
                                            ) : (
                                              <NavLink
                                                key={nested.name}
                                                to={nested.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={({ isActive }) =>
                                                  `block px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                                    ? "text-accent-dark bg-blue-900/30 dark:bg-gray-800"
                                                    : "text-gray-300 hover:text-brand-red hover:bg-brand-red/10 dark:text-gray-400 dark:hover:text-brand-red-dark dark:hover:bg-brand-red-dark/10"
                                                  }`
                                                }
                                              >
                                                {nested.name}
                                              </NavLink>
                                            ),
                                          )}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                ) : sub.isExternal ? (
                                  <a
                                    href={sub.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-300 hover:text-brand-red hover:bg-brand-red/10 dark:text-gray-400 dark:hover:text-brand-red-dark dark:hover:bg-brand-red-dark/10"
                                  >
                                    {sub.name}
                                  </a>
                                ) : (
                                  <NavLink
                                    to={sub.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `block px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? "text-accent-dark bg-blue-900/30 dark:bg-gray-800"
                                        : "text-gray-300 hover:text-brand-red hover:bg-brand-red/10 dark:text-gray-400 dark:hover:text-brand-red-dark dark:hover:bg-brand-red-dark/10"
                                      }`
                                    }
                                  >
                                    {sub.name}
                                  </NavLink>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
