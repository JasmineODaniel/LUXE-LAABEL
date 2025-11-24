import PromoBar from "./components/layout/PromoBar";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import FlashSales from "./components/home/FlashSales";
import Categories from "./components/home/Categories";
import BestSelling from "./components/home/BestSelling";
import MusicPromo from "./components/home/MusicPromo";
import ExploreProducts from "./components/home/ExploreProducts";
import NewArrival from "./components/home/NewArrival";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="font-sans">
      <PromoBar />
      <Navbar />

      <main>
        <Hero />
        <FlashSales />
        <Categories />
        <BestSelling />
        <MusicPromo />
        <ExploreProducts />
        <NewArrival />
      </main>

      <Footer />
    </div>
  );
}

export default App;
