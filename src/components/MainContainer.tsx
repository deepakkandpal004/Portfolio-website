import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
import Terminal from "./Terminal";
import GitHubDashboard from "./GitHubDashboard";
import Work from "./Work";
import BlogPreview from "./BlogPreview";
import Contact from "./Contact";

const MainContainer = () => (
  <main>
    <Hero />
    <Work />
    <About />
    <Experience />
    <Skills />
    <Terminal />
    <GitHubDashboard />
    <BlogPreview />
    <Contact />
  </main>
);

export default MainContainer;
