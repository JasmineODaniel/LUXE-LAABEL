import "./NewArrival.css";
import { FiTruck, FiHeadphones, FiShield, FiArrowUp } from "react-icons/fi";

const banners = [
  {
    title: "PlayStation 5",
    description: "Black and White version of the PS5 coming out on sale.",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1606813907291-5c1f10aff846?auto=format&fit=crop&w=900&q=80",
    className: "new-arrival__banner new-arrival__banner--large",
  },
  {
    title: "Women's Collections",
    description: "Featured woman collections that give you another vibe.",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    className: "new-arrival__banner",
  },
  {
    title: "Speakers",
    description: "Amazon wireless speakers",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1518441902117-1b0f1c1ccf5e?auto=format&fit=crop&w=600&q=80",
    className: "new-arrival__banner",
  },
  {
    title: "Perfume",
    description: "GUCCI INTENSE OUD EDP",
    cta: "Shop Now",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
    className: "new-arrival__banner",
  },
];

const services = [
  {
    title: "FREE AND FAST DELIVERY",
    subtitle: "Free delivery for all orders over $140",
    icon: <FiTruck />,
  },
  {
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
    icon: <FiHeadphones />,
  },
  {
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days",
    icon: <FiShield />,
  },
];

export default function NewArrival() {
  return (
    <section className="new-arrival" id="new-arrival">
      <div className="new-arrival__inner">
        <div className="new-arrival__eyebrow">
          <span className="new-arrival__eyebrow-line" />
          <span>Featured</span>
        </div>
        <h2 className="new-arrival__heading">New Arrival</h2>

        <div className="new-arrival__grid">
          <article className={banners[0].className}>
            <img src={banners[0].image} alt={banners[0].title} />
            <div className="new-arrival__banner-content">
              <h3>{banners[0].title}</h3>
              <p>{banners[0].description}</p>
              <button type="button">{banners[0].cta}</button>
            </div>
          </article>

          <div className="new-arrival__stack">
            <article className={banners[1].className}>
              <img src={banners[1].image} alt={banners[1].title} />
              <div className="new-arrival__banner-content new-arrival__banner-content--light">
                <h3>{banners[1].title}</h3>
                <p>{banners[1].description}</p>
                <button type="button">{banners[1].cta}</button>
              </div>
            </article>

            <div className="new-arrival__row">
              {banners.slice(2).map((banner) => (
                <article className={banner.className} key={banner.title}>
                  <img src={banner.image} alt={banner.title} />
                  <div className="new-arrival__banner-content">
                    <h3>{banner.title}</h3>
                    <p>{banner.description}</p>
                    <button type="button">{banner.cta}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="new-arrival__services">
          {services.map((service) => (
            <div className="new-arrival__service" key={service.title}>
              <div className="new-arrival__service-icon" aria-hidden="true">
                <div className="new-arrival__service-icon-inner">
                  {service.icon}
                </div>
              </div>
              <div className="new-arrival__service-text">
                <h4>{service.title}</h4>
                <p>{service.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="new-arrival__back-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FiArrowUp />
        </button>
      </div>
    </section>
  );
}
