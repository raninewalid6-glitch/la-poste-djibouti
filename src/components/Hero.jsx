import { useState } from "react";
import { Package, ArrowRight } from "lucide-react";

import heroImage from "../assets/images/Hero.jpg";

const Hero = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const onTrack = () => {
    if (!trackingNumber.trim()) return;

    console.log("Suivi du colis :", trackingNumber.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") onTrack();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#001B44]">

      {/* COUCHE 1 : fond bleu  */}
      <div className="absolute inset-0 bg-[#001B44]"></div>

      {/* COUCHE 2 : image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bâtiment et camion de La Poste de Djibouti"
          className="w-full h-full object-cover"
        />
      </div>

      {/* COUCHE 3 : dégradé progressif gauche (sombre) -> droite (image nette) en plusieurs paliers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #001B44 0%, #001B44 15%, rgba(0,27,68,0.85) 30%, rgba(0,27,68,0.6) 45%, rgba(0,27,68,0.35) 60%, rgba(0,27,68,0.15) 75%, rgba(0,27,68,0) 90%)",
        }}
      ></div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28 min-h-[560px] lg:min-h-[640px] flex items-center">

        <div className="max-w-xl w-full">

          <p className="text-white text-xl md:text-2xl mb-4">
            La Poste de Djibouti
          </p>

          <h1 className="text-white text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight">
            Connecter les citoyens,
            <br />
            servir le pays.
          </h1>

          <p className="text-gray-200 mt-6 text-lg md:text-xl leading-relaxed max-w-md">
            Leader des services postaux et de proximité,
            nous facilitons vos échanges au quotidien.
          </p>

          {/* BOUTONS */}
          <div className="flex flex-wrap gap-4 mt-10">

            <button
              onClick={onTrack}
              className="flex items-center gap-2 bg-[#D4A017] hover:bg-yellow-600 transition px-7 py-4 rounded-full font-semibold text-[#0B1F3A] text-base"
            >
              Suivre un colis

              <Package size={18} strokeWidth={2.2} />
            </button>

            <button className="flex items-center gap-2 border border-white/70 text-white hover:bg-white hover:text-[#0B1F3A] transition px-7 py-4 rounded-full font-semibold text-base">

              Découvrir nos services

              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;