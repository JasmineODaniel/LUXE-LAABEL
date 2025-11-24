import { useEffect, useRef, useState } from "react";
import "./PromoBar.css";
import { IoChevronDownOutline } from "react-icons/io5";

const languages = [
  "English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Chinese",
];

export default function PromoBar() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleShopNow = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="promo-bar">
      <div className="promo-message">
        <span className="promo-message__text">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </span>
        <button
          type="button"
          className="promo-shop"
          onClick={handleShopNow}
        >
          Shop Now
        </button>
      </div>

      <div className="promo-lang" ref={panelRef}>
        <button
          type="button"
          className="promo-lang__button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="promo-lang-panel"
        >
          {selectedLanguage}
          <IoChevronDownOutline className="arrow-icon" />
        </button>

        <div
          id="promo-lang-panel"
          className={
            isOpen
              ? "promo-lang__panel promo-lang__panel--visible"
              : "promo-lang__panel"
          }
          aria-hidden={!isOpen}
        >
          <p className="promo-lang__title">Choose Language</p>
          <ul className="promo-lang__list">
            {languages.map((language) => (
              <li key={language}>
                <button
                  type="button"
                  className={
                    language === selectedLanguage
                      ? "promo-lang__option promo-lang__option--active"
                      : "promo-lang__option"
                  }
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsOpen(false);
                  }}
                >
                  {language}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
