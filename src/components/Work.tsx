import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    // Wait for layout to be ready
    setTimeout(() => {
      setTranslateX();
      
      if (translateX > 0) {
        let timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-section",
            start: "top top",
            end: `+=${translateX}`,
            scrub: 1, // Smoother scrubbing
            pin: true,
            id: "work",
            anticipatePin: 1,
            refreshPriority: -1,
          },
        });

        timeline.to(".work-flex", {
          x: -translateX,
          ease: "none",
        });

        // Clean up function
        return () => {
          timeline.kill();
          ScrollTrigger.getById("work")?.kill();
        };
      }
    }, 100);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>

                <div>
                  <h4>AI Resume Builder</h4>
                  <p>Full Stack Web Application</p>
                </div>
              </div>
              <h4>Tech Stack</h4>
              <p>React.js, Tailwind CSS, Node.js, Express.js, MongoDB, Google Gemini API, ImageKit</p>
              <h4>Key Features</h4>
              <p>• AI-powered resume generation and enhancement</p>
              <p>• JWT authentication for secure user sessions</p>
              <p>• Resume Management Dashboard</p>
              <p>• ImageKit integration for profile images</p>
              <div className="project-links" style={{marginTop: "15px"}}>
                <a href="#" style={{color: "var(--accentColor)", marginRight: "15px"}}>Live Demo</a>
                <a href="https://github.com/deepakkandpal004" style={{color: "var(--accentColor)"}}>GitHub</a>
              </div>
            </div>
            <WorkImage image="/images/resumebuilder.webp" alt="AI Resume Builder" />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>

                <div>
                  <h4>AI Powered Expense Tracker</h4>
                  <p>Full Stack Web Application</p>
                </div>
              </div>
              <h4>Tech Stack</h4>
              <p>Next.js, React.js, Tailwind CSS, Neon PostgreSQL, Clerk Authentication, OpenRouter API</p>
              <h4>Key Features</h4>
              <p>• AI-powered financial insights and budgeting suggestions</p>
              <p>• Real-time expense tracking dashboard</p>
              <p>• Secure authentication with Clerk</p>
              <p>• Deployed on Vercel with CI/CD</p>
              <div className="project-links" style={{marginTop: "15px"}}>
                <a href="#" style={{color: "var(--accentColor)", marginRight: "15px"}}>Live Demo</a>
                <a href="https://github.com/deepakkandpal004" style={{color: "var(--accentColor)"}}>GitHub</a>
              </div>
            </div>
            <WorkImage image="/images/expenseTracker.webp" alt="AI Expense Tracker" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
