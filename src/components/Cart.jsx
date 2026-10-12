export default function Cart({ cart, onRemove, onClose, isOpen }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>🛒 Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
