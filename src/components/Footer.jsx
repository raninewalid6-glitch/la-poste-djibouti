import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../assets/images/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ABOUT */}
          <div>

            <Link
              to="/"
              className="flex items-center gap-3"
            >

              <img
                src={logo}
                alt="Logo La Poste de Djibouti"
                className="w-14 h-14 object-contain"
              />

              <div>
                <h1 className="text-white font-bold text-lg leading-none">
                  LA POSTE
                </h1>

                <p className="text-sm text-gray-400">
                  DE DJIBOUTI
                </p>
              </div>

            </Link>

            <p className="text-gray-400 mt-6 leading-relaxed">
              La Poste de Djibouti accompagne citoyens
              et entreprises avec des services postaux,
              logistiques et numériques modernes.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-6">

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A017] hover:text-[#0B1F3A] transition flex items-center justify-center">
                <FaFacebookF size={18} />
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A017] hover:text-[#0B1F3A] transition flex items-center justify-center">
                <FaInstagram size={18} />
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A017] hover:text-[#0B1F3A] transition flex items-center justify-center">
                <FaTwitter size={18} />
              </button>
            </div>
          </div>

          {/* LINKS */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Liens rapides
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <a href="#" className="hover:text-[#D4A017] transition">
                  Accueil
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#D4A017] transition">
                  Services
                </a>
              </li>

              <li>
                <a href="/tracking" className="hover:text-[#D4A017] transition">
                  Suivi de colis
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#D4A017] transition">
                  Actualités
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#D4A017] transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Nos Services
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>Courrier National</li>

              <li>EMS International</li>

              <li>Livraison Colis</li>

              <li>Services Financiers</li>

              <li>Boîtes Postales</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-400">

              <div className="flex items-start gap-3">

                <MapPin size={20} className="mt-1 text-[#D4A017]" />

                <p>
                  Djibouti Ville,
                  Boulevard de la République.
                </p>
              </div>

              <div className="flex items-center gap-3">

                <Phone size={20} className="text-[#D4A017]" />

                <p>2020</p>
              </div>

              <div className="flex items-center gap-3">

                <Mail size={20} className="text-[#D4A017]" />

                <p>contact@laposte.dj</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 La Poste de Djibouti.
            Tous droits réservés.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">

            <a href="#" className="hover:text-[#D4A017] transition">
              Politique de confidentialité
            </a>

            <a href="#" className="hover:text-[#D4A017] transition">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;