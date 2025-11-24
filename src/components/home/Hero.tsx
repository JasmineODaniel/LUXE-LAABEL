import { useEffect, useState } from "react";
import "./Hero.css";
import heroImg from "../../assets/iphone-14-pro-on-white-background-front-view.jpg";
import { FaApple } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoChevronForwardOutline } from "react-icons/io5";

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

const slides = [
  {
    id: 0,
    eyebrow: "iPhone 14 Series",
    headingPrimary: "Up to 10%",
    headingSecondary: "off Voucher",
    image: heroImg,
  },
  {
    id: 1,
    eyebrow: "Apple Watch Ultra",
    headingPrimary: "Stay Connected",
    headingSecondary: "All Day",
    image: heroImg,
  },
  {
    id: 2,
    eyebrow: "AirPods Pro 2",
    headingPrimary: "Noise Cancelling",
    headingSecondary: "On the Go",
    image: heroImg,
  },
  {
    id: 3,
    eyebrow: "MacBook Pro M2",
    headingPrimary: "Power Your",
    headingSecondary: "Creativity",
    image: heroImg,
  },
  {
    id: 4,
    eyebrow: "HomePod Mini",
    headingPrimary: "Fill the Room",
    headingSecondary: "With Sound",
    image: heroImg,
  },
];

const SLIDE_DELAY = 5000;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DELAY);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[activeSlide];

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

              <button className="hero-cta">
             
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
                type="button"
                key={slide.id}
                className={
                  index === activeSlide ? "hero-dot hero-dot--active" : "hero-dot"
                }
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-pressed={index === activeSlide}
              />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
