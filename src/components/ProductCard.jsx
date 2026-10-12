export default function ProductCard({ product, onSelect, onAddToCart, isInCart }) {
  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0})
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`cart-btn ${isInCart ? 'in-cart' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            {isInCart ? '✓ In Cart' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
