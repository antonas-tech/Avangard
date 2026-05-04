import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { Collections } from "./components/Collections";
import { Materials } from "./components/Materials";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./lib/SmoothScroll";

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-sand-100 font-sans text-graphite">
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Collections />
        <Materials />
      </main>
      <Footer />
    </div>
  );
}
