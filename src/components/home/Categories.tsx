import "./Categories.css";
import {
  LuSmartphone,
  LuMonitor,
  LuWatch,
  LuCamera,
  LuHeadphones,
  LuGamepad2,
} from "react-icons/lu";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

type Category = {
  name: string;
  icon: JSX.Element;
  active?: boolean;
};

const categories: Category[] = [
  { name: "Phones", icon: <LuSmartphone /> },
  { name: "Computers", icon: <LuMonitor /> },
  { name: "SmartWatch", icon: <LuWatch /> },
  { name: "Camera", icon: <LuCamera />, active: true },
  { name: "HeadPhones", icon: <LuHeadphones /> },
  { name: "Gaming", icon: <LuGamepad2 /> },
];

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(
    categories.findIndex((c) => c.active) || 0
  );

  return (
    <section className="categories" id="categories">
      <div className="categories__inner">
        <header className="categories__header">
          <div className="categories__title-group">
            <div className="categories__eyebrow">
              <span className="categories__eyebrow-line" />
              <span>Categories</span>
            </div>
            <h2 className="categories__heading">Browse By Category</h2>
          </div>

          <div className="categories__controls">
            <button
              className="categories__control"
              aria-label="Previous categories"
              type="button"
            >
              <IoIosArrowBack />
            </button>
            <button
              className="categories__control"
              aria-label="Next categories"
              type="button"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </header>

        <div className="categories__grid">
          {categories.map((category, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                type="button"
                key={category.name}
                className={
                  isActive
                    ? "category-card category-card--active"
                    : "category-card"
                }
                onClick={() => setActiveIndex(index)}
              >
                <span className="category-card__icon">{category.icon}</span>
                <span className="category-card__label">{category.name}</span>
              </button>
            );
          })}
        </div>

        <div className="categories__divider" />
      </div>
    </section>
  );
}
