import "./ExploreProducts.css";
import { HiOutlineHeart, HiOutlineEye } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaStar } from "react-icons/fa";

type Product = {
  title: string;
  price: string;
  compareAt?: string;
  reviews: number;
  image: string;
  badge?: "new";
  colors?: string[];
  cta?: string;
};

const products: Product[] = [
  {
    title: "Breed Dry Dog Food",
    price: "$100",
    compareAt: "$120",
    reviews: 35,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=480&q=80",
  },
  {
    title: "CANON EOS DSLR Camera",
    price: "$360",
    compareAt: "$380",
    reviews: 95,
    image: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?auto=format&fit=crop&w=480&q=80",
    cta: "Add To Cart",
  },
  {
    title: "ASUS FHD Gaming Laptop",
    price: "$700",
    compareAt: "$800",
    reviews: 325,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=480&q=80",
  },
  {
    title: "Curology Product Set",
    price: "$500",
    compareAt: "$550",
    reviews: 145,
    image: "https://images.unsplash.com/photo-1582719478248-48cd4bb1ec52?auto=format&fit=crop&w=480&q=80",
  },
  {
    title: "Kids Electric Car",
    price: "$960",
    compareAt: "$1100",
    reviews: 65,
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=480&q=80",
    badge: "new",
    colors: ["#e11d48", "#0f172a"],
  },
  {
    title: "Jr. Zoom Soccer Cleats",
    price: "$1160",
    compareAt: "$1200",
    reviews: 35,
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=480&q=80",
    colors: ["#10b981", "#e11d48"],
  },
  {
    title: "GP11 Shooter USB Gamepad",
    price: "$660",
    compareAt: "$700",
    reviews: 55,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=480&q=80",
    badge: "new",
    colors: ["#0b0b0b", "#e11d48"],
  },
  {
    title: "Quilted Satin Jacket",
    price: "$660",
    compareAt: "$690",
    reviews: 55,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=480&q=80",
    colors: ["#0ea5e9", "#e11d48"],
  },
];

function Stars() {
  return (
    <span className="explore-card__stars">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
    </span>
  );
}

export default function ExploreProducts() {
  return (
    <section className="explore" id="explore-products">
      <div className="explore__inner">
        <header className="explore__header">
          <div className="explore__title-group">
            <div className="explore__eyebrow">
              <span className="explore__eyebrow-line" />
              <span>Our Products</span>
            </div>
            <h2 className="explore__heading">Explore Our Products</h2>
          </div>

          <div className="explore__controls">
            <button className="explore__control" aria-label="Previous">
              <IoIosArrowBack />
            </button>
            <button className="explore__control" aria-label="Next">
              <IoIosArrowForward />
            </button>
          </div>
        </header>

        <div className="explore__grid">
          {products.map((product) => (
            <article className="explore-card" key={product.title}>
              <div className="explore-card__media">
                {product.badge === "new" && (
                  <span className="explore-card__badge">NEW</span>
                )}

                <div className="explore-card__actions">
                  <button
                    type="button"
                    className="explore-card__icon"
                    aria-label="Save to wishlist"
                  >
                    <HiOutlineHeart />
                  </button>
                  <button
                    type="button"
                    className="explore-card__icon"
                    aria-label="Preview product"
                  >
                    <HiOutlineEye />
                  </button>
                </div>

                <img src={product.image} alt={product.title} />

                {product.cta && (
                  <button type="button" className="explore-card__cta">
                    {product.cta}
                  </button>
                )}
              </div>

              <h3 className="explore-card__title">{product.title}</h3>
              <div className="explore-card__pricing">
                <span className="explore-card__price">{product.price}</span>
                {product.compareAt && (
                  <span className="explore-card__compare">
                    {product.compareAt}
                  </span>
                )}
              </div>
              <div className="explore-card__reviews">
                <Stars />
                <span className="explore-card__review-count">
                  ({product.reviews})
                </span>
              </div>

              {product.colors && (
                <div className="explore-card__colors">
                  {product.colors.map((color) => (
                    <span
                      key={`${product.title}-${color}`}
                      className="explore-card__color-dot"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="explore__cta-row">
          <button type="button" className="explore__view-all">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
