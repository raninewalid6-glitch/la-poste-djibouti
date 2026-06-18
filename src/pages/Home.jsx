import Hero from "../components/Hero";
import NewsSection from "../components/NewsCard";
import ServicesSection from "../components/ServiceCard";
import StatsSection from "../components/StatsSection";
import TrackingSection from "../components/TrackingBox";


const Home = () => {
  return (
    <>
      <Hero />
      <TrackingSection />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
    </>
  );
};

export default Home;