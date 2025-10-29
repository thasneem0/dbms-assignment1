// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// PAGES (Corrected to use default imports)
import Login from './pages/Login';
import MenuPage from './pages/MenuPage';
import OrderTracking from './pages/OrderTracking';

// Import CSS (The file that was previously causing errors)
import './style.css'; 

function App() {
    // State to hold the items in the shopping cart
    const [cart, setCart] = useState([]);

    // Function to add an item to the cart or increase its quantity
    const addToCart = (itemToAdd) => {
        setCart(prevCart => {
            // Check if the item already exists in the cart
            const existingItemIndex = prevCart.findIndex(item => item.item_id === itemToAdd.item_id);

            if (existingItemIndex > -1) {
                // Item exists: increase quantity
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += 1;
                return newCart;
            } else {
                // Item is new: add with quantity 1
                return [...prevCart, { ...itemToAdd, quantity: 1 }];
            }
        });
    };

    return (
        <Router>
            {/* Header and Footer are outside the Routes so they appear on every page */}
            <Header cartCount={cart.length} /> 
            
            <main>
                <Routes>
                    {/* Route for the Menu Page (The main ordering interface) */}
                    <Route 
                        path="/" 
                        element={<MenuPage addToCart={addToCart} cart={cart} />} 
                    />
                    
                    {/* Route for the Login Page */}
                    <Route 
                        path="/login" 
                        element={<Login />} 
                    />
                    
                    {/* Route for Order Tracking (Placeholder) */}
                    <Route 
                        path="/track" 
                        element={<OrderTracking />} 
                    />
                </Routes>
            </main>

            <Footer />
        </Router>
    );
}

export default App;

