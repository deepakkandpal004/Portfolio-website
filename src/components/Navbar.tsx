import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Simple scroll smoother fallback
export let smoother: any = {
  scrollTo: (target: string, smooth?: boolean) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  },
  scrollTop: (value?: number) => {
    if (value !== undefined) {
      window.scrollTo({ top: value, behavior: 'smooth' });
    }
    return window.scrollY;
  },
  paused: () => false,
  kill: () => {},
};

const Navbar = () => {
  useEffect(() => {
    // Setup navigation links
    const setupNavigation = () => {
      let links = document.querySelectorAll(".header ul a");
      links.forEach((elem) => {
        let element = elem as HTMLAnchorElement;
        
        const handleClick = (e: Event) => {
          e.preventDefault();
          let target = e.currentTarget as HTMLAnchorElement;
          let section = target.getAttribute("data-href");
          
          if (section) {
            const targetElement = document.querySelector(section);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }
          }
        };

        element.addEventListener("click", handleClick);
        (element as any)._handleClick = handleClick;
      });
    };

    setTimeout(setupNavigation, 200);

    // Cleanup function
    return () => {
      let links = document.querySelectorAll(".header ul a");
      links.forEach((elem) => {
        let element = elem as HTMLAnchorElement;
        if ((element as any)._handleClick) {
          element.removeEventListener("click", (element as any)._handleClick);
        }
      });
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
