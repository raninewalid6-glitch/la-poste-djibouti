import { useState, useEffect, useRef } from "react";
import { Package, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/Hero.jpg";
import { BASE_URL as API } from "../config";
const INTERVAL = 10000;

const DEFAULT_TITLE = "Connecter les citoyens,\nservir le pays.";
const DEFAULT_SUBTITLE = "Leader des services postaux et de proximité, nous facilitons vos échanges au quotidien.";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [mediaVisible, setMediaVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/slides`)
      .then((r) => r.json())
      .then((data) => setSlides(Array.isArray(data) && data.length > 0 ? data : []))
      .catch(() => setSlides([]));
  }, []);

  const changeTo = (index) => {
    // Fade out everything
    setTextVisible(false);
    setMediaVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setMediaVisible(true);
      setTextVisible(true);
    }, 400);
  };

  const goTo = (index) => {
    changeTo(index);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        changeTo(next);
        return prev; // changeTo will set state after timeout
      });
    }, INTERVAL);
  };

  useEffect(() => {
    if (slides.length > 1) {
      timerRef.current = setInterval(() => {
        setTextVisible(false);
        setMediaVisible(false);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % slides.length);
          setMediaVisible(true);
          setTextVisible(true);
        }, 400);
      }, INTERVAL);
    }
    return () => clearInterval(timerRef.current);
  }, [slides]);

  const slide = slides[current];
  const title = slide?.title || DEFAULT_TITLE;
  const subtitle = slide?.subtitle || DEFAULT_SUBTITLE;

  return (
    <div className="w-full px-4 pt-4 pb-0 bg-white">
      <section className="relative overflow-hidden bg-[#001B44] rounded-2xl min-h-[520px] lg:min-h-[600px] max-w-[1400px] mx-auto">

        {/* ── Média courant uniquement (évite le bug video opacity Chrome) ── */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: mediaVisible ? 1 : 0 }}
        >
          {slides.length === 0 ? (
            <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
          ) : slide?.type === "video" ? (
            <video
              key={slide.id}
              src={`${API}${slide.url}`}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              key={slide.id}
              src={`${API}${slide.url}`}
              alt={`Slide ${current + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Dégradé */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, #001B44 0%, #001B44 15%, rgba(0,27,68,0.85) 30%, rgba(0,27,68,0.6) 45%, rgba(0,27,68,0.35) 60%, rgba(0,27,68,0.15) 75%, rgba(0,27,68,0) 90%)",
          }}
        />

        {/* ── Contenu texte (animé) ── */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 lg:py-28 min-h-[520px] lg:min-h-[600px] flex items-center pb-24">
          <div
            className="max-w-xl w-full transition-all duration-300"
            style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? "translateY(0)" : "translateY(12px)" }}
          >
            <p className="text-white text-xl md:text-2xl mb-4">La Poste de Djibouti</p>

            <h1 className="text-white text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight whitespace-pre-line">
              {title}
            </h1>

            <p className="text-gray-200 mt-6 text-lg md:text-xl leading-relaxed max-w-md">
              {subtitle}
            </p>

            <div className="flex flex-wrap gap-4 mt-16">
              <Link
                to="/tracking"
                className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 transition px-7 py-4 rounded-full font-semibold text-[#0B1F3A] text-base"
              >
                Suivre un colis
                <Package size={18} strokeWidth={2.2} />
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-2 border border-white/70 text-white hover:bg-white hover:text-[#0B1F3A] transition px-7 py-4 rounded-full font-semibold text-base"
              >
                Découvrir nos services
                <ArrowRight size={18} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Chevrons gauche / droite ── */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => goTo((current - 1 + slides.length) % slides.length)}
              aria-label="Slide précédente"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition backdrop-blur-sm"
            >
              <ChevronLeft size={22} strokeWidth={2} />
            </button>
            <button
              onClick={() => goTo((current + 1) % slides.length)}
              aria-label="Slide suivante"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition backdrop-blur-sm"
            >
              <ChevronRight size={22} strokeWidth={2} />
            </button>
          </>
        )}

        {/* ── Points de navigation ── */}
        {slides.length > 1 && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 h-3 bg-[#D4A017]"
                      : "w-3 h-3 bg-white/50 hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;
