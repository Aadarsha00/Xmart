import React, { createContext, useContext, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const isExternalLink = (link: string) => /^https?:\/\//.test(link);

const NavbarVisibilityContext = createContext({ visible: false });

const useNavbarVisibility = () => useContext(NavbarVisibilityContext);

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hysteresis avoids rapid state flips near the threshold on touch devices.
    setVisible((prev) => {
      if (prev) {
        return latest > 20;
      }
      return latest > 48;
    });
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-2 z-50 px-3 sm:px-6", className)}
    >
      <NavbarVisibilityContext.Provider value={{ visible }}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
        )}
      </NavbarVisibilityContext.Provider>
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const separated = Boolean(visible);
  const childNodes = React.Children.toArray(children);
  const middleIndex = Math.floor(childNodes.length / 2);

  const getDetachedOffset = (index: number) => {
    const center = (childNodes.length - 1) / 2;
    return (index - center) * 24;
  };

  return (
    <motion.div
      animate={{
        y: separated ? 0 : 8,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
      }}
      className={cn(
        "relative mx-auto hidden w-full max-w-7xl md:flex",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-white/30 bg-white/20 backdrop-blur-2xl dark:border-white/10 dark:bg-black/25"
        animate={{
          opacity: separated ? 0 : 1,
          scale: separated ? 0.985 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      />

      <div
        className={cn(
          "relative z-10 flex w-full items-center justify-between transition-[gap,padding] duration-200",
          separated ? "gap-3 px-0 py-0" : "gap-2 px-3 py-2",
        )}
      >
        {childNodes.map((child, index) => (
          <motion.div
            key={index}
            className={cn(
              index === middleIndex ? "flex-1" : "shrink-0",
              "will-change-transform",
              separated && index !== middleIndex
                ? "rounded-full border border-white/30 bg-white/20 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:border-white/10 dark:bg-black/25"
                : "",
            )}
            animate={{
              x: separated ? getDetachedOffset(index) : 0,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 360,
              damping: 24,
              mass: 0.65,
              delay: separated
                ? index * 0.015
                : (childNodes.length - index - 1) * 0.01,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const location = useLocation();
  const { visible } = useNavbarVisibility();

  const isActive = (href: string) => {
    if (isExternalLink(href)) {
      return false;
    }
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        visible
          ? "hidden items-center justify-center p-1 md:flex"
          : "hidden flex-1 items-center justify-center px-2 md:flex",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center rounded-full px-1.5 py-1",
          visible
            ? "border border-white/35 bg-white/15 backdrop-blur-xl dark:border-white/10 dark:bg-black/20"
            : "border border-transparent bg-transparent",
        )}
      >
        {items.map((item, idx) => {
          const active = isActive(item.link);
          const itemClasses = cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300",
            visible
              ? active
                ? "bg-white/25 text-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] dark:bg-white/10"
                : "text-foreground/80 hover:bg-white/20 hover:text-foreground dark:hover:bg-white/10"
              : active
                ? "text-primary"
                : "text-foreground/80 hover:text-foreground",
          );

          if (isExternalLink(item.link)) {
            return (
              <a
                key={`desktop-link-${idx}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onItemClick}
                className={itemClasses}
              >
                {item.name}
              </a>
            );
          }

          return (
            <Link
              key={`desktop-link-${idx}`}
              to={item.link}
              onClick={onItemClick}
              className={itemClasses}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        y: visible ? 0 : 4,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 30,
      }}
      className={cn(
        "mx-auto flex w-full max-w-[calc(100vw-1.5rem)] flex-col md:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-full border border-white/30 bg-white/20 px-3 py-2 backdrop-blur-2xl dark:border-white/10 dark:bg-black/25",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "mt-3 flex w-full flex-col items-start gap-3 rounded-3xl border border-white/30 bg-white/90 px-4 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/80",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/30 text-foreground transition-colors hover:bg-white/45 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      to="/"
      aria-label="Xmart Point home"
      className="group inline-flex items-center gap-2.5 px-3 py-1.5 text-foreground"
    >
      <img src="/Logo.png" alt="Xmart Point Logo" className="h-6 w-auto" />
    </Link>
  );
};

type NavbarButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    "inline-flex h-11 items-center justify-center rounded-full px-7 text-sm font-semibold transition-all duration-300";

  const variantStyles = {
    primary:
      // Theme-based glow for nav button
      "bg-primary text-primary-foreground shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_12px_0_hsl(var(--primary)_/_0.32)] focus-visible:shadow-[0_0_0_4px_hsl(var(--primary)_/_0.22)] transition-shadow hover:-translate-y-0.5 hover:bg-primary/90",
    secondary:
      "bg-white/20 text-foreground hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20",
    dark: "bg-black text-white hover:bg-black/90",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    if (isExternalLink(href)) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};
