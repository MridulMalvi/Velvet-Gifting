import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OccasionGrid from "@/components/OccasionGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import ValueProps from "@/components/ValueProps";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>GiftVelvet - Premium Online Gifting | Find the Perfect Gift</title>
        <meta
          name="description"
          content="Discover curated gifts for every occasion. Premium packaging, same-day delivery, and personalized messages. Make every moment unforgettable with GiftVelvet."
        />
        <meta
          name="keywords"
          content="gifts, premium gifts, birthday gifts, anniversary gifts, wedding gifts, corporate gifts"
        />
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <OccasionGrid />
        <FeaturedProducts />
        <ValueProps />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
