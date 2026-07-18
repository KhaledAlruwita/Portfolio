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
          ? [4.5, -4, 0.5]
          : [7.2, -4.1, 0.5],
    ringPosition: isSmall
      ? [-3.5, 3.1, 1.4]
      : isMobile
        ? [-4.2, 3.6, 1.4]
        : isTablet
          ? [-5.5, 5, 0.5]
          : [-10.5, 6.2, 0.5],
    targetPosition: isSmall
      ? [3.3, -3.8, -3.5]
      : isMobile
        ? [4.2, -4.4, -3.5]
        : isTablet
          ? [-5.5, -5, -6]
          : [-8.5, -6, -7],
    blitzBallPosition: isSmall
      ? [3.25, 1.8, 1.5]
      : isMobile
        ? [4, 2.2, 1.5]
        : isTablet
          ? [-5.5, 2, 0]
          : [-7.5, 1.5, 0],
  };
}
