// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set up dynamic price range based on product data
    setupDynamicPriceRange();
    
    // Initialize product display
    updateProductDisplay();
    
    // Set up event listeners
    setupEventListeners();
    
    // Parse URL parameters (for category filtering from other pages)
    parseUrlParams();
});

// Function to set up dynamic price range based on product data
function setupDynamicPriceRange() {
    // Find the maximum price in products
    const maxProductPrice = Math.max(...extendedProducts.map(product => product.price));
    
    // Round up to nearest appropriate value (e.g., nearest 10)
    const roundedMaxPrice = Math.ceil(maxProductPrice / 10) * 10;
    
    // Update the slider and input max values
    const priceSlider = document.getElementById('price-slider');
    const maxPriceInput = document.getElementById('max-price');
    const priceValue = document.getElementById('price-value');
    
    if (priceSlider && maxPriceInput && priceValue) {
        priceSlider.max = roundedMaxPrice;
        priceSlider.value = roundedMaxPrice;
        maxPriceInput.value = roundedMaxPrice;
        priceValue.textContent = roundedMaxPrice;
    }
}

// Function to set up all event listeners
function setupEventListeners() {
    // Category filter checkboxes
    const categoryCheckboxes = document.querySelectorAll('#category-filters input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.id === 'category-all') {
                // If "All Categories" is checked, uncheck all others
                if (this.checked) {
                    categoryCheckboxes.forEach(cb => {
                        if (cb.id !== 'category-all') {
                            cb.checked = false;
                        }
                    });
                }
            } else {
                // If any other category is checked, uncheck "All Categories"
                document.getElementById('category-all').checked = false;
            }
        });
    });
    
    // Brand filter checkboxes
    const brandCheckboxes = document.querySelectorAll('#brand-filters input[type="checkbox"]');
    brandCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.id === 'brand-all') {
                // If "All Brands" is checked, uncheck all others
                if (this.checked) {
                    brandCheckboxes.forEach(cb => {
                        if (cb.id !== 'brand-all') {
                            cb.checked = false;
                        }
                    });
                }
            } else {
                // If any other brand is checked, uncheck "All Brands"
                document.getElementById('brand-all').checked = false;
            }
        });
    });
    
    // Price slider
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    const maxPriceInput = document.getElementById('max-price');
    
    priceSlider.addEventListener('input', function() {
        priceValue.textContent = this.value;
        maxPriceInput.value = this.value;
    });
    
    maxPriceInput.addEventListener('input', function() {
        priceSlider.value = this.value;
        priceValue.textContent = this.value;
    });
    
    // Apply filters button
    document.getElementById('apply-filters').addEventListener('click', function() {
        currentPage = 1;
        applyFilters();
    });
    
    // Reset filters button
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
    
    // View options (grid/list)
    document.querySelector('.grid-view').addEventListener('click', function() {
        document.querySelector('.grid-view').classList.add('active');
        document.querySelector('.list-view').classList.remove('active');
        document.getElementById('product-grid').classList.remove('list-view');
    });
    
    document.querySelector('.list-view').addEventListener('click', function() {
        document.querySelector('.list-view').classList.add('active');
        document.querySelector('.grid-view').classList.remove('active');
        document.getElementById('product-grid').classList.add('list-view');
    });
    
    // Sort selector
    document.getElementById('sort-select').addEventListener('change', function() {
        sortProducts(this.value);
    });
    
    // Search button
    document.getElementById('search-btn').addEventListener('click', function() {
        const searchTerm = document.getElementById('product-search').value.trim().toLowerCase();
        if (searchTerm) {
            currentPage = 1;
            searchProducts(searchTerm);
        } else {
            resetFilters();
        }
    });
    
    // Mobile filter toggle
    document.querySelector('.filter-toggle').addEventListener('click', function() {
        document.querySelector('.filters').classList.toggle('open');
        const toggleIcon = document.querySelector('.toggle-icon');
        toggleIcon.textContent = toggleIcon.textContent === '≡' ? '✕' : '≡';
    });
    
    // Pagination buttons
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateProductDisplay();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateProductDisplay();
        }
    });
}

// Function to parse URL parameters
function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Uncheck "All Categories"
        document.getElementById('category-all').checked = false;
        
        // Find and check the matching category checkbox
        const categoryId = `category-${category.toLowerCase()}`;
        const categoryCheckbox = document.getElementById(categoryId);
        
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            
            // Update breadcrumb
            document.getElementById('category-breadcrumb').textContent = category.charAt(0).toUpperCase() + category.slice(1);
            
            // Apply filters
            applyFilters();
        }
    }
}

