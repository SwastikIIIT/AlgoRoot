"use client";

import React from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export function AnimatedGridContainer({
  children,
  gridClassName,
  gridOptions = {},
  containerClassName,
}) {
  const {
    numSquares = 50,
    maxOpacity = 0.1,
    duration = 3,
    repeatDelay = 0.5,
    width,
    height,
    x,
    y,
    strokeDasharray,
  } = gridOptions;

  return (
    <div className={cn("relative", containerClassName)}>
      <AnimatedGridPattern
        numSquares={numSquares}
        maxOpacity={maxOpacity}
        duration={duration}
        repeatDelay={repeatDelay}
        width={width}
        height={height}
        x={x}
        y={y}
        strokeDasharray={strokeDasharray}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "absolute inset-0 z-0",
          gridClassName
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default AnimatedGridContainer;
