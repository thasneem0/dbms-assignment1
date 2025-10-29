// src/components/Footer.js

import React from 'react';
// Note: No need for Link here unless you add navigation links to the footer

function Footer() {
    // Get the current year dynamically for the copyright notice
    const currentYear = new Date().getFullYear(); 

    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {currentYear} CHILLI BBQ - Food Ordering System. All rights reserved.</p>
                <div className="footer-links">
                    {/* FIXED: Replaced href="#" with a valid relative path 
                      to satisfy the jsx-a11y/anchor-is-valid rule. 
                    */}
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/login">Staff Login</a> 
                </div>
            </div>
        </footer>
    );
}

export default Footer;