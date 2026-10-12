import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { useLocalStorage } from './hooks/useLocalStorage';
import ProductCard from './components/ProductCard';
import Filters from './components/Filters';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import './App.css';

const API_URL = 'https://fakestoreapi.com/products';
const CACHE_KEY = 'fakestore_products';
const CACHE_TIME_KEY = 'fakestore_products_time';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters persisted in LocalStorage
  const [searchQuery, setSearchQuery] = useLocalStorage('filter_search', '');
  const [selectedCategory, setSelectedCategory] = useLocalStorage(
    'filter_category',
    'all'
  );
  const [priceRange, setPriceRange] = useLocalStorage('filter_price', [0, 1000]);

  // Cart persisted
  const [cart, setCart] = useLocalStorage('shopping_cart', []);

  // UI state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  // Fetch products with LocalStorage cache
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        // Check cache
        const cached = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);

        if (
          cached &&
          cachedTime &&
          Date.now() - Number(cachedTime) < CACHE_DURATION
        ) {
          setProducts(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();

        setProducts(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
      } catch (err) {
        setError(err.message);
        // Fallback to cache even if expired
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          setProducts(JSON.parse(cached));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return cats.sort();
  }, [products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !debouncedSearch ||
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const matchesPrice =
        p.price >= priceRange[0] && p.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, debouncedSearch, selectedCategory, priceRange]);

  // Similar products (same category, exclude current)
  const similarProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return products
      .filter(
        (p) =>
          p.category === selectedProduct.category && p.id !== selectedProduct.id
      )
      .slice(0, 4);
  }, [selectedProduct, products]);

  // Cart handlers
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🛍️ ProductStore</h1>
          <button className="cart-toggle" onClick={() => setIsCartOpen(true)}>
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      <main className="main">
        {/* Filters */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Status */}
        <div className="status-bar">
          {loading && <p className="loading">Loading products...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && (
            <p className="results-count">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
              onAddToCart={addToCart}
              isInCart={cart.some((i) => i.id === product.id)}
            />
          ))}
        </div>

        {!loading && filteredProducts.length === 0 && (
          <p className="no-results">No products found matching your filters.</p>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        similarProducts={similarProducts}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        cart={cart}
        onSelectSimilar={setSelectedProduct}
      />

      {/* Cart Sidebar */}
      <Cart
        cart={cart}
        onRemove={removeFromCart}
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />
    </div>
  );
}

export default App;
