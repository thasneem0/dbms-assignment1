// src/components/MenuItemCard.js

import React from 'react';

/**
 * Displays a single menu item (like 'Shawaya Chicken') and its price.
 * It contains the 'Add' button to interact with the cart.
 *
 * @param {object} item - Contains { item_id, name, price, category }
 * @param {function} onAddToCart - Function to call when the button is clicked.
 */
function MenuItemCard({ item, onAddToCart }) {
    const { item_id, name, price } = item;
    
    // Format the price for display
    const formattedPrice = price ? `₹${price.toFixed(2)}` : 'N/A';
    
    // This function runs when the user clicks 'Add'
    const handleClick = () => {
        // We pass the item's essential data (ID, name, price) up to App.js 
        // to be stored in the cart state.
        onAddToCart({ item_id, name, price });
        
        // Optional: Provide visual feedback
        console.log(`Added Item ID ${item_id}: ${name} to cart.`);
    };

    return (
        <div className="menu-item">
            <div className="item-info">
                <h4>{name}</h4>
                {/* A description could go here */}
            </div>
            
            <div className="item-price">{formattedPrice}</div>
            
            {/* The button that starts the Orderltem process */}
            <button 
                className="add-to-cart-btn" 
                onClick={handleClick}
            >
                Add
            </button>
        </div>
    );
}

export default MenuItemCard;