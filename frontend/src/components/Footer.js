import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logos.png'

export default function Footer() {
    return (
        <section className="footer container">
            <div className="footer-left">
                <Link to="/" className="logo">
                    <img src={logo} alt="" />
                </Link>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sed, exercitationem numquam velit repudiandae at ex voluptatum vitae sequi possimus alias nobis, inventore asperiores aliquam aliquid vel fugiat voluptate voluptatibus.</p>
                <div className="footer-social">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-pinterest"></i>
                </div>
            </div>
            <div className="footer-middle">
                <h3>Useful Links</h3>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Man Fashion</Link></li>
                    <li><Link to="/">Accessories</Link></li>
                    <li><Link to="/">Order Tracking</Link></li>
                    <li><Link to="/">Wishlist</Link></li>
                    <li><Link to="/">Card</Link></li>
                    <li><Link to="/">Woman Fashion</Link></li>
                    <li><Link to="/">My Account</Link></li>
                    <li><Link to="/">Wishlist</Link></li>
                    <li><Link to="/">Themes</Link></li>
                </ul>
            </div>
            <div className="footer-right">
                <h3>Contact</h3>
                <div className="footer-adress">
                    <span><i className="fas fa-map-marker-alt"></i>622 Dixie Path , South Tobinchester 98336</span>
                </div>
                <div className="footer-number">
                    <span><i className="far fa-phone-alt"></i>+1 234 56 78</span>
                </div>
                <div className="footer-mail">
                    <span><i className="far fa-envelope"></i>contact@brandyol.com</span>
                </div>
                <div className="footer-paycards">
                    <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
                </div>
            </div>
        </section>
    )
}
