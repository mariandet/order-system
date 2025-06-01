import React from "react";
import Swal from 'sweetalert2';
import '@sweetalert2/theme-material-ui/material-ui.css'; // Optional: nice theme

function CartDropdown({
  isCartVisible,
  cartItems,
  total,
  handleRemove,
  handleBuyAll,
  handleClearCart,
}) {
  if (!isCartVisible) return null;

  const onPurchaseClick = async () => {
    if (cartItems.length === 0) {
      Swal.fire('Empty Cart', 'Your cart is empty!', 'info');
      return;
    }

    // Build order details string with line breaks for HTML display
    const orderDetailsHtml = cartItems
      .map(item => `${item.name} - $${item.price.toFixed(2)}`)
      .join('<br/>');

    // Also prepare a plain text version to send to backend
    const orderDetailsForBackend = cartItems.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1, // default quantity 1 if not available
    }));

    const result = await Swal.fire({
      title: 'Confirm Your Purchase',
      html: `
        <p><strong>Order Details:</strong></p>
        <p style="text-align: left;">${orderDetailsHtml}</p>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm Purchase',
      cancelButtonText: 'Cancel',
      focusConfirm: false,
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('http://localhost:3000/api/order-success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: new Date().getTime().toString(), // simple unique order id (you can replace with real)
            customerName: "Customer Name", // replace or get actual user name if you have
            cartItems: orderDetailsForBackend,
            total: total,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        Swal.fire('Success', 'Your purchase was successful and notified!', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to notify purchase. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="cart-dropdown">
      {cartItems.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          <ul className="cart-dropdown-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-dropdown-item">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(index)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <img
                    className="icon-delete"
                    src="delete.png"
                    alt="Delete icon"
                    srcSet=""
                  />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-dropdown-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <div className="cart-dropdown-actions">
            <button onClick={onPurchaseClick} className="process-btn">
              Purchase
            </button>
            <button onClick={handleClearCart} className="clear-btn">
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartDropdown;
