import type { PropsWithChildren } from "react";

import { cn } from "../lib/utils";

interface ButtonProps {
  onClick?: () => void;
  href?: string;
  isBeam?: boolean;
  containerClass?: string;
  target?: "_blank" | "_self";
}

export const Button = ({
  onClick,
  href,
  children,
  isBeam = false,
  containerClass,
  target = "_self",
}: PropsWithChildren<ButtonProps>) => {
  if (href)
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? "noreferrer noopener" : undefined}
        className={cn("btn hover:opacity-85", containerClass)}
      >
        {isBeam && (
          <span className="relative flex size-3">
            <div className="btn-ping" />
            <div className="btn-ping_dot" />
          </span>
        )}

        {children}
      </a>
    );

  return (
    <button
      onClick={onClick}
      className={cn("btn hover:opacity-85", containerClass)}
    >
      {isBeam && (
        <span className="relative flex size-3">
          <div className="btn-ping" />
          <div className="btn-ping_dot" />
        </span>
      )}

      {children}
    </button>
  );
};
