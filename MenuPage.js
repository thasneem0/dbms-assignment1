import React from 'react'; 
import MenuCategory from '../components/MenuCategory';
import OrderSummary from '../components/OrderSummary';

// Ensure all prices are defined as numbers for reliability
const MOCK_MENU_ITEMS = [
    // --- MAIN ---
    { id: 1, name: "Shawaya Chicken", price: 249.00, category: "MAIN" },
    { id: 2, name: "Veg Fried Rice", price: 129.00, category: "MAIN" },
    { id: 3, name: "Paneer Butter Masala", price: 189.00, category: "MAIN" },
    { id: 4, name: "Mutton Biryani", price: 299.00, category: "MAIN" },
    { id: 5, name: "Grilled Fish", price: 279.00, category: "MAIN" },
    { id: 6, name: "Butter Naan", price: 45.00, category: "MAIN" },
    // --- STARTER ---
    { id: 7, name: "Chicken Tikka", price: 199.00, category: "STARTER" },
    { id: 8, name: "Veg Manchurian", price: 149.00, category: "STARTER" },
    { id: 9, name: "Chicken Shawarma Roll", price: 119.00, category: "STARTER" },
    { id: 10, name: "Cheese Garlic Bread", price: 99.00, category: "STARTER" },
    { id: 11, name: "Chicken Wings", price: 179.00, category: "STARTER" },
    // --- DESSERT ---
    { id: 12, name: "Chocolate Brownie", price: 99.00, category: "DESSERT" },
    { id: 13, name: "Gulab Jamun", price: 79.00, category: "DESSERT" },
    // --- BEVERAGE ---
    { id: 14, name: "Cold Drink", price: 40.00, category: "BEVERAGE" },
    { id: 15, name: "Mint Lemonade", price: 60.00, category: "BEVERAGE" },
];

function MenuPage({ addToCart, cart }) {
    
    const groupedItems = MOCK_MENU_ITEMS.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    // This function handles the core logic for the cart update
    const handleAddToCart = (itemToAdd) => {
        
        // CRITICAL STEP: Ensure the price is a valid number when entering the cart.
        const numericItemToAdd = { 
            ...itemToAdd, 
            price: parseFloat(itemToAdd.price) || 0 
        };

        const existingItem = cart.find(item => item.id === numericItemToAdd.id);
        
        if (existingItem) {
            // Logic for SAME ITEM (Multiplication): Increment quantity
            const updatedCart = cart.map(item => 
                item.id === numericItemToAdd.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            );
            // Call the parent's state setter function
            addToCart(updatedCart); 
        } else {
            // Logic for DIFFERENT ITEM (Addition): Add new item with quantity 1
            const newItem = { ...numericItemToAdd, quantity: 1 };
            // Call the parent's state setter function
            addToCart([...cart, newItem]);
        }
    };

    return (
        <div className="menu-page-layout">
            <div className="menu-list">
                <h2>CHILLI BBQ Menu 🔥</h2>
                
                {Object.keys(groupedItems).map(category => (
                    <MenuCategory 
                        key={category}
                        categoryName={category} 
                        items={groupedItems[category]} 
                        // Passes the item addition/multiplication logic down
                        onAddToCart={handleAddToCart} 
                    />
                ))}
            </div>

            <div className="cart-sidebar">
                <OrderSummary cart={cart} />
            </div>
        </div>
    );
}

export default MenuPage;