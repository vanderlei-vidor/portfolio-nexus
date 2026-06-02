"use client";

import "./EngineeringDNA.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const layers = [
  {
    title: "Experience Layer",
    glow: "blue",
    technologies: [
      "React",
      "Next.js",
      "GSAP",
      "Framer Motion",
    ],
  },

  {
    title: "Intelligence Layer",
    glow: "purple",
    technologies: [
      "AI Systems",
      "Prompt Engineering",
      "OpenAI",
      "Automation",
    ],
  },

  {
    title: "Application Layer",
    glow: "cyan",
    technologies: [
      "Spring Boot",
      "REST APIs",
      "Architecture",
      "Business Logic",
    ],
  },

  {
    title: "Data Layer",
    glow: "teal",
    technologies: [
      "PostgreSQL",
      "Analytics",
      "Persistence",
      "Modeling",
    ],
  },

  {
    title: "Deployment Layer",
    glow: "white",
    technologies: [
      "Docker",
      "Cloud",
      "CI/CD",
      "Scalability",
    ],
  },
];

export default function EngineeringDNA() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /*
      ==========================================
      NEXUS CORE BOOT
      ==========================================
      */

      const bootTl = gsap.timeline();

      bootTl
        .from(".engineering-dna__label", {
          opacity: 0,
          y: 30,
          duration: 0.6,
        })

        .from(".engineering-dna__title", {
          opacity: 0,
          y: 60,
          duration: 1,
        }, "-=0.3")

        .from(".system-boot", {
          opacity: 0,
          y: 20,
          duration: 0.5,
        }, "-=0.5")

        .from(".engineering-dna__description", {
          opacity: 0,
          y: 30,
          duration: 0.8,
        }, "-=0.4")

        .from(".nexus-core", {
          scale: 0,
          opacity: 0,
          duration: 1.4,
          ease: "back.out(2)",
        }, "-=0.4");

      /*
      ==========================================
      NEXUS ROTATION
      ==========================================
      */

      gsap.to(".nexus-core__ring", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".nexus-core__ring--delay", {
        rotate: -360,
        duration: 15,
        repeat: -1,
        ease: "none",
      });

      /*
      ==========================================
      ENERGY PULSE
      ==========================================
      */

      gsap.to(".nexus-core__energy", {
        scale: 1.2,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });

      /*
      ==========================================
      ENERGY LINE FILL
      ==========================================
      */

      gsap.to(".engineering-dna__line-fill", {
        height: "100%",
        ease: "none",

        scrollTrigger: {
          trigger: ".engineering-dna__layers",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      /*
      ==========================================
      PARTICLE DESCENDO
      ==========================================
      */

      gsap.to(".engineering-dna__line-particle", {

        y: () =>
          document.querySelector(
            ".engineering-dna__layers"
          )?.scrollHeight || 1000,

        repeat: -1,

        duration: 4,

        ease: "none",
      });

      /*
      ==========================================
      LAYERS
      ==========================================
      */

      gsap.utils
        .toArray<HTMLElement>(".dna-layer")
        .forEach((layer) => {

          gsap.from(layer, {

            opacity: 0,

            y: 120,

            scale: 0.9,

            duration: 1.2,

            ease: "power3.out",

            scrollTrigger: {
              trigger: layer,
              start: "top 80%",
              toggleClass: {
                targets: layer,
                className: "active",
              },
            },
          });

        });

      /*
      ==========================================
      CHIPS CASCADE
      ==========================================
      */

      gsap.utils
        .toArray<HTMLElement>(".dna-layer")
        .forEach((layer) => {

          const chips =
            layer.querySelectorAll(
              ".dna-layer__chip"
            );

          gsap.from(chips, {

            opacity: 0,

            y: 25,

            scale: 0.7,

            stagger: 0.08,

            duration: 0.5,

            ease: "back.out(2)",

            scrollTrigger: {
              trigger: layer,
              start: "top 75%",
            },
          });

        });

      /*
      ==========================================
      ENERGY NODES
      ==========================================
      */

      gsap.utils
        .toArray<HTMLElement>(".energy-node")
        .forEach((node) => {

          gsap.to(node, {

            scale: 1.6,

            opacity: 0.4,

            repeat: -1,

            yoyo: true,

            duration: 1.2,

            ease: "power1.inOut",
          });

        });

      /*
      ==========================================
      MANIFESTO
      ==========================================
      */

      gsap.from(
        ".engineering-dna__manifesto",
        {
          opacity: 0,

          y: 80,

          duration: 1.2,

          scrollTrigger: {
            trigger:
              ".engineering-dna__manifesto",

            start: "top 85%",
          },
        }
      );

      /*
      ==========================================
      PARALLAX GLOW
      ==========================================
      */

      gsap.to(".engineering-dna__glow--1", {

        yPercent: 25,

        ease: "none",

        scrollTrigger: {
          trigger: ".engineering-dna",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".engineering-dna__glow--2", {

        yPercent: -25,

        ease: "none",

        scrollTrigger: {
          trigger: ".engineering-dna",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (
    <section
      ref={sectionRef}
      className="engineering-dna"
    >
      {/* BACKGROUND FX */}

      <div className="engineering-dna__background" />

      <div className="engineering-dna__grid" />

      <div className="engineering-dna__glow engineering-dna__glow--1" />

      <div className="engineering-dna__glow engineering-dna__glow--2" />

      <div className="engineering-dna__container">

        {/* HEADER */}

        <span className="engineering-dna__label">
          ENGINEERING DNA
        </span>

        <h2 className="engineering-dna__title">
          Engineered
          <br />
          For Experiences
        </h2>

        <div className="system-boot">
          INITIALIZING NEXUS ARCHITECTURE...
        </div>

        <p className="engineering-dna__description">
          Every product is built upon a living
          architecture where intelligence,
          engineering and scalable systems
          converge into a single ecosystem.
        </p>

        {/* NEXUS CORE */}

        <div className="nexus-core">

          <div className="nexus-core__ring" />

          <div className="nexus-core__ring nexus-core__ring--delay" />

          <div className="nexus-core__pulse" />

          <div className="nexus-core__energy" />

          <div className="nexus-core__inner">

            <span>NEXUS</span>

          </div>

        </div>

        {/* ARCHITECTURE */}

        <div className="engineering-dna__layers">

          {/* ENERGY LINE */}

          <div className="engineering-dna__line">

            <div className="engineering-dna__line-fill" />

            <div className="engineering-dna__line-particle" />

          </div>

          {layers.map((layer) => (
            <div
              key={layer.title}
              className={`dna-layer dna-layer--${layer.glow}`}
            >
              {/* ENERGY NODE */}

              <div className="energy-node" />

              {/* HEADER */}

              <div className="dna-layer__header">

                <div className="dna-layer__status" />

                <h3>{layer.title}</h3>

              </div>

              {/* TECHS */}

              <div className="dna-layer__techs">

                {layer.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="dna-layer__chip"
                  >
                    {tech}
                  </span>
                ))}

              </div>

            </div>
          ))}
        </div>

        {/* MANIFESTO */}

        <div className="engineering-dna__manifesto">

          <span>
            Technology is not the destination.
          </span>

          <span>
            It is the foundation.
          </span>

        </div>

      </div>
    </section>
  );
}