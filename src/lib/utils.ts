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
      ? [-3.2, -3.5, 1.2]
      : isMobile
        ? [-4, -3.8, 1.2]
        : isTablet
          ? [5, -5, 0]
          : [9, -5.5, 0],
    ringPosition: isSmall
      ? [-3.5, 3.1, 1.4]
      : isMobile
        ? [-4.2, 3.6, 1.4]
        : isTablet
          ? [-12, 10, 0]
          : [-24, 10, 0],
    targetPosition: isSmall
      ? [3.3, -3.8, -3.5]
      : isMobile
        ? [4.2, -4.4, -3.5]
        : isTablet
          ? [-11, -7, -10]
          : [-13, -13, -10],
    blitzBallPosition: isSmall
      ? [3.25, 1.8, 1.5]
      : isMobile
        ? [4, 2.2, 1.5]
        : isTablet
          ? [-7, 2.8, -1]
          : [-10.5, 2.2, -1],
  };
}
