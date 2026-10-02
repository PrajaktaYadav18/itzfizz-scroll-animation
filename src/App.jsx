import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import carImage from "./assets/car.png";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const carRef = useRef(null);
  const statsRef = useRef(null);
  const scrollRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // =========================================
      // PAGE LOAD ANIMATION
      // =========================================

      const introTimeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      introTimeline
        .from(navRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          eyebrowRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.35"
        )
        .from(
          titleRef.current.children,
          {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          subtitleRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.65"
        )
        .from(
          carRef.current,
          {
            scale: 0.75,
            opacity: 0,
            y: 100,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .from(
          statsRef.current.children,
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
          },
          "-=0.7"
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        );

      // =========================================
      // SCROLL INDICATOR
      // =========================================

      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // =========================================
      // RESPONSIVE SCROLL ANIMATION
      // =========================================

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop, tablet, mobile } = context.conditions;

          let carX = 340;
          let carY = -90;
          let carScale = 0.78;
          let titleY = -130;

          if (tablet) {
            carX = 200;
            carY = -70;
            carScale = 0.82;
            titleY = -90;
          }

          if (mobile) {
            carX = 65;
            carY = -45;
            carScale = 0.9;
            titleY = -55;
          }

          // =====================================
          // CAR SCROLL MOVEMENT
          // =====================================

          gsap.to(carRef.current, {
            x: carX,
            y: carY,
            scale: carScale,
            rotate: desktop ? 5 : 3,
            ease: "none",

            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          // =====================================
          // TITLE PARALLAX
          // =====================================

          gsap.to(titleRef.current, {
            y: titleY,
            opacity: mobile ? 0.3 : 0.18,
            ease: "none",

            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

          // =====================================
          // SUBTITLE PARALLAX
          // =====================================

          gsap.to(subtitleRef.current, {
            y: mobile ? -25 : -45,
            opacity: 0.4,
            ease: "none",

            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      );

      // =========================================
      // SCROLL PROGRESS
      // =========================================

      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: "left center",
        ease: "none",

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="site">

      {/* =========================================
          HERO
      ========================================= */}

      <section
        ref={heroRef}
        className="hero"
      >

        {/* Background Grid */}
        <div className="hero-grid" />

        {/* Background Giant Text */}
        <div className="background-word">
          ITZFIZZ
        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}

        <nav
          ref={navRef}
          className="navbar"
        >
          <div className="logo">
            ITZ<span>FIZZ</span>
          </div>

          <div className="nav-center">
            DIGITAL EXPERIENCE
          </div>

          <div className="menu-button">
            <span />
            <span />
          </div>
        </nav>

        {/* =====================================
            TOP EYEBROW
        ===================================== */}

        <div
          ref={eyebrowRef}
          className="eyebrow"
        >
          <span className="eyebrow-line" />
          <span>CREATIVE DIGITAL STUDIO</span>
        </div>

        {/* =====================================
            MAIN TITLE
        ===================================== */}

        <div
          ref={titleRef}
          className="hero-title"
        >
          <div className="title-line">
            W E L C O M E
          </div>

          <div className="title-line title-outline">
            I T Z F I Z Z
          </div>
        </div>

        {/* =====================================
            SUBTITLE
        ===================================== */}

        <div
          ref={subtitleRef}
          className="hero-subtitle"
        >
          <p>
            We create digital experiences
            <br />
            designed to move people.
          </p>
        </div>

        {/* =====================================
            CIRCLE HUD
        ===================================== */}

        <div className="hud-circle">
          <div className="hud-ring hud-ring-one" />
          <div className="hud-ring hud-ring-two" />

          <div className="hud-dot" />

          <span className="hud-label hud-top">
            01
          </span>

          <span className="hud-label hud-bottom">
            MOTION
          </span>
        </div>

        {/* =====================================
            CAR
        ===================================== */}

        <div
          ref={carRef}
          className="car-wrapper"
        >
          <div className="car-shadow" />

          <img
            src={carImage}
            alt="Modern car"
          />
        </div>

        {/* =====================================
            SCROLL INDICATOR
        ===================================== */}

        <div
          ref={scrollRef}
          className="scroll-indicator"
        >
          <span>SCROLL TO EXPLORE</span>
          <strong>↓</strong>
        </div>

        {/* =====================================
            SIDE NUMBER
        ===================================== */}

        <div className="side-number">
          <span>01</span>
          <span>/</span>
          <span>02</span>
        </div>

        {/* =====================================
            STATS
        ===================================== */}

        <div
          ref={statsRef}
          className="stats"
        >
          <div className="stat">
            <span className="stat-number">
              95%
            </span>

            <span className="stat-label">
              ENGAGEMENT
            </span>
          </div>

          <div className="stat">
            <span className="stat-number">
              80%
            </span>

            <span className="stat-label">
              PERFORMANCE
            </span>
          </div>

          <div className="stat">
            <span className="stat-number">
              100%
            </span>

            <span className="stat-label">
              EXPERIENCE
            </span>
          </div>
        </div>

        {/* =====================================
            PROGRESS BAR
        ===================================== */}

        <div className="progress-track">
          <div
            ref={progressRef}
            className="progress-bar"
          />
        </div>

      </section>

      {/* =========================================
          SECOND SECTION
      ========================================= */}

      <section className="experience-section">

        <div className="experience-content">

          <p className="section-number">
            02 — EXPERIENCE
          </p>

          <h2>
            DIGITAL
            <br />
            <span>IN MOTION.</span>
          </h2>

          <p className="experience-description">
            Scroll-driven interaction brings together
            motion, design and technology to create
            engaging digital experiences.
          </p>

          <div className="experience-line" />

        </div>

      </section>

    </main>
  );
}

export default App;