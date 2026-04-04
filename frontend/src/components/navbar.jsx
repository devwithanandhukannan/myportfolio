import React, { useState, useEffect, useRef } from "react";
import data from "../data/menu.json";
import portfolioData from "../data/portfolioData";
import { IoMenu, IoClose, IoSearch, IoMail, IoLogoGithub, IoLocation, IoBriefcase, IoSchool, IoCode, IoRocket } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavbar } from "../context/NavbarContext";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const { setIsBlurred } = useNavbar();

  // Scroll effect (Sticky when scrolling up, hide when scrolling down)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setNavVisible(false); // scrolling down
        if (activeMenu !== null) {
          setActiveMenu(null);
          setIsBlurred(false);
        }
      } else {
        setNavVisible(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, activeMenu, setIsBlurred]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveMenu(null);
    setIsBlurred(!menuOpen);
    if (!menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  };

  const openSearch = () => {
    setSearchOpen(true);
    setIsBlurred(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInputRef.current?.focus(), 150);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setIsBlurred(false);
    document.body.style.overflow = "auto";
  };

  const handleMenuEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(index);
    setIsBlurred(true);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsBlurred(false);
    }, 200);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownLeave = () => {
    setActiveMenu(null);
    setIsBlurred(false);
  };

  // Close search on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (searchOpen) closeSearch();
        else if (menuOpen) toggleMenu();
      }
      // Quick search shortcut Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchOpen) closeSearch();
        else openSearch();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [searchOpen, menuOpen]);

  // Click outside to close search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        closeSearch();
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [searchOpen]);

  // Search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchQuery.toLowerCase();
    const results = [];

    // Search Contact Info
    if (portfolioData.email.toLowerCase().includes(term) || term.includes('email') || term.includes('contact')) {
      results.push({
        type: "contact", title: "Email Address", content: portfolioData.email,
        icon: <IoMail className="text-white/60" />, action: () => window.open(`mailto:${portfolioData.email}`)
      });
    }
    
    if (portfolioData.phone.includes(term) || term.includes('phone') || term.includes('contact')) {
      results.push({
        type: "contact", title: "Phone Number", content: portfolioData.phone,
        icon: <IoLocation className="text-white/60" />, action: () => window.open(`tel:${portfolioData.phone}`)
      });
    }

    // Search Links
    Object.entries(portfolioData.links).forEach(([key, value]) => {
      if (key.toLowerCase().includes(term) || value.toLowerCase().includes(term)) {
        const icons = {
          github: <IoLogoGithub className="text-white/60" />,
          linkedin: <IoBriefcase className="text-white/60" />,
          portfolio: <IoRocket className="text-white/60" />
        };
        results.push({
          type: "link", title: key.charAt(0).toUpperCase() + key.slice(1), content: value,
          icon: icons[key] || <IoRocket className="text-white/60" />, action: () => window.open(`https://${value}`, "_blank")
        });
      }
    });

    // Search Projects
    portfolioData.projects.forEach((project) => {
      if (project.name.toLowerCase().includes(term) || project.description.toLowerCase().includes(term) || project.technologies.toLowerCase().includes(term)) {
        results.push({
          type: "project", title: project.name, content: project.description.substring(0, 80) + "...",
          tech: project.technologies, icon: <IoCode className="text-white/60" />
        });
      }
    });

    // Search Skills
    Object.entries(portfolioData.technicalSkills).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        if (skill.toLowerCase().includes(term)) {
          results.push({
            type: "skill", title: skill, content: `${category} Category`, icon: <IoCode className="text-white/60" />
          });
        }
      });
    });

    // Search Experience
    portfolioData.professionalExperience.forEach((exp) => {
      if (exp.title.toLowerCase().includes(term) || exp.company.toLowerCase().includes(term)) {
        results.push({
          type: "experience", title: exp.title, content: `${exp.company} • ${exp.date}`, icon: <IoBriefcase className="text-white/60" />
        });
      }
    });

    setSearchResults(results.slice(0, 8));
  }, [searchQuery]);

  return (
    <>
      {/* 
        Placeholder to prevent content from hiding behind the fixed navbar. 
        It takes up exactly the height of the navbar so the document flow is correct.
      */}
      <div className="h-[70px] w-full shrink-0"></div>

      {/* APPLE-STYLE BACKGROUND BLUR OVERLAY */}
      {activeMenu !== null && (
        <div 
          className="fixed inset-0 top-[70px] bg-black/60 backdrop-blur-xl z-30"
          style={{ animation: 'fade-in 0.3s ease-out forwards' }}
          onMouseEnter={handleDropdownLeave}
        />
      )}

      {/* NAVBAR */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-out ${
        navVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className={`w-full transition-colors duration-300 ${
          isScrolled || activeMenu !== null
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
            : "bg-transparent"
        }`}>
          <div className="w-full max-w-[1024px] mx-auto flex items-center justify-between px-6 py-4 relative">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer group flex items-center gap-2 relative z-50">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black font-bold group-hover:bg-white/80 transition-colors">
                k
              </div>
              <h1 className="font-semibold text-white/90 text-lg tracking-wide group-hover:text-white transition-colors">
                KNZLE
              </h1>
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 h-full z-50">
              <div className="flex items-center gap-2">
                {data.dropdownCategories.map((item, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
                      activeMenu === index 
                        ? "text-white bg-white/10" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                    onMouseEnter={() => handleMenuEnter(index)}
                    onMouseLeave={handleMenuLeave}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </nav>

            {/* RIGHT SEARCH & MENU OPENS */}
            <div className="flex items-center gap-3 relative z-50">
              <button 
                onClick={openSearch}
                className="group hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
              >
                <IoSearch size={18} className="text-white/60 group-hover:text-white transition-colors" />
                <span className="text-xs text-white/40 font-mono tracking-widest hidden lg:block">⌘K</span>
              </button>
              <button 
                onClick={openSearch}
                className="sm:hidden p-2 rounded-full bg-transparent hover:bg-white/5 transition-all text-white/80"
              >
                <IoSearch size={22} className="" />
              </button>
              <button 
                className="md:hidden p-2 rounded-full bg-transparent hover:bg-white/5 transition-all text-white/80" 
                onClick={toggleMenu} 
              >
                <IoMenu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP DROPDOWN MEGA MENU - FULL WIDTH LIKE APPLE */}
        {activeMenu !== null && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full w-full flex justify-center z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-2xl"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="w-full max-w-[1024px] mx-auto p-10 animate-fade-down relative">
              <div className="flex">
                <div className="w-2/3 pr-10 border-r border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      {data.dropdownCategories[activeMenu].title}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {data.dropdownCategories[activeMenu].subOptions?.map((sub, i) => (
                      <a
                        key={i}
                        href={sub.link}
                        className="group flex flex-col p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                      >
                        <span className="text-base font-medium text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
                          {sub.title}
                        </span>
                        <span className="text-xs text-white/30 mt-1 line-clamp-1">View collection and details</span>
                      </a>
                    ))}
                  </div>
                </div>
                {/* <div className="w-1/3 pl-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white/60 font-medium text-sm mb-4 uppercase tracking-wider">Featured Highlight</h3>
                    <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/5 overflow-hidden relative group cursor-pointer mb-4 flex items-center justify-center">
                       <IoCode className="text-white/10 text-6xl group-hover:text-white/20 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed hover:text-white/80 cursor-pointer transition-colors">
                      Discover the new dark mode aesthetics and features in this collection.
                    </p>
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white font-medium transition-colors uppercase tracking-widest">
                    Read the story <IoIosArrowForward />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* COMMAND PALETTE (SEARCH) - COMPLETELY DARK THEME */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" style={{animation: 'fade-in 0.3s ease-out forwards'}} onClick={closeSearch}></div>
          
          <div 
            ref={searchContainerRef}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10"
            style={{ animation: 'scale-in 0.2s ease-out forwards' }}
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/5 bg-black/40">
              <IoSearch size={22} className="text-white/40 ml-2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-lg text-white outline-none px-4 placeholder-white/20 font-light"
              />
              <button 
                onClick={closeSearch}
                className="p-2 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
              >
                <div className="text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded border border-white/10 bg-white/5">ESC</div>
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-2 bg-[#090909]">
              {!searchQuery && (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-4">
                    <IoSearch className="text-white/20 text-xl" />
                  </div>
                  <p className="text-white/30 text-sm font-light">Search across projects, skills, and contact info.</p>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="py-2">
                  <p className="px-4 text-[10px] font-medium text-white/30 uppercase tracking-widest mb-2">Results</p>
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      onClick={result.action}
                      className="group flex items-center gap-4 p-3 mx-2 rounded-lg hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors text-white/60">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-white/70 group-hover:text-white truncate">
                            {result.title}
                          </h3>
                          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/30">
                            {result.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/40 mt-1 truncate">
                          {result.content}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                        <IoIosArrowForward className="text-white/40" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchQuery && searchResults.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-white/40 text-sm font-light">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-black/80 border-t border-white/5 px-4 py-3 flex items-center justify-between text-[11px] text-white/30 font-light">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="p-0.5 px-1.5 rounded bg-white/5 shadow-sm border border-white/10 font-sans">↵</span> select</span>
                <span className="flex items-center gap-1.5"><span className="p-0.5 px-1.5 rounded bg-white/5 shadow-sm border border-white/10 font-sans">↑↓</span> navigate</span>
              </div>
              <div className="tracking-widest">kNZLE</div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU - FULL SCREEN DARK THEME */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col md:hidden" style={{ animation: 'fade-in 0.2s ease-out forwards' }}>
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <h1 className="font-semibold text-white/80 text-xl tracking-wide">kNZLE</h1>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              <IoClose size={24} />
            </button>
          </div>

          <div className="px-6 py-8 flex-1 overflow-y-auto">
            {activeMenu === null ? (
              <ul className="space-y-1">
                {data.dropdownCategories.map((item, index) => (
                  <li
                    key={index}
                    className="group"
                    onClick={() => {
                      if (item.subOptions) setActiveMenu(index);
                    }}
                  >
                    <div className="flex justify-between items-center py-5 border-b border-white/5 cursor-pointer">
                      <span className="text-2xl font-light text-white/60 group-hover:text-white transition-colors">
                        {item.title}
                      </span>
                      {item.subOptions && (
                        <IoIosArrowForward className="text-white/20 text-xl group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ animation: 'slide-in-right 0.2s ease-out forwards' }}>
                <button 
                  onClick={() => setActiveMenu(null)}
                  className="text-white/40 hover:text-white mb-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest transition-colors"
                >
                  <IoIosArrowForward className="rotate-180" /> BACK TO MENU
                </button>
                <h2 className="text-3xl font-light mb-8 text-white/90 tracking-wide">
                  {data.dropdownCategories[activeMenu].title}
                </h2>
                <ul className="space-y-6">
                  {data.dropdownCategories[activeMenu].subOptions.map((sub, i) => (
                    <li key={i}>
                      <a 
                        href={sub.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-lg font-light text-white/50 hover:text-white hover:translate-x-1 transition-all duration-300"
                      >
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="p-8 border-t border-white/5">
            <button 
              onClick={() => {
                toggleMenu();
                openSearch();
              }}
              className="w-full py-4 rounded-xl bg-white/5 border border-white/5 text-white/60 font-light flex items-center justify-center gap-3 hover:bg-white/10 hover:text-white transition-colors"
            >
              <IoSearch size={20} /> Search Environment
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.98) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(15px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-down {
          animation: fade-down 0.2s ease-out forwards;
        }

        /* Minimal Dark Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}