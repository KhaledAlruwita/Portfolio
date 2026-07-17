import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSizes(
  isSmall: boolean,
  isMobile: boolean,
  isTablet: boolean
) {
  return {
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
        ? [5, -5, 0]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
        ? [-10, 10, 0]
        : isTablet
          ? [-12, 10, 0]
          : [-24, 10, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
        ? [-9, -10, -10]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
    blitzBallPosition: isSmall
      ? [-4.2, 2.4, -2]
      : isMobile
        ? [-5.5, 2.7, -2]
        : isTablet
          ? [-7, 2.8, -1]
          : [-10.5, 2.2, -1],
  };
}
