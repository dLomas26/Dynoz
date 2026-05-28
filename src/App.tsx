import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoBar from './components/LogoBar';
import Features from './components/Features';
import Products from './components/Products';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-950">
      <div className="noise-overlay" />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Features />
        <Products />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
