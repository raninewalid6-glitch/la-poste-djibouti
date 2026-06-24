import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Newspaper, PlusCircle, Trash2, Pencil, Loader2,
  X, ImageIcon, LogOut, Home, ChevronRight, LayoutDashboard, Images, Upload, Film,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.jpg";

const API = "http://localhost:5000/api";
const EMPTY_FORM = { title: "", content: "", image: null };

/* ─── Sidebar ─────────────────────────────────────────────────────────── */
const Sidebar = ({ active, setActive, onLogout, user }) => {
  const navItems = [
    { key: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { key: "actualites", label: "Actualités", icon: Newspaper },
    { key: "diaporama", label: "Diaporama Hero", icon: Images },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#0B1F3A] flex flex-col flex-shrink-0">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center gap-3">
        <img src={logo} alt="logo" className="w-10 h-10 object-contain rounded-lg" />
        <div>
          <p className="text-white font-bold text-sm leading-none">LA POSTE</p>
          <p className="text-gray-400 text-xs mt-0.5">Administration</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              active === key
                ? "bg-[#D4A017] text-[#0B1F3A]"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* User + actions */}
      <div className="px-4 pb-6 space-y-2 border-t border-white/10 pt-4">
        <div className="px-4 py-3 rounded-xl bg-white/5">
          <p className="text-white text-sm font-medium truncate">{user?.name}</p>
          <p className="text-gray-400 text-xs truncate">{user?.email}</p>
        </div>
        <Link
          to="/"
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition"
        >
          <Home size={16} />
          Voir le site
        </Link>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};

/* ─── Vue Tableau de bord (stats rapides) ─────────────────────────────── */
const DashboardOverview = ({ articles, slideCount, onNavigate }) => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold text-[#0B1F3A]">Tableau de bord</h1>
      <p className="text-gray-400 text-sm mt-1">Bienvenue dans l'espace d'administration.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Newspaper size={24} className="text-blue-500" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[#0B1F3A]">{articles.length}</p>
          <p className="text-gray-500 text-sm">Actualités publiées</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
          <Images size={24} className="text-purple-500" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[#0B1F3A]">{slideCount}</p>
          <p className="text-gray-500 text-sm">Slides diaporama</p>
        </div>
      </div>

      <button
        onClick={() => onNavigate("actualites")}
        className="bg-[#D4A017] hover:bg-yellow-600 transition rounded-2xl p-6 flex items-center justify-between group text-left"
      >
        <div>
          <p className="text-[#0B1F3A] font-bold text-lg">Publier une actualité</p>
          <p className="text-yellow-800 text-sm mt-1">Ajouter un nouveau contenu</p>
        </div>
        <ChevronRight size={22} className="text-[#0B1F3A] group-hover:translate-x-1 transition" />
      </button>
    </div>

    {/* Dernières actualités */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-[#0B1F3A]">Dernières actualités</h2>
        <button
          onClick={() => onNavigate("actualites")}
          className="text-sm text-[#D4A017] hover:underline font-medium"
        >
          Voir tout
        </button>
      </div>
      {articles.length === 0 ? (
        <p className="text-center text-gray-400 py-10 text-sm">Aucune actualité publiée</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {articles.slice(0, 5).map((a) => (
            <li key={a.id} className="flex items-center gap-4 px-6 py-3.5">
              {a.image ? (
                <img
                  src={`http://localhost:5000${a.image}`}
                  alt={a.title}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <ImageIcon size={18} className="text-gray-300" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#0B1F3A] text-sm truncate">{a.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(a.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

/* ─── Vue Actualités (CRUD) ───────────────────────────────────────────── */
const ActualitesView = ({ articles, loading, token, onRefresh }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setError("");
    setSuccess("");
    setShowForm(false);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", "actualite");
    if (form.image) formData.append("image", form.image);

    const url = editId ? `${API}/articles/${editId}` : `${API}/articles`;
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Erreur");
    } else {
      setSuccess(editId ? "Actualité mise à jour !" : "Actualité publiée !");
      onRefresh();
      setTimeout(resetForm, 1500);
    }
    setSubmitting(false);
  };

  const handleEdit = (article) => {
    setForm({ title: article.title, content: article.content, image: null });
    setEditId(article.id);
    setPreview(article.image ? `http://localhost:5000${article.image}` : null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette actualité ?")) return;
    await fetch(`${API}/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onRefresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Actualités</h1>
          <p className="text-gray-400 text-sm mt-1">{articles.length} publication{articles.length > 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 text-[#0B1F3A] font-semibold px-5 py-2.5 rounded-xl transition"
        >
          <PlusCircle size={18} />
          Nouvelle actualité
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#0B1F3A]">
              {editId ? "Modifier l'actualité" : "Publier une actualité"}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Titre</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Titre de l'actualité"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contenu</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={7}
                placeholder="Rédigez le contenu de l'actualité..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Image</label>
              <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#D4A017] transition">
                <ImageIcon size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-500 truncate">
                  {form.image ? form.image.name : "Cliquer pour choisir une image"}
                </span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {preview && (
                <img
                  src={preview}
                  alt="Aperçu"
                  className="mt-3 w-full h-52 object-cover rounded-xl"
                />
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm bg-green-50 rounded-lg px-4 py-2.5">{success}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 disabled:opacity-60 text-[#0B1F3A] font-semibold px-6 py-3 rounded-xl transition"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {editId ? "Mettre à jour" : "Publier"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={30} className="animate-spin text-[#D4A017]" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <Newspaper size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Aucune actualité publiée</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {articles.map((a) => (
              <li key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                {a.image ? (
                  <img
                    src={`http://localhost:5000${a.image}`}
                    alt={a.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={20} className="text-gray-300" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0B1F3A] truncate">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{a.content}</p>
                  <p className="text-xs text-gray-300 mt-1">
                    {new Date(a.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(a)}
                    title="Modifier"
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#0B1F3A] transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    title="Supprimer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* ─── Vue Diaporama Hero ──────────────────────────────────────────────── */
const EMPTY_SLIDE_FORM = { title: "", subtitle: "", file: null };

const DiaporamaView = ({ token }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_SLIDE_FORM);
  const [preview, setPreview] = useState(null);

  const fetchSlides = async () => {
    setLoading(true);
    const res = await fetch(`${API}/slides`);
    const data = await res.json();
    setSlides(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchSlides(); }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setForm((prev) => ({ ...prev, file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm(EMPTY_SLIDE_FORM);
    setPreview(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.file) return setError("Veuillez choisir un fichier");
    setError("");
    setSuccess("");
    setSubmitting(true);

    const formData = new FormData();
    formData.append("file", form.file);
    if (form.title) formData.append("title", form.title);
    if (form.subtitle) formData.append("subtitle", form.subtitle);

    const res = await fetch(`${API}/slides`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Erreur lors de l'upload");
    } else {
      setSuccess("Slide ajoutée !");
      fetchSlides();
      setTimeout(resetForm, 1500);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette slide ?")) return;
    await fetch(`${API}/slides/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSlides();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F3A]">Diaporama Hero</h1>
          <p className="text-gray-400 text-sm mt-1">
            Slides affichées en rotation toutes les 3 s sur la page d'accueil
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 text-[#0B1F3A] font-semibold px-5 py-2.5 rounded-xl transition"
        >
          <Upload size={18} />
          Ajouter une slide
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#0B1F3A]">Nouvelle slide</h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Titre <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex : Rejoignez-nous à Djibouti"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
              />
              <p className="text-xs text-gray-400 mt-1">Laissez vide pour garder le texte par défaut</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sous-titre <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <textarea
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                rows={2}
                placeholder="Ex : Découvrez nos nouvelles agences à travers le pays."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Fichier <span className="text-red-400">*</span>
              </label>
              <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#D4A017] transition">
                <ImageIcon size={20} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-500 truncate">
                  {form.file ? form.file.name : "Image ou vidéo (JPG, PNG, MP4, WebM)"}
                </span>
                <input
                  type="file"
                  name="file"
                  accept="image/*,video/mp4,video/webm"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {preview && form.file?.type.startsWith("image") && (
                <img src={preview} alt="Aperçu" className="mt-3 w-full h-48 object-cover rounded-xl" />
              )}
              {preview && form.file?.type.startsWith("video") && (
                <video src={preview} muted className="mt-3 w-full h-48 object-cover rounded-xl" />
              )}
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2.5">{error}</p>}
            {success && <p className="text-green-600 text-sm bg-green-50 rounded-lg px-4 py-2.5">{success}</p>}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 disabled:opacity-60 text-[#0B1F3A] font-semibold px-6 py-3 rounded-xl transition"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Ajouter
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des slides */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={30} className="animate-spin text-[#D4A017]" />
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-16">
            <Images size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Aucune slide ajoutée</p>
            <p className="text-gray-300 text-xs mt-1">L'image Hero par défaut sera affichée</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {slides.map((s, i) => (
              <li key={s.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition">
                <span className="text-xs font-bold text-gray-300 w-5 text-center flex-shrink-0">{i + 1}</span>

                {s.type === "video" ? (
                  <div className="w-24 h-16 rounded-xl bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                    <Film size={22} className="text-[#D4A017]" />
                  </div>
                ) : (
                  <img
                    src={`http://localhost:5000${s.url}`}
                    alt={`Slide ${i + 1}`}
                    className="w-24 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#0B1F3A] text-sm truncate">
                    {s.title || <span className="text-gray-400 font-normal italic">Titre par défaut</span>}
                  </p>
                  {s.subtitle && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{s.subtitle}</p>
                  )}
                  <p className="text-xs text-gray-300 mt-0.5">
                    {s.type === "video" ? "Vidéo" : "Image"} · {new Date(s.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* ─── Page principale ─────────────────────────────────────────────────── */
const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const [active, setActive] = useState("dashboard");
  const [articles, setArticles] = useState([]);
  const [slideCount, setSlideCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await fetch(`${API}/articles?category=actualite`);
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  const fetchSlideCount = async () => {
    const res = await fetch(`${API}/slides`);
    const data = await res.json();
    setSlideCount(Array.isArray(data) ? data.length : 0);
  };

  useEffect(() => { fetchArticles(); fetchSlideCount(); }, []);

  const handleLogout = () => logout();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        active={active}
        setActive={setActive}
        onLogout={handleLogout}
        user={user}
      />

      <main className="flex-1 px-8 py-10 overflow-auto">
        {active === "dashboard" && (
          <DashboardOverview
            articles={articles}
            slideCount={slideCount}
            onNavigate={setActive}
          />
        )}
        {active === "actualites" && (
          <ActualitesView
            articles={articles}
            loading={loading}
            token={token}
            onRefresh={fetchArticles}
          />
        )}
        {active === "diaporama" && (
          <DiaporamaView token={token} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
