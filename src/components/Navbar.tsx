import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    // Initialize ScrollSmoother with better error handling
    const initSmoother = () => {
      try {
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.7,
          speed: 1.7,
          effects: true,
          autoResize: true,
          ignoreMobileResize: true,
        });

        smoother.scrollTop(0);
        smoother.paused(false); // Enable smoother immediately
      } catch (error) {
        console.warn("ScrollSmoother initialization failed:", error);
      }
    };

    // Wait for DOM to be ready
    setTimeout(initSmoother, 100);

    // Setup navigation links
    const setupNavigation = () => {
      let links = document.querySelectorAll(".header ul a");
      links.forEach((elem) => {
        let element = elem as HTMLAnchorElement;
        
        // Remove existing listeners first
        const handleClick = (e: Event) => {
          e.preventDefault();
          let target = e.currentTarget as HTMLAnchorElement;
          let section = target.getAttribute("data-href");
          
          if (section) {
            if (smoother && window.innerWidth > 1024) {
              // Use ScrollSmoother for desktop
              smoother.scrollTo(section, true, "top top");
            } else {
              // Fallback to regular scroll for mobile or if smoother fails
              const targetElement = document.querySelector(section);
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }
            }
          }
        };

        element.addEventListener("click", handleClick);
        
        // Store the handler for cleanup
        (element as any)._handleClick = handleClick;
      });
    };

    // Setup navigation after a short delay
    setTimeout(setupNavigation, 200);

    const handleResize = () => {
      if (smoother) {
        ScrollSmoother.refresh(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      
      // Clean up navigation listeners
      let links = document.querySelectorAll(".header ul a");
      links.forEach((elem) => {
        let element = elem as HTMLAnchorElement;
        if ((element as any)._handleClick) {
          element.removeEventListener("click", (element as any)._handleClick);
        }
      });
      
      // Kill smoother if it exists
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Deepak Kandpal
        </a>
        <a
          href="mailto:d.kandpal1832@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          d.kandpal1832@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
