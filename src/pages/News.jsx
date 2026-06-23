import { useState, useEffect } from "react";
import { CalendarDays, User, Loader2 } from "lucide-react";

const API = "http://localhost:5000/api";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const url =
        activeCategory === "all"
          ? `${API}/articles`
          : `${API}/articles?category=${activeCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, [activeCategory]);

  const categories = [
    { key: "all", label: "Tout" },
    { key: "actualite", label: "Actualités" },
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B1F3A]">Actualités</h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Restez informé des dernières nouvelles et publications de La Poste de Djibouti.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === c.key
                  ? "bg-[#D4A017] text-[#0B1F3A]"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#D4A017]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 size={36} className="animate-spin text-[#D4A017]" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">Aucune publication pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a) => (
              <article
                key={a.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition group"
              >
                {a.image ? (
                  <img
                    src={`http://localhost:5000${a.image}`}
                    alt={a.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#0B1F3A] to-[#162e57] flex items-center justify-center">
                    <span className="text-white text-4xl font-bold opacity-20">LP</span>
                  </div>
                )}

                <div className="p-5">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    a.category === "actualite"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-purple-50 text-purple-600"
                  }`}>
                    {a.category === "actualite" ? "Actualité" : "Article"}
                  </span>

                  <h2 className="font-bold text-[#0B1F3A] mt-3 mb-2 text-lg leading-snug line-clamp-2">
                    {a.title}
                  </h2>

                  <p className="text-gray-500 text-sm line-clamp-3">{a.content}</p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <User size={13} />
                      {a.author || "Admin"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={13} />
                      {new Date(a.created_at).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
