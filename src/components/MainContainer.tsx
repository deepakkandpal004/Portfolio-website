import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Skills from "./Skills";
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
    <GitHubDashboard />
    <BlogPreview />
    <Contact />
  </main>
);

export default MainContainer;
