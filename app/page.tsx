import Footer from "./components/Footer";
import HeroPage from "./components/HeroPage";
import HowItWorks from "./components/HowItWorks";
import NavBar from "./components/NavBar";
import Partners from "./components/Partners";
import PricingPage from "./components/PricingPage";
import ProblemPage from "./components/ProblemPage";
import Testimonial from "./components/Testimonial";
import TheComparisonTable from "./components/TheComparisonTable";
import TheLocalContext from "./components/TheLocalContext";


export default function Home() {
  return (
    <>
      <NavBar />
      <HeroPage />
      <ProblemPage />
      <HowItWorks />
      <TheLocalContext />
      <PricingPage />
      <TheComparisonTable />
      <Testimonial />
      <Partners />
      <Footer />
    </>
  );
}
