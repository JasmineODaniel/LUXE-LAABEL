import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  const links = ["Home", "Contact", "About", "Sign Up"];
  const [activeLink, setActiveLink] = useState("Home");
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const likesRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        likesRef.current &&
        !likesRef.current.contains(event.target as Node)
      ) {
        setIsLikesOpen(false);
      }

      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">LUXE LABEL</div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link}>
            <button
              type="button"
              className={
                activeLink === link ? "nav-link nav-link--active" : "nav-link"
              }
              onClick={() => setActiveLink(link)}
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <div className="search-box">
          <input type="text" placeholder="What are you looking for?" />
          <FiSearch className="search-icon" />
        </div>

        <div className="icon-stack">
          <div className="icons-row">
            <div className="icon-trigger" ref={likesRef}>
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  setIsLikesOpen((prev) => !prev);
                  setIsCartOpen(false);
                }}
                aria-expanded={isLikesOpen}
                aria-controls="likes-panel"
              >
                <AiOutlineHeart className="icon" />
              </button>

              <div
                id="likes-panel"
                className={
                  isLikesOpen
                    ? "icon-dropdown icon-dropdown--visible"
                    : "icon-dropdown"
                }
                aria-hidden={!isLikesOpen}
              >
                <p>No likes yet</p>
              </div>
            </div>

            <div className="icon-trigger" ref={cartRef}>
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  setIsCartOpen((prev) => !prev);
                  setIsLikesOpen(false);
                }}
                aria-expanded={isCartOpen}
                aria-controls="cart-panel"
              >
                <AiOutlineShoppingCart className="icon" />
              </button>

              <div
                id="cart-panel"
                className={
                  isCartOpen
                    ? "icon-dropdown icon-dropdown--visible"
                    : "icon-dropdown"
                }
                aria-hidden={!isCartOpen}
              >
                <p>No items in cart yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
