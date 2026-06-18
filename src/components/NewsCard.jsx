import {
  ArrowRight,
} from "lucide-react";

const news = [
  {
    badge: "Communiqué",
    badgeColor: "bg-[#D4A017] text-[#0B1F3A]",
    date: "12 Mai 2024",
    title: "Nouveaux horaires d'ouverture",
    description:
      "Découvrez les nouveaux horaires de nos bureaux à partir du 15 mai 2024.",
    image:
      "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "Actualité",
    badgeColor: "bg-[#0B1F3A] text-white",
    date: "05 Mai 2024",
    title: "La Poste de Djibouti innove",
    description: "De nouveaux services numériques pour mieux vous servir.",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    badge: "Événement",
    badgeColor: "bg-[#D4A017] text-[#0B1F3A]",
    date: "28 Avril 2024",
    title: "Journée mondiale de la poste",
    description: "La Poste de Djibouti célèbre la journée mondiale de la poste.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
  },
];

const NewsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
              Actualités
            </h2>
            <div className="w-10 h-1 bg-[#D4A017] rounded-full mt-2" />
          </div>

          <button className="hidden sm:flex items-center gap-2 text-[#0B1F3A] font-semibold text-sm hover:text-[#D4A017] transition">
            Voir toutes les actualités
            <ArrowRight size={16} />
          </button>
        </div>

        {/* NEWS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 group"
            >
              {/* IMAGE + BADGE */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition duration-500"
                />
                <span
                  className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <p className="text-gray-400 text-sm">{item.date}</p>

                <h3 className="text-lg font-bold text-[#0B1F3A] mt-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>

                <button className="mt-4 flex items-center gap-1.5 text-[#D4A017] font-semibold text-sm hover:gap-2.5 transition-all">
                  Lire la suite
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;