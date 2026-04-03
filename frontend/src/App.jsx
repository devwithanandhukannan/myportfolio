import { HomeSection } from "./components/homeSection.jsx";
import Navbar from "./components/navbar.jsx"
import { NavbarProvider, useNavbar } from "./context/NavbarContext";
import Services from "./components/serviceSection.jsx";
import Projects from "./components/projectSection.jsx";
import Footer from "./components/footerSection.jsx";
import About from "./components/aboutSection.jsx";
import FloatingActionMenu from "./components/floatingActionMenu.jsx";

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
        <Services />
        <About />
        <Projects />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="bg-black">
      <NavbarProvider>
        <Layout />
      </NavbarProvider>
    </div>
  );
}