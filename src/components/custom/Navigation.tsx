import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Services", link: "/services" },
  { name: "Blog", link: "/blog" },
  { name: "Contact", link: "/contact" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookCallButtonPress = () => {
    navigate("/contact");
    setIsMobileMenuOpen(false);
  };

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navLinks} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavbarButton
            onClick={handleBookCallButtonPress}
            className="rounded-full text-white dark:text-black"
            variant="primary"
          >
            Book a call
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navLinks.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              to={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-xl px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}

          <div className="mt-2 flex w-full flex-col gap-3">
            <ThemeToggle />
            <NavbarButton
              onClick={handleBookCallButtonPress}
              variant="primary"
              className="w-full rounded-full"
            >
              Book a call
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
