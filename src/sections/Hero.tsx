import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ColorBends from "@/components/ColorBends";

export function Hero() {
  const [isDigitalHovered, setIsDigitalHovered] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden rounded-b-[2rem] bg-[hsl(var(--background))] pt-24 sm:rounded-b-[2.6rem] sm:pt-28 lg:rounded-b-[3rem] transition-colors duration-300"
    >
      <div className="absolute inset-0">
        <ColorBends
          className="h-full w-full"
        />
      </div>

      {/* Overlay: less purple, more gold/navy/green in dark mode */}
      {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.10)_0%,hsl(var(--foreground)/0.18)_68%,hsl(var(--foreground)/0.22)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(0, 0, 0, 0)_0%,rgba(0,13,31,0.22)_68%,rgba(124,255,103,0.13)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--foreground)/0.10)_0%,hsl(var(--foreground)/0.18)_45%,hsl(var(--foreground)/0.22)_100%)] dark:bg-[linear-gradient(180deg,rgba(0, 0, 0, 0.22)_0%,rgba(0, 0, 0, 0.22)_45%,rgba(0, 0, 0, 0.13)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,rgba(0, 0, 0, 0.18)_1px,transparent_1px)] [background-size:3px_3px] dark:opacity-[0.22]" /> */}
      <div className="pointer-events-none absolute inset-0 dark:bg-gray-900/50 bg-gray-200/50"></div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col items-center justify-center px-6 pb-20 text-center">
        <h1 className="font-['Space_Grotesk'] text-5xl font-bold uppercase leading-[0.92] tracking-tight text-[hsl(var(--foreground))] sm:text-6xl lg:text-8xl">
          <span className="block">
          We Build And <span className="text-primary italic">Scale</span>
          </span>
          <span
            className="relative mt-2 inline-block px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-3.5"
            onMouseEnter={() => setIsDigitalHovered(true)}
            onMouseLeave={() => setIsDigitalHovered(false)}
          >
            <span className="relative z-10 block">Digital Products</span>

            <motion.svg
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -left-1.5 -top-1.5 h-8 w-8 sm:-left-2 sm:-top-2 sm:h-9 sm:w-9 lg:-left-2.5 lg:-top-2.5 lg:h-10 lg:w-10"
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isDigitalHovered ? 1 : 0.42,
                scale: isDigitalHovered ? 1 : 0.9,
                x: isDigitalHovered ? 0 : -1,
                y: isDigitalHovered ? 0 : -1,
              }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.path
                d="M106 16 C 84 14, 56 16, 16 16"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.path
                d="M16 14 C 14 42, 16 72, 16 106"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.02,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M94 25 C 70 24, 46 26, 23 26"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M24 25 C 22 46, 24 68, 24 94"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.svg>

            <motion.svg
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -right-1.5 -top-1.5 h-8 w-8 sm:-right-2 sm:-top-2 sm:h-9 sm:w-9 lg:-right-2.5 lg:-top-2.5 lg:h-10 lg:w-10"
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isDigitalHovered ? 1 : 0.42,
                scale: isDigitalHovered ? 1 : 0.9,
                x: isDigitalHovered ? 0 : 1,
                y: isDigitalHovered ? 0 : -1,
              }}
              transition={{
                duration: 0.26,
                delay: 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.path
                d="M14 16 C 36 14, 64 16, 104 16"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.02,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M104 14 C 106 42, 104 72, 104 106"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M26 25 C 50 24, 74 26, 96 26"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M96 25 C 98 46, 96 68, 96 94"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.svg>

            <motion.svg
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-8 w-8 sm:-bottom-2 sm:-left-2 sm:h-9 sm:w-9 lg:-bottom-2.5 lg:-left-2.5 lg:h-10 lg:w-10"
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isDigitalHovered ? 1 : 0.42,
                scale: isDigitalHovered ? 1 : 0.9,
                x: isDigitalHovered ? 0 : -1,
                y: isDigitalHovered ? 0 : 1,
              }}
              transition={{
                duration: 0.26,
                delay: 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.path
                d="M106 104 C 82 102, 58 104, 16 104"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M16 104 C 14 76, 16 48, 16 16"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M92 94 C 68 92, 46 94, 24 94"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M24 94 C 22 72, 24 50, 24 26"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.svg>

            <motion.svg
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-8 w-8 sm:-bottom-2 sm:-right-2 sm:h-9 sm:w-9 lg:-bottom-2.5 lg:-right-2.5 lg:h-10 lg:w-10"
              aria-hidden="true"
              initial={false}
              animate={{
                opacity: isDigitalHovered ? 1 : 0.42,
                scale: isDigitalHovered ? 1 : 0.9,
                x: isDigitalHovered ? 0 : 1,
                y: isDigitalHovered ? 0 : 1,
              }}
              transition={{
                duration: 0.26,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.path
                d="M14 104 C 38 102, 62 104, 104 104"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M104 104 C 106 76, 104 48, 104 16"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.3,
                  opacity: isDigitalHovered ? 0.9 : 0.55,
                }}
                transition={{
                  duration: 0.34,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M28 94 C 52 92, 74 94, 96 94"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <motion.path
                d="M96 94 C 98 72, 96 50, 96 26"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{
                  pathLength: isDigitalHovered ? 1 : 0.35,
                  opacity: isDigitalHovered ? 0.55 : 0.35,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </motion.svg>
          </span>
        </h1>

        <p className="mt-8 max-w-3xl text-base text-[hsl(var(--muted-foreground))] sm:text-lg">
          Founding successful companies by combining ideas with business
          expertise, capital and technical execution.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="h-12 rounded-full bg-primary px-10 text-base font-semibold text-white dark:text-black shadow-[0_10px_30px_hsl(var(--primary)/0.45)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#services")}
            className="h-12 rounded-full border-primary/80 bg-[hsl(var(--background)/0.10)] px-10 text-base font-semibold text-[hsl(var(--foreground))] backdrop-blur-md transition-colors duration-300 hover:bg-primary/15 hover:text-[hsl(var(--foreground))]"
          >
            Our Case Study
          </Button>
        </div>
      </div>
    </section>
  );
}
