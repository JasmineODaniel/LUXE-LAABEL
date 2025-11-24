import { FaStar } from "react-icons/fa";
import { HiOutlineHeart, HiOutlineEye } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./FlashSales.css";

type Product = {
  badge: string;
  title: string;
  price: string;
  compareAt: string;
  reviews: number;
  image: string;
  cta?: string;
};

const countdown = [
  { label: "Days", value: "03" },
  { label: "Hours", value: "23" },
  { label: "Minutes", value: "19" },
  { label: "Seconds", value: "56" },
];

const products: Product[] = [
  {
    badge: "-40%",
    title: "HAVIT HV-G92 Gamepad",
    price: "$120",
    compareAt: "$160",
    reviews: 88,
    image: "https://via.placeholder.com/320x220?text=Gamepad",
  },
  {
    badge: "-35%",
    title: "AK-900 Wired Keyboard",
    price: "$960",
    compareAt: "$1160",
    reviews: 75,
    image: "https://via.placeholder.com/320x220?text=Keyboard",
    cta: "Add To Cart",
  },
  {
    badge: "-30%",
    title: "IPS LCD Gaming Monitor",
    price: "$370",
    compareAt: "$400",
    reviews: 99,
    image: "https://via.placeholder.com/320x220?text=Monitor",
  },
  {
    badge: "-25%",
    title: "S-Series Comfort Chair",
    price: "$375",
    compareAt: "$400",
    reviews: 99,
    image: "https://via.placeholder.com/320x220?text=Chair",
  },
];

function Stars() {
  return (
    <span className="flash-card__stars">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
    </span>
  );
}

export default function FlashSales() {
  return (
    <section className="flash-sales" id="flash-sales">
      <div className="flash-sales__inner">
        <header className="flash-sales__header">
          <div className="flash-sales__left">
            <div className="flash-sales__title-group">
              <div className="flash-sales__eyebrow">
                <span className="flash-sales__eyebrow-line" />
                <span>Today&apos;s</span>
              </div>
              <h2 className="flash-sales__heading">Flash Sales</h2>
            </div>

            <div className="flash-sales__countdown">
              {countdown.map((item, index) => (
                <div className="flash-sales__count" key={item.label}>
                  <div className="flash-sales__count-body">
                    <span className="flash-sales__count-label">{item.label}</span>
                    <span className="flash-sales__count-value">{item.value}</span>
                  </div>
                  {index < countdown.length - 1 && (
                    <span className="flash-sales__colon">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flash-sales__controls">
            <button className="flash-sales__control" aria-label="Previous">
              <IoIosArrowBack />
            </button>
            <button className="flash-sales__control" aria-label="Next">
              <IoIosArrowForward />
            </button>
          </div>
        </header>

        <div className="flash-sales__grid">
          {products.map((product) => (
            <article className="flash-card" key={product.title}>
              <div className="flash-card__media">
                <span className="flash-card__badge">{product.badge}</span>

                <div className="flash-card__actions">
                  <button
                    type="button"
                    className="flash-card__icon"
                    aria-label="Save to wishlist"
                  >
                    <HiOutlineHeart />
                  </button>
                  <button
                    type="button"
                    className="flash-card__icon"
                    aria-label="Preview product"
                  >
                    <HiOutlineEye />
                  </button>
                </div>

                <img src={product.image} alt={product.title} />
              </div>

              {product.cta ? (
                <button type="button" className="flash-card__cta">
                  {product.cta}
                </button>
              ) : (
                <div className="flash-card__cta-placeholder" aria-hidden />
              )}

              <h3 className="flash-card__title">{product.title}</h3>
              <div className="flash-card__pricing">
                <span className="flash-card__price">{product.price}</span>
                <span className="flash-card__compare">{product.compareAt}</span>
              </div>
              <div className="flash-card__reviews">
                <Stars />
                <span className="flash-card__review-count">
                  ({product.reviews})
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="flash-sales__cta-row">
          <button type="button" className="flash-sales__view-all">
            View All Products
          </button>
        </div>

        <div className="flash-sales__divider" />
      </div>
    </section>
  );
}
