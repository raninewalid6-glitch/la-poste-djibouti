import { useState } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API } from "../config";

const AuthModal = ({ onClose }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const switchTab = (t) => {
    setTab(t);
    setError("");
    setSuccess("");
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = tab === "login" ? "/auth/login" : "/auth/register";
      const body =
        tab === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Une erreur est survenue");
      } else if (tab === "login") {
        login(data.user, data.token);
        onClose();
      } else {
        setSuccess("Compte créé ! Vous pouvez maintenant vous connecter.");
        switchTab("login");
      }
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1F3A] px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-xl">Espace Client</h2>
            <p className="text-gray-400 text-sm mt-0.5">La Poste de Djibouti</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {[
            { key: "login", label: "Connexion" },
            { key: "register", label: "Inscription" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => switchTab(key)}
              className={`flex-1 py-3.5 text-sm font-semibold transition ${
                tab === key
                  ? "text-[#D4A017] border-b-2 border-[#D4A017]"
                  : "text-gray-500 hover:text-[#0B1F3A]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
          {tab === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2.5">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm bg-green-50 rounded-lg px-4 py-2.5">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4A017] hover:bg-yellow-600 disabled:opacity-60 text-[#0B1F3A] font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            {tab === "login" ? "Se connecter" : "Créer mon compte"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {tab === "login" ? "Pas encore de compte ? " : "Déjà inscrit ? "}
            <button
              type="button"
              onClick={() => switchTab(tab === "login" ? "register" : "login")}
              className="text-[#D4A017] font-semibold hover:underline"
            >
              {tab === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
