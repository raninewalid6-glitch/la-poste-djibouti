import {
  Landmark,
  Users,
  Package,
  Smile,
} from "lucide-react";

const stats = [
  {
    icon: <Landmark size={28} />,
    number: "20+",
    title: "Bureaux de poste",
    color: "text-[#D4A017]",
  },
  {
    icon: <Users size={28} />,
    number: "500+",
    title: "Employés engagés",
    color: "text-[#0B1F3A]",
  },
  {
    icon: <Package size={28} />,
    number: "1M+",
    title: "Colis livrés par an",
    color: "text-[#D4A017]",
  },
  {
    icon: <Smile size={28} />,
    number: "98%",
    title: "Clients satisfaits",
    color: "text-[#0B1F3A]",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 pt-8 first:pt-0 lg:pt-0 lg:pl-8 lg:first:pl-0"
            >
              <div className={`shrink-0 ${stat.color}`}>{stat.icon}</div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0B1F3A] leading-tight">
                  {stat.number}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;