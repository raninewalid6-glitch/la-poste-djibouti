import {
  Mail,
  Package,
  Send,
  Landmark,
  PackageOpen,
  MapPin,
  Headset,
  ArrowRight,
  PhoneCall,
  Bookmark,
} from "lucide-react";
import callcenterImg from "../assets/images/callcenter.jpeg";

const services = [
  {
    icon: <Mail size={26} />,
    title: "Courrier",
    description: "Envoyez vos lettres et documents en toute confiance.",
    bg: "bg-[#D4A017]",
  },
  {
    icon: <Package size={26} />,
    title: "Colis",
    description: "Solutions d'expédition adaptées à vos besoins.",
    bg: "bg-[#0B1F3A]",
  },
  {
    icon: <Send size={26} />,
    title: "EMS",
    description: "Livraison express internationale.",
    bg: "bg-[#D4A017]",
  },
  {
    icon: <Landmark size={26} />,
    title: "Services financiers",
    description: "Des services financiers accessibles à tous.",
    bg: "bg-[#0B1F3A]",
  },
  {
    icon: <PackageOpen size={26} />,
    title: "Boîtes postales",
    description: "Une adresse postale sécurisée et fiable.",
    bg: "bg-[#D4A017]",
  },
  {
    icon: <PhoneCall size={26} />,
    title: "Callposte",
    description: "Un service téléphonique accessible dans tous nos bureaux.",
    bg: "bg-[#0B1F3A]",
  },
  {
    icon: <Bookmark size={26} />,
    title: "Philatélie",
    description: "Découvrez notre collection de timbres et éditions spéciales.",
    bg: "bg-[#D4A017]",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
              Nos services
            </h2>
            <div className="w-10 h-1 bg-[#D4A017] rounded-full mt-2" />
          </div>

          <button className="hidden sm:flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm hover:text-[#D4A017] transition">
            Voir tous les services
            <ArrowRight size={16} />
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* ICON */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${service.bg}`}
              >
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-base font-bold text-[#0B1F3A] mt-5">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {service.description}
              </p>

              {/* LINK */}
              <button className="mt-5 text-[#D4A017] font-semibold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all">
                En savoir plus
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* BOTTOM BANNERS */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">

          {/* FIND OFFICE - dark banner with world map */}
          <div className="relative bg-[#0B1F3A] rounded-2xl p-8 overflow-hidden min-h-[220px]">
            {/* DOTTED WORLD MAP DECORATION */}
            <svg
              className="absolute right-0 bottom-0 opacity-40"
              width="340"
              height="200"
              viewBox="0 0 340 200"
              fill="none"
            >
              <defs>
                <pattern id="dotPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="#3B5278" />
                </pattern>
              </defs>
              <rect width="340" height="200" fill="url(#dotPattern)" />
            </svg>

            <div className="absolute right-12 bottom-10 w-20 h-20 rounded-full border-2 border-dashed border-[#D4A017]/60 flex items-center justify-center">
              <MapPin className="text-[#D4A017]" size={28} />
            </div>

            <div className="relative z-10 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#D4A017] mb-5">
                <Landmark size={24} />
              </div>
              <h3 className="text-white text-lg font-bold">
                Trouvez un bureau de poste
              </h3>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                Plus de 20 bureaux à travers tout le territoire.
              </p>
              <button className="mt-6 flex items-center gap-2  bg-[#D4A017] hover:bg-yellow-600  text-[#0B1F3A] font-semibold text-sm px-5 py-3 rounded-full hover:bg-gray-100 transition">
                Voir la carte
                <MapPin size={16} />
              </button>
            </div>
          </div>

          {/* HELP - light banner with photo */}
          <div className="relative bg-[#EDEFF2] rounded-2xl overflow-hidden min-h-[220px] flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* PHOTO */}
            <img
              src={callcenterImg}
              alt="Agente du service client"
              className="order-1 sm:order-2 w-full h-40 object-cover object-top sm:absolute sm:right-0 sm:bottom-0 sm:h-full sm:w-44"
            />

            <div className="order-2 sm:order-1 relative z-10 max-w-xs p-6 sm:p-8">
              <h3 className="text-[#0B1F3A] text-lg font-bold">
                Besoin d'aide ?
              </h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                Consultez notre FAQ ou contactez notre service client ligne(2020).
              </p>
              <button className="mt-6 flex items-center gap-2 bg-white text-[#0B1F3A] font-semibold text-sm px-5 py-3 rounded-full shadow-sm hover:shadow-md transition">
                Centre d'aide
                <Headset size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;