import ProductCard from './ProductCard';

export default function ProductDetail({
  product,
  similarProducts,
  onClose,
  onAddToCart,
  cart,
  onSelectSimilar,
}) {
  if (!product) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn detail-close" onClick={onClose}>
          ✕
        </button>

        <div className="detail-content">
          <div className="detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="detail-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.title}</h2>
            <div className="product-rating">
              ⭐ {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
            </div>
            <p className="detail-description">{product.description}</p>
            <div className="detail-price">${product.price.toFixed(2)}</div>
            <button
              className="add-to-cart-main"
              onClick={() => onAddToCart(product)}
            >
              {cart.some((i) => i.id === product.id)
                ? '✓ Already in Cart'
                : '+ Add to Cart'}
            </button>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="similar-section">
            <h3>Similar Products (same category)</h3>
            <div className="similar-grid">
              {similarProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={onSelectSimilar}
                  onAddToCart={onAddToCart}
                  isInCart={cart.some((i) => i.id === p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
