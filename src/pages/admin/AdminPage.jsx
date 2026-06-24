import { useState } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";

const API = "http://localhost:5000/api";

const AdminLogin = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Identifiants incorrects");
      } else if (data.user.role !== "admin") {
        setError("Accès réservé aux administrateurs");
      } else {
        login(data.user, data.token);
      }
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4A017] mb-4">
            <ShieldCheck size={30} className="text-[#0B1F3A]" />
          </div>
          <h1 className="text-white text-2xl font-bold">Administration</h1>
          <p className="text-gray-400 text-sm mt-1">La Poste de Djibouti</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-8 space-y-5">
            <div>
              <h2 className="text-[#0B1F3A] font-bold text-lg">Connexion administrateur</h2>
              <p className="text-gray-400 text-sm mt-0.5">Accès réservé au personnel autorisé</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Adresse email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@laposte.dj"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4A017] hover:bg-yellow-600 disabled:opacity-60 text-[#0B1F3A] font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 mt-2"
              >
                {loading && <Loader2 size={17} className="animate-spin" />}
                Se connecter
              </button>
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              Espace sécurisé — accès non autorisé interdit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default AdminPage;
