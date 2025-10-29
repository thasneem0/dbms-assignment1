// src/components/MenuCategory.js

import React from 'react';
import MenuItemCard from './MenuItemCard';

/**
 * Displays a section of the menu grouped by a single category (e.g., STARTER).
 * It loops through the items and renders a MenuItemCard for each one.
 * * @param {string} categoryName - The name of the category (e.g., 'Main', 'Starter').
 * @param {Array} items - The list of menu items in this specific category.
 * @param {function} onAddToCart - Function to handle adding items to the cart.
 */
function MenuCategory({ categoryName = '', items, onAddToCart }) { // 👈 ADDED DEFAULT VALUE HERE
    // Optionally skip rendering if the category is empty
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="category-section">
            {/* Category Title: e.g., STARTER, MAIN, BEVERAGE */}
            {/* Now categoryName is guaranteed to be a string */}
            <h3 className="category-title">{categoryName.toUpperCase()}</h3>
            
            <div className="category-items-list">
                {/* Map over the items array and render a card for each one */}
                {items.map(item => (
                    <MenuItemCard 
                        key={item.item_id} 
                        item={item} 
                        onAddToCart={onAddToCart} 
                    />
                ))}
            </div>
        </div>
    );
}

export default MenuCategory;