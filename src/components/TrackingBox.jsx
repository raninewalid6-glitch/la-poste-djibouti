import { PackageSearch } from "lucide-react";

const TrackingSection = () => {
  return (
    <section className="relative -mt-16 z-20 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        <div className="flex flex-col lg:flex-row items-center gap-6">

          {/* LEFT */}
          <div className="flex items-center gap-4 w-full lg:w-auto">

            <div className="w-16 h-16 rounded-2xl bg-[#FFF7E0] flex items-center justify-center">
              <PackageSearch
                size={32}
                className="text-[#D4A017]"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3A]">
                Suivre un colis
              </h2>

              <p className="text-gray-500 mt-1">
                Entrez votre numéro de suivi
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">

            <input
              type="text"
              placeholder="Ex : LP123456789DJ"
              className="flex-1 w-full border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-[#D4A017] transition"
            />

            <button className="w-full md:w-auto bg-[#D4A017] hover:bg-yellow-600 transition text-[#0B1F3A] font-semibold px-8 py-4 rounded-2xl">
              Suivre
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;