// Function to apply filters
function applyFilters() {
    // Get selected categories
    const selectedCategories = [];
    const categoryCheckboxes = document.querySelectorAll('#category-filters input[type="checkbox"]:checked');
    
    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.id !== 'category-all') {
            // Extract category name from the ID (e.g., "category-personal-care" -> "Personal Care")
            const categoryId = checkbox.id.replace('category-', '');
            const categoryName = categoryId.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            selectedCategories.push(categoryName);
        }
    });
    
    // Get selected brands
    const selectedBrands = [];
    const brandCheckboxes = document.querySelectorAll('#brand-filters input[type="checkbox"]:checked');
    
    brandCheckboxes.forEach(checkbox => {
        if (checkbox.id !== 'brand-all') {
            // Extract brand name from the ID (e.g., "brand-little-soap" -> "Little Soap Company")
            const brandId = checkbox.id.replace('brand-', '');
            
            // Map brand IDs to full brand names
            const brandMap = {
                'little-soap': 'Little Soap Company',
                'eco-chocolatier': 'Eco Chocolatier',
                'pure-springs': 'Pure Springs',
                'fresh-farm': 'Fresh Farm',
                'eco-essentials': 'Eco Essentials'
            };
            
            selectedBrands.push(brandMap[brandId]);
        }
    });
    
    // Get price range
    const maxPrice = parseFloat(document.getElementById('max-price').value);
    
    // Filter products
    filteredProducts = extendedProducts.filter(product => {
        // Filter by category (if any selected)
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        // Filter by brand (if any selected)
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        
        // Filter by price
        const priceMatch = product.price <= maxPrice;
        
        return categoryMatch && brandMatch && priceMatch;
    });
    
    // Apply current sort
    const sortSelect = document.getElementById('sort-select');
    sortProducts(sortSelect.value);
    
    // Update display
    updateProductDisplay();
}

// Function to reset all filters
function resetFilters() {
    // Reset category filters
    document.getElementById('category-all').checked = true;
    document.querySelectorAll('#category-filters input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.id !== 'category-all') {
            checkbox.checked = false;
        }
    });
    
    // Reset brand filters
    document.getElementById('brand-all').checked = true;
    document.querySelectorAll('#brand-filters input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.id !== 'brand-all') {
            checkbox.checked = false;
        }
    });
    
    // Reset price range
    document.getElementById('min-price').value = 0;
    
    // Get max price from slider
    const maxPrice = document.getElementById('price-slider').max;
    document.getElementById('max-price').value = maxPrice;
    document.getElementById('price-slider').value = maxPrice;
    document.getElementById('price-value').textContent = maxPrice;
    
    // Reset search
    document.getElementById('product-search').value = '';
    
    // Reset breadcrumb
    document.getElementById('category-breadcrumb').textContent = 'All Products';
    
    // Reset filtered products
    filteredProducts = [...extendedProducts];
    currentPage = 1;
    
    // Apply default sort
    document.getElementById('sort-select').value = 'name-asc';
    sortProducts('name-asc');
    
    // Update display
    updateProductDisplay();
}

// Function to search products
function searchProducts(searchTerm) {
    filteredProducts = extendedProducts.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    });
    
    // Update breadcrumb
    document.getElementById('category-breadcrumb').textContent = `Search results for "${searchTerm}"`;
    
    // Update display
    updateProductDisplay();
}

// Function to sort products
function sortProducts(sortOption) {
    switch(sortOption) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }
    
    updateProductDisplay();
}

// Function to update product display
function updateProductDisplay() {
    const productGrid = document.getElementById('product-grid');
    const productCount = document.getElementById('product-count');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Update product count
    productCount.textContent = filteredProducts.length;
    
    // Clear product grid
    productGrid.innerHTML = '';
    
    // Add products to grid
    if (currentProducts.length === 0) {
        productGrid.innerHTML = '<div class="no-products">No products found matching your criteria. Try adjusting your filters.</div>';
    } else {
        currentProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image-container">
                    <span class="product-category">${product.category}</span>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-details">
                    <div class="product-brand">${product.brand}</div>
                    <a href="product-detail.html?id=${product.id}" class="product-title">${product.name}</a>
                    <div class="product-price">£${product.price.toFixed(2)}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="view-product-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
    
    // Update pagination controls
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Update page numbers
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = `page-number${i === currentPage ? ' active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', function() {
            currentPage = i;
            updateProductDisplay();
        });
        pageNumbers.appendChild(pageNumber);
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the product in our products array
    const product = extendedProducts.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increase quantity
        existingItem.quantity += 1;
    } else {
        // Add new item
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Added ${product.name} to cart!`);
}