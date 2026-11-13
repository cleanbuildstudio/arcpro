import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Products from "./components/Products";
import Faq from "./components/Faq";
import Article from "./components/Article";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Projects />
      <Products />
      <Faq />
      <Article />
      <Footer />
    </main>
  );
}
