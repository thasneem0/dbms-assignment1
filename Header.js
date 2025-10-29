// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The Header component for the CHILLI BBQ frontend.
 * It displays the logo, navigation links, and the cart status.
 *
 * @param {number} cartCount - The number of items currently in the cart.
 */
function Header({ cartCount }) {
    return (
        <header>
            <div className="logo">
                {/* Use Link to navigate to the home/menu page */}
                <Link to="/">
                    <h1>CHILLI BBQ 🌶️🔥</h1>
                </Link>
            </div>
            
            <nav>
                {/* Navigation links using Link for client-side routing */}
                <Link to="/">Menu</Link>
                <Link to="/track">My Orders</Link>
                <Link to="/login">Login/Sign Up</Link>
            </nav>
            
            <div className="cart-icon">
                {/* Displays the cart count passed from the App component */}
                <Link to="/cart">
                    🛒 Cart (<span id="cart-count">{cartCount}</span>)
                </Link>
            </div>
        </header>
    );
}

export default Header;