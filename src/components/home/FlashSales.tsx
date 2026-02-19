import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineHeart, HiOutlineEye } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./FlashSales.css";
import { useResponsiveColumns } from "../../hooks/useResponsiveColumns";

type Product = {
  id: number;
  badge: string;
  title: string;
  price: number;
  compareAt: number;
  reviews: number;
  image: string;
};

// fake backend function
function fetchProducts(): Promise<Product[]> {
  return Promise.resolve([
    { id: 1, badge: "-40%", title: "HAVIT HV-G92 Gamepad", price: 120, compareAt: 160, reviews: 88, image: "gamepad.jpg" },
    { id: 2, badge: "-35%", title: "AK-900 Wired Keyboard", price: 960, compareAt: 1160, reviews: 75, image: "Wired-Keyboard.jpg" },
    { id: 3, badge: "-30%", title: "IPS LCD Gaming Monitor", price: 370, compareAt: 400, reviews: 99, image: "Gaming-Monitor.jpg" },
    { id: 4, badge: "-25%", title: "S-Series Comfort Chair", price: 375, compareAt: 400, reviews: 99, image: "Series-Comfort-Chair.jpg" },
    { id: 5, badge: "-20%", title: "RGB Mechanical Mouse", price: 80, compareAt: 100, reviews: 64, image: "mouse.jpg" },
    { id: 6, badge: "-15%", title: "Gaming Headset", price: 150, compareAt: 180, reviews: 72, image: "headset.jpg" },
  ]);
}

// Stars component
function Stars() {
  return (
    <span className="flash-card__stars">
      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
    </span>
  );
}

export default function FlashSales() {
  const navigate = useNavigate();

  // number of visible cards depending on screen
  const visibleCount = useResponsiveColumns(4, [
    { width: 720, cols: 1 },
    { width: 1100, cols: 2 },
  ]);

  // state
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0); // for pagination
  const [cart, setCart] = useState<Product[]>([]);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  // load products on mount
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // reset page when screen changes
  useEffect(() => {
    setPage(0);
  }, [visibleCount]);

  // products to display on current page
  const visibleProducts = useMemo(() => {
    const start = page * visibleCount;
    const end = start + visibleCount;
    return products.slice(start, end);
  }, [products, page, visibleCount]);

  // next / prev pagination
  function handleNext() {
    if ((page + 1) * visibleCount < products.length) {
      setPage((p) => p + 1);
    }
  }
  function handlePrev() {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  }

  // add product to cart
  function handleAddToCart(product: Product) {
    setCart((prev) => [...prev, product]);
  }

  // toggle like
  function toggleLike(id: number) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="flash-sales" id="flash-sales">
      <header className="flash-sales__header">
        <h2>Flash Sales</h2>

        <div className="flash-sales__controls">
          <button onClick={handlePrev} aria-label="Previous"><IoIosArrowBack /></button>
          <button onClick={handleNext} aria-label="Next"><IoIosArrowForward /></button>
        </div>
      </header>

      <div className="flash-sales__grid">
        {visibleProducts.map((product) => (
          <article className="flash-card" key={product.id}>
            <div className="flash-card__media">
              <span className="flash-card__badge">{product.badge}</span>

              <div className="flash-card__actions">
                <button
                  className={`flash-card__icon ${liked[product.id] ? "is-liked" : ""}`}
                  onClick={() => toggleLike(product.id)}
                >
                  <HiOutlineHeart />
                </button>
                <button className="flash-card__icon"><HiOutlineEye /></button>
              </div>

              <img src={`/images/${product.image}`} alt={product.title} />
            </div>

            <button className="flash-card__cta" onClick={() => handleAddToCart(product)}>
              Add To Cart
            </button>

            <h3 className="flash-card__title">{product.title}</h3>

            <div className="flash-card__pricing">
              <span className="flash-card__price">${product.price}</span>
              <span className="flash-card__compare">${product.compareAt}</span>
            </div>

            <div className="flash-card__reviews">
              <Stars />
              <span>({product.reviews})</span>
            </div>
          </article>
        ))}
      </div>

      <div className="flash-sales__cta-row">
        <button className="flash-sales__view-all" onClick={() => navigate("/products")}>
          View All Products
        </button>
      </div>
    </section>
  );
}
