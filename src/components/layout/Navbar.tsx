import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { FiSearch } from "react-icons/fi";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { useCartStore } from "../../store/cart";

export default function Navbar() {
  const links = ["Home", "Contact", "About", "Sign Up"];
  const [activeLink, setActiveLink] = useState("Home");
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const likesRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartCount = useCartStore((s) =>
    s.items.reduce((acc, item) => acc + item.quantity, 0)
  );
  const cartItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) =>
    s.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

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
                {cartCount > 0 && (
                  <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                    {cartCount}
                  </span>
                )}
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
                {cartItems.length === 0 ? (
                  <p>No items in cart yet</p>
                ) : (
                  <div className="cart-content">
                    <ul className="cart-list">
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          <div className="cart-line">
                            <span className="cart-name">{item.name}</span>
                            <span className="cart-qty">x{item.quantity}</span>
                          </div>
                          <div className="cart-line cart-line--price">
                            <span>${item.price.toFixed(2)}</span>
                            <span className="cart-line-total">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="cart-checkout-form">
                      <div className="cart-field">
                        <label htmlFor="card-name">Name on card</label>
                        <input
                          id="card-name"
                          type="text"
                          placeholder="Full name"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="cart-field">
                        <label htmlFor="card-number">Card number</label>
                        <input
                          id="card-number"
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                        />
                      </div>
                      <div className="cart-field cart-field--row">
                        <div>
                          <label htmlFor="expiry">Expiry</label>
                          <input
                            id="expiry"
                            type="text"
                            inputMode="numeric"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc">CVC</label>
                          <input
                            id="cvc"
                            type="text"
                            inputMode="numeric"
                            placeholder="123"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div className="cart-field">
                        <label htmlFor="checkout-email">Email for receipt</label>
                        <input
                          id="checkout-email"
                          type="email"
                          placeholder="you@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(null);
                            setEmailSent(false);
                          }}
                        />
                      </div>
                      {emailError && (
                        <p className="cart-email__error">{emailError}</p>
                      )}
                      {sendError && (
                        <p className="cart-email__error">{sendError}</p>
                      )}
                    </div>
                    <button
                      className="cart-checkout"
                      type="button"
                      disabled={isSending}
                      onClick={async () => {
                        const emailValid = /\S+@\S+\.\S+/.test(email);
                        const cardNumberClean = cardNumber.replace(/\s+/g, "");
                        const cardValid =
                          /^\d{13,19}$/.test(cardNumberClean) &&
                          (cardNumberClean.startsWith("4") ||
                            cardNumberClean.startsWith("5") ||
                            cardNumberClean.startsWith("6"));
                        const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(
                          expiry
                        );
                        const cvcValid = /^\d{3,4}$/.test(cvc);

                        if (!emailValid) {
                          setEmailError("Enter a valid email");
                          setEmailSent(false);
                          setSendError(null);
                          return;
                        }
                        if (!cardName || !cardValid || !expiryValid || !cvcValid) {
                          setSendError(
                            "Enter valid card details (name, number, expiry, CVC)."
                          );
                          setEmailSent(false);
                          return;
                        }
                        setEmailError(null);
                        setSendError(null);
                        setIsSending(true);
                        try {
                          const resp = await fetch("/api/send-receipt", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              email,
                              items: cartItems,
                              total: cartTotal,
                            }),
                          });
                          if (!resp.ok) {
                            throw new Error("Failed to send email");
                          }
                          setEmailSent(true);
                        } catch (err) {
                          setSendError("Email failed. Try again.");
                          setEmailSent(false);
                        } finally {
                          setIsSending(false);
                        }
                      }}
                    >
                      {isSending ? "Sending..." : "Checkout"}
                    </button>
                    {emailSent && (
                      <div className="cart-confirmation">
                        <AiOutlineCheckCircle className="cart-confirmation__icon" />
                        <div>
                          <p className="cart-confirmation__title">
                            Confirmation sent
                          </p>
                          <p className="cart-confirmation__subtitle">
                            Email confirmed for {email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
