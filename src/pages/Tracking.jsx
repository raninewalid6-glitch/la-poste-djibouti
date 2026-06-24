import { useState } from "react";
import {
  PackageSearch, Loader2, CheckCircle2, Circle,
  MapPin, CalendarDays, AlertCircle, Package,
} from "lucide-react";

const API = "http://localhost:5000/api";

const STATUS_LABELS = {
  "DELIVERED": { label: "Livré", color: "text-green-600", bg: "bg-green-50" },
  "IN_TRANSIT": { label: "En transit", color: "text-blue-600", bg: "bg-blue-50" },
  "OUT_FOR_DELIVERY": { label: "En cours de livraison", color: "text-orange-500", bg: "bg-orange-50" },
  "ATTEMPTED_DELIVERY": { label: "Tentative de livraison", color: "text-yellow-600", bg: "bg-yellow-50" },
  "AVAILABLE_FOR_PICKUP": { label: "Disponible au bureau", color: "text-purple-600", bg: "bg-purple-50" },
  "RETURNED": { label: "Retourné", color: "text-red-500", bg: "bg-red-50" },
  "UNKNOWN": { label: "Statut inconnu", color: "text-gray-500", bg: "bg-gray-100" },
};

const getStatus = (code) => STATUS_LABELS[code] ?? STATUS_LABELS["UNKNOWN"];

const Tracking = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const id = query.trim();
    if (!id) return;

    setLoading(true);
    setError("");
    setResult(null);
    setSearched(true);

    try {
      const res = await fetch(`${API}/tracking/${encodeURIComponent(id)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Numéro de suivi introuvable");
      } else {
        setResult(data);
      }
    } catch {
      setError("Impossible de contacter le service de suivi");
    } finally {
      setLoading(false);
    }
  };

  const events = result?.events ?? [];
  const latestStatus = result?.status ?? "UNKNOWN";
  const status = getStatus(latestStatus);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-6 space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFF7E0] mb-4">
            <PackageSearch size={32} className="text-[#D4A017]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0B1F3A]">Suivi de colis</h1>
          <p className="text-gray-500 mt-2">
            Entrez votre numéro de suivi pour localiser votre envoi
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex : RR123456789DJ"
              className="flex-1 border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center justify-center gap-2 bg-[#D4A017] hover:bg-yellow-600 disabled:opacity-50 text-[#0B1F3A] font-semibold px-7 py-3.5 rounded-xl transition"
            >
              {loading
                ? <Loader2 size={18} className="animate-spin" />
                : <PackageSearch size={18} />
              }
              Suivre
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Format standard UPU — ex : RR123456789DJ · CP123456789DJ
          </p>
        </form>

        {/* Erreur */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-red-600">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Résultats */}
        {result && (
          <div className="space-y-5">

            {/* Carte statut */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${status.bg} flex items-center justify-center flex-shrink-0`}>
                <Package size={26} className={status.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">
                  Numéro de suivi
                </p>
                <p className="font-bold text-[#0B1F3A] text-lg">{result.itemIdentifier ?? query}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${status.bg} ${status.color}`}>
                {status.label}
              </span>
            </div>

            {/* Timeline événements */}
            {events.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-[#0B1F3A] mb-6">Historique du colis</h2>

                <ol className="relative space-y-0">
                  {events.map((ev, i) => {
                    const isFirst = i === 0;
                    const isLast = i === events.length - 1;
                    return (
                      <li key={i} className="flex gap-4 pb-6 last:pb-0">
                        {/* Icône + ligne */}
                        <div className="flex flex-col items-center">
                          {isFirst
                            ? <CheckCircle2 size={22} className="text-[#D4A017] flex-shrink-0" />
                            : <Circle size={22} className="text-gray-300 flex-shrink-0" />
                          }
                          {!isLast && (
                            <div className="w-px flex-1 bg-gray-100 mt-2" />
                          )}
                        </div>

                        {/* Contenu */}
                        <div className="pb-2 -mt-0.5">
                          <p className={`font-semibold text-sm ${isFirst ? "text-[#0B1F3A]" : "text-gray-500"}`}>
                            {ev.description ?? ev.eventCode ?? "Événement"}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-400">
                            {ev.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} />
                                {ev.location}
                              </span>
                            )}
                            {ev.eventDate && (
                              <span className="flex items-center gap-1">
                                <CalendarDays size={12} />
                                {new Date(ev.eventDate).toLocaleString("fr-FR", {
                                  day: "numeric", month: "long", year: "numeric",
                                  hour: "2-digit", minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* État vide (avant toute recherche) */}
        {!searched && !loading && (
          <div className="text-center py-10 text-gray-300">
            <PackageSearch size={56} className="mx-auto mb-3" />
            <p className="text-sm">Votre numéro de suivi s'affichera ici</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tracking;
