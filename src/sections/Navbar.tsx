import { useState } from "react";

import { navLinks } from "../constants";
import { referenceAsset } from "../constants/assets";
import { cn } from "../lib/utils";

interface NavItemsProps {
  onNavigate: () => void;
}

const NavItems = ({ onNavigate }: NavItemsProps) => (
  <ul className="nav-ul">
    {navLinks.map(({ id, href, name }) => (
      <li key={id} className="nav-li">
        <a href={href} className="nav-li_a" onClick={onNavigate}>
          {name}
        </a>
      </li>
    ))}
  </ul>
);

export const Navbar = ({
  onRevealSections,
}: {
  onRevealSections: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevOpen) => !prevOpen);
  const closeMenu = () => {
    onRevealSections();
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl">
        <div className="c-space mx-auto flex items-center justify-between py-5">
          <a
            href="#"
            className="text-xl font-bold text-neutral-400 transition-colors hover:text-white"
          >
            Khaled Alruwita
          </a>

          <button
            onClick={toggleMenu}
            className="flex text-neutral-400 hover:text-white sm:hidden"
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <img
              src={
                isOpen
                  ? referenceAsset("assets/close.svg")
                  : referenceAsset("assets/menu.svg")
              }
              alt="Toggle"
              className="size-6"
            />
          </button>

          <nav className="hidden sm:flex">
            <NavItems onNavigate={closeMenu} />
          </nav>
        </div>
      </div>

      <div className={cn("nav-sidebar", isOpen ? "max-h-screen" : "max-h-0")}>
        <nav className="p-5">
          <NavItems onNavigate={closeMenu} />
        </nav>
      </div>
    </header>
  );
};
