// src/pages/OrderTracking.js

import React, { useState } from 'react';

// --- MOCK DATABASE QUERY RESULTS ---
// This simulates the data we'd get from joining OrderTable, Delivery, and Customer tables.
const MOCK_ORDERS = [
    { 
        order_id: 1, 
        customer_name: 'Aisha Khan', 
        status: 'Delivered', 
        driver_name: 'Rohit Kumar', 
        driver_phone: '9876501234', 
        expected_time: '2025-10-26 13:00:00', 
        delivered_at: '2025-10-26 12:45:00' 
    },
    { 
        order_id: 2, 
        customer_name: 'Ravi Kumar', 
        status: 'Preparing', 
        driver_name: 'N/A', 
        driver_phone: 'N/A', 
        expected_time: 'N/A', 
        delivered_at: 'N/A' 
    },
    { 
        order_id: 3, 
        customer_name: 'Sneha Rao', 
        status: 'Out for delivery', 
        driver_name: 'Manish Yadav', 
        driver_phone: '9123457890', 
        expected_time: '2025-10-26 13:30:00', 
        delivered_at: 'N/A' 
    },
];

function OrderTracking() {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [message, setMessage] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setMessage('');
        setOrderDetails(null);

        if (!orderId) {
            setMessage('Please enter your Order ID.');
            return;
        }

        // --- ⚠️ API CALL SIMULATION ⚠️ ---
        // Converts the string input to an integer for matching against the mock data
        const foundOrder = MOCK_ORDERS.find(order => order.order_id === parseInt(orderId));

        if (foundOrder) {
            setOrderDetails(foundOrder);
        } else {
            setMessage(`Order ID ${orderId} not found.`);
        }
    };

    // Helper function to assign a CSS class based on the order status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered':
                return 'status-delivered';
            case 'Out for delivery':
                return 'status-delivery';
            case 'Preparing':
                return 'status-preparing';
            case 'Placed':
            default:
                return 'status-placed';
        }
    };

    return (
        <div className="order-tracking-container">
            <div className="tracking-card">
                <h2>Track Your CHILLI BBQ Order 🔥</h2>
                <p>Enter the Order ID you received after checkout to see its status.</p>

                <form onSubmit={handleSearch} className="tracking-form">
                    <input
                        type="number"
                        placeholder="Enter Order ID (e.g., 1, 2, or 3)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    <button type="submit" className="search-btn">Track Order</button>
                </form>

                {message && <p className="tracking-message error">{message}</p>}

                {orderDetails && (
                    <div className="order-details-display">
                        <div className="detail-row status-header">
                            <strong>Current Status:</strong> 
                            <span className={`status-badge ${getStatusClass(orderDetails.status)}`}>
                                {orderDetails.status.toUpperCase()}
                            </span>
                        </div>
                        
                        <div className="detail-row">
                            <strong>Customer Name:</strong> <span>{orderDetails.customer_name}</span>
                        </div>

                        {/* Display Delivery Info only if status is relevant */}
                        {(orderDetails.status === 'Out for delivery' || orderDetails.status === 'Delivered') && (
                            <>
                                <div className="detail-row">
                                    <strong>Driver:</strong> <span>{orderDetails.driver_name}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Driver Phone:</strong> <span>{orderDetails.driver_phone}</span>
                                </div>
                                <div className="detail-row">
                                    <strong>Expected Time:</strong> <span>{orderDetails.expected_time || 'N/A'}</span>
                                </div>
                                {orderDetails.delivered_at !== 'N/A' && (
                                    <div className="detail-row delivered-time">
                                        <strong>Delivered At:</strong> <span>{orderDetails.delivered_at}</span>
                                    </div>
                                )}
                            </>
                        )}
                        {/* You could add more details here, like a list of ordered items */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderTracking;