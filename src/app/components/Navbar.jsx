"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getContactInfo } from "../lib/api";
import Image from "next/image";

// Default logo path (update this to your actual default logo path)
const DEFAULT_LOGO = "/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact Us", href: "/contact" },
];

const ctaButton = { name: "Request Quote", href: "/quote" };



export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const contactInfo = await getContactInfo();
        if (contactInfo?.siteLogo) {
          setLogoUrl(contactInfo.siteLogo);
        }
      } catch (error) {
        console.error("Failed to load logo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogo();
  }, []);

  const navbarData = {
    logo: logoUrl,
    links: navLinks,
    cta: ctaButton,
  };

  return (
    <header className="w-full flex justify-center py-4 absolute top-5 z-50">
      <nav className="relative flex items-center justify-between bg-black/40 text-white px-6 py-3 rounded-full max-w-6xl w-full shadow-lg">
        {/* 🔹 Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 🔹 Links (hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`relative font-medium hover:text-yellow-300 ${
                pathname === link.href
                  ? "text-yellow-200 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-yellow-300"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 🔹 Logo in Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-black/40 rounded-full px-8 py-2 shadow-md">
          {!isLoading && (
            <Image 
              src={logoUrl} 
              alt="Logo" 
              className="h-16 w-auto"
              width={300}
              height={300}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_LOGO;
              }}
            />
          )}
        </div>

        {/* 🔹 CTA (hidden on mobile) */}
        <div className="hidden md:block ml-auto">
          <a
            
            className="bg-yellow-200 text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition"
          >
            {ctaButton.name} →
          </a>
        </div>
      </nav>

      {/* 🔹 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-black/90 text-white rounded-xl shadow-lg p-6 md:hidden">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`font-medium hover:text-yellow-300 ${
                  pathname === link.href ? "text-yellow-200" : ""
                }`}
                onClick={() => setIsOpen(false)} // close on click
              >
                {link.name}
              </Link>
            ))}

            {/* CTA inside dropdown */}
            <a
              href={ctaButton.href}
              className="bg-yellow-200 text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              {ctaButton.name} →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
