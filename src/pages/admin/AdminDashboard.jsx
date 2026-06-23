import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Trash2, Pencil, Loader2, X, ImageIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API = "http://localhost:5000/api";

const EMPTY_FORM = { title: "", content: "", category: "actualite", image: null };

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const fetchArticles = async () => {
    setLoading(true);
    const res = await fetch(`${API}/articles`);
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
    formData.append("category", form.category);
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
      setSuccess(editId ? "Article mis à jour !" : "Article publié !");
      fetchArticles();
      setTimeout(resetForm, 1500);
    }
    setSubmitting(false);
  };

  const handleEdit = (article) => {
    setForm({
      title: article.title,
      content: article.content,
      category: article.category,
      image: null,
    });
    setEditId(article.id);
    setPreview(article.image ? `http://localhost:5000${article.image}` : null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet article ?")) return;
    await fetch(`${API}/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchArticles();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-[#0B1F3A] text-white px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard Admin</h1>
          <p className="text-gray-400 text-sm">La Poste de Djibouti</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); setPreview(null); }}
          className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 text-[#0B1F3A] font-semibold px-5 py-2.5 rounded-xl transition"
        >
          <PlusCircle size={18} />
          Nouvel article
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* FORM */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#0B1F3A]">
                {editId ? "Modifier l'article" : "Publier un article"}
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
                  placeholder="Titre de l'article"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                >
                  <option value="actualite">Actualité</option>
                  <option value="article">Article</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contenu</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Contenu de l'article..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Image</label>
                <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-[#D4A017] transition">
                  <ImageIcon size={20} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {form.image ? form.image.name : "Choisir une image"}
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
                    className="mt-3 w-full h-48 object-cover rounded-xl"
                  />
                )}
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm bg-green-50 rounded-lg px-4 py-2.5">{success}</p>
              )}

              <div className="flex gap-3 pt-2">
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

        {/* ARTICLES LIST */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <h2 className="font-bold text-[#0B1F3A]">Articles publiés ({articles.length})</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={32} className="animate-spin text-[#D4A017]" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-center text-gray-400 py-16">Aucun article publié</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {articles.map((a) => (
                <li key={a.id} className="flex items-center gap-4 px-8 py-4">
                  {a.image ? (
                    <img
                      src={`http://localhost:5000${a.image}`}
                      alt={a.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={22} className="text-gray-300" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0B1F3A] truncate">{a.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        a.category === "actualite"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}>
                        {a.category === "actualite" ? "Actualité" : "Article"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(a.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(a)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 transition"
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
    </div>
  );
};

export default AdminDashboard;
