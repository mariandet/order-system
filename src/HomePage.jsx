import React, { useState } from "react";
import "./HomePage.css"; // Create this file for styling
import Slideshow from './components/Slideshow';
import CartDropdown from './components/CartDropdown';
const khmerFoodData = [
    {
        name: "Fish Amok",
        price: 4.50,
        image: "amok.jpg",
    },
    {
        name: "Beef Lok Lak",
        price: 5.00,
        image: "loklak.png",
    },
    {
        name: "Prahok Ktis",
        price: 3.75,
        image: "prohokKtis.png",
    },
    {
        name: "Nom Banh Chok",
        price: 3.00,
        image: "nomBanhJok.png",
    }
];

export default function HomePage() {
    const [cartItems, setCartItems] = useState([]);

    const [favorites, setFavorites] = useState([]);
    const toggleFavorite = (foodName) => {
        setFavorites((prev) =>
            prev.includes(foodName)
                ? prev.filter((name) => name !== foodName)
                : [...prev, foodName]
        );
    };
    const handleRemove = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleBuy = (item) => {
        setCartItems((prev) => [...prev, item]);
    };
    const orderDetailsForBackend = cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1, // default quantity 1 if not available
    }));

    const handleBuyAll = async () => {
    try {
       const    response = await fetch('http://localhost:3000/api/order-success', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: new Date().getTime().toString(),
                    customerName: "Customer Name",
                    cartItems: orderDetailsForBackend,
                    total: total,
                }),
                });

        const data = await response.json();
    } catch (error) {
        console.error('Purchase error:', error);
        alert('Failed to send purchase info');
    }
            setCartItems([]);
    };
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const handleClearCart = () => {
        setCartItems([]);
    };

    const [isCartVisible, setCartVisible] = useState(false);

    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };
const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className={isDarkMode ? "homepage dark" : "homepage"}>
            {/* Header */}
            <header className={`header ${isDarkMode ? 'dark' : ''}`}>
                <div className="logo-container">
                    <img src="logo.png" alt="Khmer Restaurant Logo" className="logo" />
                </div>

                <nav>

                    <a href="#menu">Menu</a>
                    <a href="#contact">Contact</a>
                    <div className="cart-dropdown-container">
                        <button onClick={toggleCart} className="cart-nav-button">
                           <img src="cart.png" className="icon-cart" alt="" />({cartItems.length})
                        </button>
                         <CartDropdown
                                isCartVisible={isCartVisible}
                                cartItems={cartItems}
                                total={total}
                                handleRemove={handleRemove}
                                handleBuyAll={handleBuyAll}
                                handleClearCart={handleClearCart}
                        />
                    </div>

                </nav>
            </header>

            {/* Slideshow */}
            <Slideshow />

            {/* Menu Section */}
            <section id="menu" className="menu-section">
                <h3>Our Best-Selling Dishes</h3>
                <div className="menu-grid">
                    {khmerFoodData.map((item, index) => (
                        <div className="menu-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <h4>{item.name}</h4>
                            <p>$ {item.price}</p>
                            {/* Buy Button */}
                            <button className="buy-button" onClick={() => handleBuy(item)}>
                                🛒 Order
                            </button>
                            <button
                                className={`favorite-button ${favorites.includes(item.name) ? "active" : "" 
                                    }`}
                                onClick={() => toggleFavorite(item.name)}
                            >
                                {favorites.includes(item.name) ? "❤️ Favorited" : "🤍 Favorite"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Khmer Flavor. All rights reserved.</p>
            </footer>
        </div>
    );
}
