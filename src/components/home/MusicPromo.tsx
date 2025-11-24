import "./MusicPromo.css";

const countdown = [
  { label: "Hours", value: "23" },
  { label: "Days", value: "05" },
  { label: "Minutes", value: "59" },
  { label: "Seconds", value: "35" },
];

export default function MusicPromo() {
  return (
    <section className="music-promo" id="music-promo">
      <div className="music-promo__inner">
        <div className="music-promo__card">
          <div className="music-promo__content">
            <p className="music-promo__eyebrow">Categories</p>
            <h2 className="music-promo__heading">
              Enhance Your
              <br />
              Music Experience
            </h2>

            <div className="music-promo__countdown">
              {countdown.map((item) => (
                <div className="music-promo__pill" key={item.label}>
                  <span className="music-promo__pill-value">{item.value}</span>
                  <span className="music-promo__pill-label">{item.label}</span>
                </div>
              ))}
            </div>

            <button type="button" className="music-promo__cta">
              Buy Now!
            </button>
          </div>

          <div className="music-promo__visual">
            <div className="music-promo__glow" />
            <img
              src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80"
              alt="Portable speaker"
              className="music-promo__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
