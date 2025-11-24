import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h3 className="footer__title">Exclusive</h3>
          <p className="footer__subtitle">Subscribe</p>
          <p className="footer__text">Get 10% off your first order</p>
          <form className="footer__subscribe">
            <input type="email" placeholder="Enter your email" aria-label="Email" />
            <button type="submit" aria-label="Submit email">
              <IoMdArrowForward />
            </button>
          </form>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Support</h4>
          <p className="footer__text">
            12 Jasmine Road, Lagos,<br />Nigeria.
          </p>
          <p className="footer__text">support@luxe.com</p>
          <p className="footer__text">+234-801-555-9999</p>
          <p className="footer__text">Luxe</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Account</h4>
          <a href="#" className="footer__link">My Account</a>
          <a href="#" className="footer__link">Login / Register</a>
          <a href="#" className="footer__link">Cart</a>
          <a href="#" className="footer__link">Wishlist</a>
          <a href="#" className="footer__link">Shop</a>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Link</h4>
          <a href="#" className="footer__link">Privacy Policy</a>
          <a href="#" className="footer__link">Terms Of Use</a>
          <a href="#" className="footer__link">FAQ</a>
          <a href="#" className="footer__link">Contact</a>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Download App</h4>
          <p className="footer__text footer__text--muted">Save $3 with App New User Only</p>
          <div className="footer__downloads">
            <div className="footer__stores">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
              />
            </div>
          </div>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">Copyright Luxe Label 2025. All rights reserved.</div>
    </footer>
  );
}
