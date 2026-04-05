import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import data from "../data/menu.json";
import portfolioData from "../data/portfolioData";
import { 
  IoMenu, IoClose, IoSearch, IoMail, IoLogoGithub, IoLocation, 
  IoBriefcase, IoSchool, IoCode, IoRocket 
} from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { useNavbar } from "../context/NavbarContext";
import logo from "../assets/knzle_logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setNavVisible(false);
        if (activeMenu !== null) {
          setActiveMenu(null);
          setIsBlurred(false);
        }
      } else {
        setNavVisible(true);
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

  const handleNavClick = (href) => {
    setActiveMenu(null);
    setIsBlurred(false);
    setMenuOpen(false);
    document.body.style.overflow = "auto";

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

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
        icon: <IoMail className="text-white/60" />, action: () => { window.open(`mailto:${portfolioData.email}`); closeSearch(); }
      });
    }
    
    setSearchResults(results.slice(0, 8));
  }, [searchQuery]);

  return (
    <>
      <div className="h-[70px] w-full shrink-0"></div>

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
            <Link to="/" onClick={() => handleNavClick('/')} className="flex-shrink-0 cursor-pointer group flex items-center gap-2 relative z-50">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black font-bold group-hover:bg-white/80 transition-colors">
                <img src={logo} alt="kNZLE Logo" className="w-4 h-4 object-contain" />
              </div>
              <h1 className="font-semibold text-white/90 text-lg tracking-wide group-hover:text-white transition-colors">
                KNZLE
              </h1>
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 h-full z-50">
              <div className="flex items-center gap-2">
                {data.dropdownCategories.map((item, index) => (
                  <div key={index} onMouseEnter={() => handleMenuEnter(index)} onMouseLeave={handleMenuLeave}>
                    {item.link && item.link.startsWith('/') ? (
                        <NavLink
                            to={item.link}
                            className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
                                isActive 
                                ? "text-white bg-white/10" 
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                            onClick={() => handleNavClick(item.link)}
                        >
                            {item.title}
                        </NavLink>
                    ) : (
                        <button
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out ${
                                activeMenu === index 
                                ? "text-white bg-white/10" 
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                            onClick={() => handleNavClick(item.link || '#')}
                        >
                            {item.title}
                        </button>
                    )}
                  </div>
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

        {/* MEGA MENU */}
        {activeMenu !== null && data.dropdownCategories[activeMenu].subOptions && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full w-full flex justify-center z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-2xl"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="w-full max-w-[1024px] mx-auto p-10 animate-fade-down relative text-white">
              <div className="flex">
                <div className="w-2/3 pr-10 border-r border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                      {data.dropdownCategories[activeMenu].title}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {data.dropdownCategories[activeMenu].subOptions?.map((sub, i) => (
                        (sub.link && (sub.link.startsWith('/') || sub.link.startsWith('#'))) ? (
                            <Link
                                key={i}
                                to={sub.link.startsWith('#') ? '/'+sub.link : sub.link}
                                onClick={() => handleNavClick(sub.link)}
                                className="group flex flex-col p-4 rounded-xl hover:bg-white/5 transition-all duration-300 text-left"
                            >
                                <span className="text-base font-medium text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
                                {sub.title}
                                </span>
                                <span className="text-xs text-white/30 mt-1">Explore this section</span>
                            </Link>
                        ) : (
                            <a
                                key={i}
                                href={sub.link || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex flex-col p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                            >
                                <span className="text-base font-medium text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all">
                                {sub.title}
                                </span>
                                <span className="text-xs text-white/30 mt-1">External link</span>
                            </a>
                        )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col md:hidden" style={{ animation: 'fade-in 0.2s ease-out forwards' }}>
          <div className="p-6 flex items-center justify-between border-b border-white/5">
            <h1 className="font-semibold text-white/80 text-xl tracking-wide">kNZLE</h1>
            <button onClick={toggleMenu} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
              <IoClose size={24} />
            </button>
          </div>

          <div className="px-6 py-8 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {data.dropdownCategories.map((item, index) => (
                <li key={index} className="group">
                    {item.link && item.link.startsWith('/') ? (
                        <Link 
                            to={item.link} 
                            onClick={() => handleNavClick(item.link)}
                            className="flex justify-between items-center py-5 border-b border-white/5 cursor-pointer"
                        >
                            <span className="text-2xl font-light text-white/60 group-hover:text-white transition-colors">{item.title}</span>
                             <IoIosArrowForward className="text-white/20 text-xl group-hover:text-white transition-colors" />
                        </Link>
                    ) : (
                        <button 
                            onClick={() => handleNavClick(item.link || '#')}
                            className="w-full flex justify-between items-center py-5 border-b border-white/5 cursor-pointer text-left"
                        >
                            <span className="text-2xl font-light text-white/60 group-hover:text-white transition-colors">{item.title}</span>
                             <IoIosArrowForward className="text-white/20 text-xl group-hover:text-white transition-colors" />
                        </button>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SEARCH PANEL (Simplified for stability) */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4" onClick={closeSearch}>
          <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
             <div className="p-4 border-b border-white/5 flex items-center gap-4">
                <IoSearch size={22} className="text-white/40" />
                <input 
                  type="text" 
                  autoFocus 
                  placeholder="Search projects, skills..." 
                  className="bg-transparent border-none outline-none text-white w-full text-lg"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button onClick={closeSearch} className="text-white/40 hover:text-white">Esc</button>
             </div>
             <div className="max-h-[50vh] overflow-y-auto p-4 space-y-2">
                {searchResults.map((res, i) => (
                  <div key={i} onClick={() => { res.action(); closeSearch(); }} className="p-3 rounded-lg hover:bg-white/5 cursor-pointer flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">{res.icon}</div>
                    <div>
                      <p className="text-sm font-medium">{res.title}</p>
                      <p className="text-xs text-white/40">{res.content}</p>
                    </div>
                  </div>
                ))}
                {searchQuery && searchResults.length === 0 && <p className="text-center text-white/20 py-8">No results found</p>}
                {!searchQuery && <p className="text-center text-white/20 py-8">Start typing to search...</p>}
             </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fade-down { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-down { animation: fade-down 0.2s ease-out forwards; }
      `}</style>
    </>
  );
}