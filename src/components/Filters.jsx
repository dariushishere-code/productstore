export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>Search Product</label>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>
          Price Range: ${priceRange[0]} – ${priceRange[1]}
        </label>
        <div className="price-sliders">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[0]}
            onChange={(e) =>
              onPriceChange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>
    </div>
  );
}
