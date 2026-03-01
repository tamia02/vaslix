import './styles/index.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/capabilities.css';
import './styles/agent-studio.css';
import './styles/dashboard.css';
import './styles/results.css';
import './styles/pricing.css';
import './styles/faq.css';
import './styles/about-contact.css';
import './styles/sections.css';
import './styles/footer.css';
import './styles/skeleton.css';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Results } from './sections/Results';
import { AgentStudio } from './sections/AgentStudio';
import { Capabilities } from './sections/Capabilities';
import { Pricing } from './sections/Pricing';
import { Dashboard } from './sections/Dashboard';
import { AboutUs } from './sections/AboutUs';
import { FAQ } from './sections/FAQ';
import { ContactUs } from './sections/ContactUs';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
    useSmoothScroll();

    return (
        <main className="app">
            <SEO />
            <Navbar />
            <Hero />
            <Results />
            <AgentStudio />
            <Capabilities />
            <Pricing />
            <Dashboard />
            <AboutUs />
            <FAQ />
            <ContactUs />
            <Footer />
        </main>
    );
}

export default App;
