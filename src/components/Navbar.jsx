import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import AuthModal from "./AuthModal";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/tracking", label: "Suivi de colis" },
  { to: "/news", label: "Actualités" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo La Poste de Djibouti"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-[#0B1F3A] font-bold text-lg leading-none">LA POSTE</h1>
              <p className="text-sm text-gray-500">DE DJIBOUTI</p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-medium transition pb-1 ${
                  isActive(link.to)
                    ? "text-[#D4A017]"
                    : "text-[#0B1F3A] hover:text-[#D4A017]"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-[#D4A017] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <Search size={20} className="text-[#0B1F3A]" />
            </button>

            {/* CLIENT SPACE */}
            <button
              onClick={() => setShowModal(true)}
              className="hidden md:flex bg-[#D4A017] hover:bg-yellow-600 transition px-5 py-3 rounded-full items-center gap-2 font-medium text-[#0B1F3A]"
            >
              <User size={18} />
              Espace client
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="flex flex-col px-6 py-6 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenu(false)}
                  className={`flex items-center gap-3 font-medium transition ${
                    isActive(link.to)
                      ? "text-[#D4A017]"
                      : "text-[#0B1F3A] hover:text-[#D4A017]"
                  }`}
                >
                  {isActive(link.to) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                  )}
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => { setShowModal(true); setMobileMenu(false); }}
                className="mt-4 bg-[#D4A017] hover:bg-yellow-600 transition px-5 py-4 rounded-2xl flex items-center justify-center gap-2 font-medium text-[#0B1F3A]"
              >
                <User size={18} />
                Espace client
              </button>
            </nav>
          </div>
        )}
      </header>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
