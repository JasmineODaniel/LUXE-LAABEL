import "./BestSelling.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

type Product = {
  title: string;
  price: string;
  compareAt?: string;
  reviews: number;
  image: string;
};

const products: Product[] = [
  {
    title: "The north coat",
    price: "$260",
    compareAt: "$360",
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1542293787938-4d273c2665e9?auto=format&fit=crop&w=640&q=80",
  },
  {
    title: "Gucci duffle bag",
    price: "$960",
    compareAt: "$1160",
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=640&q=80",
  },
  {
    title: "RGB liquid CPU Cooler",
    price: "$160",
    compareAt: "$170",
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1587202372775-98927f32e89b?auto=format&fit=crop&w=640&q=80",
  },
  {
    title: "Small BookSelf",
    price: "$360",
    reviews: 65,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=640&q=80",
  },
];

function Stars() {
  return (
    <span className="best-card__stars">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
    </span>
  );
}

export default function BestSelling() {
  return (
    <section className="best-selling" id="best-selling">
      <div className="best-selling__inner">
        <header className="best-selling__header">
          <div className="best-selling__title-group">
            <div className="best-selling__eyebrow">
              <span className="best-selling__eyebrow-line" />
              <span>This Month</span>
            </div>
            <h2 className="best-selling__heading">Best Selling Products</h2>
          </div>

          <button className="best-selling__view-all" type="button">
            View All
          </button>
        </header>

        <div className="best-selling__grid">
          {products.map((product) => (
            <article className="best-card" key={product.title}>
              <div className="best-card__media">
                <div className="best-card__actions">
                  <button
                    type="button"
                    className="best-card__icon"
                    aria-label="Save to wishlist"
                  >
                    <AiOutlineHeart />
                  </button>
                </div>
                <img src={product.image} alt={product.title} />
              </div>

              <h3 className="best-card__title">{product.title}</h3>
              <div className="best-card__pricing">
                <span className="best-card__price">{product.price}</span>
                {product.compareAt && (
                  <span className="best-card__compare">
                    {product.compareAt}
                  </span>
                )}
              </div>
              <div className="best-card__reviews">
                <Stars />
                <span className="best-card__review-count">
                  ({product.reviews})
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
