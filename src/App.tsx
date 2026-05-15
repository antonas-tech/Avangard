import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Spaces } from "./components/Spaces";
import { Menu } from "./components/Menu";
import { NightVibe } from "./components/NightVibe";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./lib/SmoothScroll";
import { ThemeProvider } from "./lib/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="grain relative min-h-screen font-sans">
        <SmoothScroll />
        <Header />
        <main>
          <Hero />
          <Spaces />
          <Menu />
          <NightVibe />
          <Booking />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
