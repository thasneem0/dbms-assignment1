// src/pages/Login.js

import React, { useState } from 'react';

// MOCK DATA for Login Validation (based on your Customer data)
const MOCK_CUSTOMERS = [
    // Note: A mock password 'password123' is added for simulation
    { email: 'aisha@example.com', password: 'password123', name: 'Aisha Khan' },
    { email: 'ravi@example.com', password: 'password123', name: 'Ravi Kumar' },
    { email: 'sneha.rao@example.com', password: 'password123', name: 'Sneha Rao' },
    { email: 'farhan.ali@example.com', password: 'password123', name: 'Farhan Ali' },
    { email: 'divya.sharma@example.com', password: 'password123', name: 'Divya Sharma' },
    { email: 'rahul.mehta@example.com', password: 'password123', name: 'Rahul Mehta' },
    { email: 'sana.iqbal@example.com', password: 'password123', name: 'Sana Iqbal' },
];

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // --- SIMULATED LOGIN CHECK ---
            const user = MOCK_CUSTOMERS.find(
                customer => customer.email === formData.email && customer.password === formData.password
            );

            if (user) {
                console.log("Successful Login:", user.name);
                // In a real app, you would store JWT token/session here
                alert(`Login Successful! Welcome, ${user.name}. (Simulated)`);
            } else {
                alert("Login Failed. Invalid email or password (Mock validation).");
            }

        } else {
            // --- SIMULATED SIGN UP (Insertion into Customer table) ---
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            console.log("Attempting Signup:", {name: formData.name, email: formData.email, phone: formData.phone});
            
            // In a real app, you would make an API POST request to INSERT the new customer record.
            alert(`Signup successful for ${formData.name}. You can now log in with 'password123'. (Simulated)`);
        }
        
        // Clear form data after submission
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    };

    const toggleMode = () => {
        setIsLogin(prev => !prev);
        // Clear form data when switching between login/signup
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                
                <div className="login-header">
                    <h2 className="login-title">CHILLI BBQ</h2>
                    <span className="login-icon">🔥</span> 
                </div>

                <h3 className="form-mode-title">{isLogin ? 'Customer Login' : 'New Customer Sign Up'}</h3>

                <form onSubmit={handleSubmit} className="login-form">
                    
                    {/* Sign-Up Fields Only */}
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}

                    {/* Common Fields */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    {/* Confirm Password (Sign-Up Only) */}
                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        {isLogin ? 'LOG IN' : 'SIGN UP'}
                    </button>
                    
                </form>

                {/* Switch Mode Link (Uses a button for accessibility) */}
                <p className="toggle-mode-link">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" className="mode-toggle-btn" onClick={toggleMode}>
                        {isLogin ? ' Register Here' : ' Log In'}
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;