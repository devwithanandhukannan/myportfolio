import { useState, useEffect } from "react";
import { HomeSection } from "./components/homeSection.jsx";
import Navbar from "./components/navbar.jsx"
import { NavbarProvider, useNavbar } from "./context/NavbarContext";
import Services from "./components/serviceSection.jsx";
import Projects from "./components/projectSection.jsx";
import Footer from "./components/footerSection.jsx";
import About from "./components/aboutSection.jsx";
import FloatingActionMenu from "./components/floatingActionMenu.jsx";
import LoadingScreen from "./components/loadingScreen.jsx";
import TechMarquee from "./components/techMarquee.jsx";
import CertificationsSection from "./components/certificationsSection.jsx";
import GithubGraph from "./components/githubGraph.jsx";
import BlogSection from "./components/blogSection.jsx";
import ContactSection from "./components/contactSection.jsx";
import { AnimatePresence } from "framer-motion";
import Testimonies from "./components/testimonialSection.jsx";
import { Kneazle } from "./components/kneazleCard.jsx";
function Layout() {
  const { isBlurred } = useNavbar();

  return (
    <>
      <Navbar />
      <FloatingActionMenu />
      <div
        className={`transition-all duration-300 ${isBlurred ? "blur-sm brightness-75" : ""
          }`}
      >
        <div className="max-w-[1020px] mx-auto p-4">
          <HomeSection />
        </div>
        <TechMarquee />
        <About />
        <Services />
        <CertificationsSection />
        <Projects />
        <Testimonies />
        <GithubGraph />
        <BlogSection />
        <ContactSection />
        <Kneazle/>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence> */}
      
      {!isLoading && (
        <NavbarProvider>
          <Layout />
        </NavbarProvider>
      )}
    </div>
  );
}