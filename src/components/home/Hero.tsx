import { useEffect, useRef, useState } from "react";
import "./Hero.css";

import { FaApple } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoChevronForwardOutline, IoAdd, IoRemove } from "react-icons/io5";

// Images
import heroImg from "../../assets/iphone-14-pro-on-white-background-front-view.jpg";
import heroImgWatch from "../../assets/apple-watch-ultra.jpg";
import heroImgAirPods from "../../assets/airpods-pro-2.jpg";
import heroImg2 from "../../assets/macbookpro.jpg";
import heroImgHomePod from "../../assets/home-pod-mini.jpg";
import { useCartStore } from "../../store/cart";

// Categories 
const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

// Slides (order preserved for slider)
const slides = [
  {
    id: 0,
    eyebrow: "iPhone 14 Series",
    headingPrimary: "Up to 10%",
    headingSecondary: "off Voucher",
    image: heroImg,
    name: "iPhone 14 Pro",
    price: 1099,
    blurb: '6.1" ProMotion OLED, A16 Bionic, 48MP main camera.',
  },
  {
    id: 1,
    eyebrow: "Apple Watch Ultra",
    headingPrimary: "Stay Connected",
    headingSecondary: "All Day",
    image: heroImgWatch,
    name: "Apple Watch Ultra",
    price: 799,
    blurb: "49mm titanium, dual‑frequency GPS, 36‑hour battery life.",
  },
  {
    id: 2,
    eyebrow: "AirPods Pro 2",
    headingPrimary: "Noise Cancelling",
    headingSecondary: "On the Go",
    image: heroImgAirPods,
    name: "AirPods Pro (2nd Gen)",
    price: 249,
    blurb: "H2 chip with Adaptive Audio and USB‑C charging case.",
  },
  {
    id: 3,
    eyebrow: "MacBook Pro M2",
    headingPrimary: "Power Your",
    headingSecondary: "Creativity",
    image: heroImg2,
    name: "MacBook Pro 14” M2 Pro",
    price: 1999,
    blurb: "12‑core CPU, 19‑core GPU, Liquid Retina XDR display.",
  },
  {
    id: 4,
    eyebrow: "HomePod Mini",
    headingPrimary: "Fill the Room",
    headingSecondary: "With Sound",
    image: heroImgHomePod,
    name: "HomePod mini",
    price: 99,
    blurb: "360° audio, Siri smart hub, ultra‑compact footprint.",
  },
];

const SLIDE_DELAY = 6000;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showProduct, setShowProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  // Auto-slide
  useEffect(() => {
    if (showProduct) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showProduct]);

  // When slide auto-advances, reset product panel
  useEffect(() => {
    setShowProduct(false);
    setQuantity(1);
  }, [activeSlide]);

  const currentSlide = slides[activeSlide];

  const handleShopNow = () => {
    setShowProduct(true);
  };

  const handleAddToCart = () => {
    addItem({
      id: currentSlide.id,
      name: currentSlide.name,
      price: currentSlide.price,
      image: currentSlide.image,
      quantity,
    });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <aside className="hero-sidebar">
          <ul>
            {categories.map((item, index) => (
              <li key={item}>
                <span>{item}</span>
                {index < 2 && (
                  <IoChevronForwardOutline className="sidebar-icon" />
                )}
              </li>
            ))}
          </ul>
        </aside>

        <article className="hero-banner">
          <div className="hero-banner__row">
            <div className="hero-banner__content" key={currentSlide.id}>
              <p className="hero-eyebrow">
                <FaApple className="hero-apple" />
                {currentSlide.eyebrow}
              </p>

              <h1>
                <span className="hero-heading-line hero-heading-line--primary">
                  {currentSlide.headingPrimary}
                </span>
                <span className="hero-heading-line hero-heading-line--secondary">
                  {currentSlide.headingSecondary}
                </span>
              </h1>

              <button className="hero-cta" onClick={handleShopNow}>
                <span>Shop Now</span>
                <HiOutlineArrowNarrowRight className="hero-cta__icon" />
              </button>
            </div>

            <img
              src={currentSlide.image}
              alt={currentSlide.eyebrow}
              className="hero-image"
              key={`${currentSlide.id}-image`}
            />
          </div>

          <div className="hero-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={
                  index === activeSlide
                    ? "hero-dot hero-dot--active"
                    : "hero-dot"
                }
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === activeSlide}
              />
            ))}
          </div>

          {showProduct && (
            <div className="hero-product-card">
              <div className="hero-product__left">
                <p className="hero-product__eyebrow">{currentSlide.eyebrow}</p>
                <h3 className="hero-product__title">{currentSlide.name}</h3>
                <p className="hero-product__price">
                  ${currentSlide.price.toLocaleString()}
                </p>
                <p className="hero-product__blurb">{currentSlide.blurb}</p>
                <div className="hero-product__actions">
                  <div className="hero-qty">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      <IoRemove />
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="hero-add-to-cart"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <div className="hero-product__right">
                <img src={currentSlide.image} alt={currentSlide.name} />
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
