import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../store/cart";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const API_BASE = "https://fakestoreapi.com";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState<Record<number, number>>({});
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = slug
          ? `${API_BASE}/products/category/${decodeURIComponent(slug)}`
          : `${API_BASE}/products`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  const increment = (id: number) =>
    setQty((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrement = (id: number) =>
    setQty((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  const getQty = (id: number) => qty[id] || 1;

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{slug ? decodeURIComponent(slug) : "Products"}</h1>
        <p>Powered by Fake Store API</p>
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p className="category-error">{error}</p>}

      {!loading && !error && (
        <div className="category-grid">
          {products.map((p) => (
            <div key={p.id} className="category-card">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="category-card__body">
                <h3>{p.title}</h3>
                <p className="category-card__price">${p.price.toFixed(2)}</p>
                <p className="category-card__desc">{p.description}</p>
                <div className="category-card__actions">
                  <div className="hero-qty">
                    <button
                      type="button"
                      onClick={() => decrement(p.id)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{getQty(p.id)}</span>
                    <button
                      type="button"
                      onClick={() => increment(p.id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="category-card__add"
                    type="button"
                    onClick={() =>
                      addItem({
                        id: p.id,
                        name: p.title,
                        price: p.price,
                        image: p.image,
                        quantity: getQty(p.id),
                      })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
