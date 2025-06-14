import { cn } from "@/lib/utils";
import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

export function Spinner({ size = "md", className, color }: SpinnerProps) {
  // Size mapping in pixels
  const sizeValues = {
    sm: "30px",
    md: "45px",
    lg: "60px",
    xl: "75px",
  };

  // Create 13 particle elements
  const particles = Array.from({ length: 13 }).map((_, i) => (
    <div key={i} className="particle" />
  ));

  return (
    <div
      className={cn("spinner-container", className)}
      style={
        {
          "--uib-size": sizeValues[size],
          "--uib-color": color || "currentColor",
          "--uib-speed": "1.75s",
        } as React.CSSProperties
      }
      aria-label="Loading..."
    >
      {particles}

      <style jsx>{`
        .spinner-container {
          position: relative;
          height: var(--uib-size);
          width: var(--uib-size);
          animation: rotate calc(var(--uib-speed) * 4) linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .particle {
          position: absolute;
          top: 0%;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        .particle:nth-child(1) {
          --uib-delay: 0;
          transform: rotate(8deg);
        }
        .particle:nth-child(2) {
          --uib-delay: -0.4;
          transform: rotate(36deg);
        }
        .particle:nth-child(3) {
          --uib-delay: -0.9;
          transform: rotate(72deg);
        }
        .particle:nth-child(4) {
          --uib-delay: -0.5;
          transform: rotate(90deg);
        }
        .particle:nth-child(5) {
          --uib-delay: -0.3;
          transform: rotate(144deg);
        }
        .particle:nth-child(6) {
          --uib-delay: -0.2;
          transform: rotate(180deg);
        }
        .particle:nth-child(7) {
          --uib-delay: -0.6;
          transform: rotate(216deg);
        }
        .particle:nth-child(8) {
          --uib-delay: -0.7;
          transform: rotate(252deg);
        }
        .particle:nth-child(9) {
          --uib-delay: -0.1;
          transform: rotate(300deg);
        }
        .particle:nth-child(10) {
          --uib-delay: -0.8;
          transform: rotate(324deg);
        }
        .particle:nth-child(11) {
          --uib-delay: -1.2;
          transform: rotate(335deg);
        }
        .particle:nth-child(12) {
          --uib-delay: -0.5;
          transform: rotate(290deg);
        }
        .particle:nth-child(13) {
          --uib-delay: -0.2;
          transform: rotate(240deg);
        }

        .particle::before {
          content: "";
          position: absolute;
          height: 17.5%;
          width: 17.5%;
          border-radius: 50%;
          background-color: var(--uib-color);
          flex-shrink: 0;
          transition: background-color 0.3s ease;
          --uib-d: calc(var(--uib-delay) * var(--uib-speed));
          animation: orbit var(--uib-speed) linear var(--uib-d) infinite;
        }

        @keyframes orbit {
          0% {
            transform: translate(calc(var(--uib-size) * 0.5)) scale(0.73684);
            opacity: 0.65;
          }
          5% {
            transform: translate(calc(var(--uib-size) * 0.4)) scale(0.684208);
            opacity: 0.58;
          }
          10% {
            transform: translate(calc(var(--uib-size) * 0.3)) scale(0.631576);
            opacity: 0.51;
          }
          15% {
            transform: translate(calc(var(--uib-size) * 0.2)) scale(0.578944);
            opacity: 0.44;
          }
          20% {
            transform: translate(calc(var(--uib-size) * 0.1)) scale(0.526312);
            opacity: 0.37;
          }
          25% {
            transform: translate(0%) scale(0.47368);
            opacity: 0.3;
          }
          30% {
            transform: translate(calc(var(--uib-size) * -0.1)) scale(0.526312);
            opacity: 0.37;
          }
          35% {
            transform: translate(calc(var(--uib-size) * -0.2)) scale(0.578944);
            opacity: 0.44;
          }
          40% {
            transform: translate(calc(var(--uib-size) * -0.3)) scale(0.631576);
            opacity: 0.51;
          }
          45% {
            transform: translate(calc(var(--uib-size) * -0.4)) scale(0.684208);
            opacity: 0.58;
          }
          50% {
            transform: translate(calc(var(--uib-size) * -0.5)) scale(0.73684);
            opacity: 0.65;
          }
          55% {
            transform: translate(calc(var(--uib-size) * -0.4)) scale(0.789472);
            opacity: 0.72;
          }
          60% {
            transform: translate(calc(var(--uib-size) * -0.3)) scale(0.842104);
            opacity: 0.79;
          }
          65% {
            transform: translate(calc(var(--uib-size) * -0.2)) scale(0.894736);
            opacity: 0.86;
          }
          70% {
            transform: translate(calc(var(--uib-size) * -0.1)) scale(0.947368);
            opacity: 0.93;
          }
          75% {
            transform: translate(0%) scale(1);
            opacity: 1;
          }
          80% {
            transform: translate(calc(var(--uib-size) * 0.1)) scale(0.947368);
            opacity: 0.93;
          }
          85% {
            transform: translate(calc(var(--uib-size) * 0.2)) scale(0.894736);
            opacity: 0.86;
          }
          90% {
            transform: translate(calc(var(--uib-size) * 0.3)) scale(0.842104);
            opacity: 0.79;
          }
          95% {
            transform: translate(calc(var(--uib-size) * 0.4)) scale(0.789472);
            opacity: 0.72;
          }
          100% {
            transform: translate(calc(var(--uib-size) * 0.5)) scale(0.73684);
            opacity: 0.65;
          }
        }
      `}</style>
    </div>
  );
}
