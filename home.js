// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayBestSellers();
    setupForms();
});

// Function to display featured products (limited to 3)
function displayFeaturedProducts() {
    const featuredProductIds = [1, 3, 5]; // IDs of featured products (limited to 3)
    const featuredProductsContainer = document.getElementById('featured-products-container');
    
    if (featuredProductsContainer) {
        // Filter featured products
        const featuredProducts = products.filter(product => 
            featuredProductIds.includes(product.id)
        );
        
        // Display each featured product
        featuredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div style="position: relative;">
                    <span class="product-category">${product.category}</span>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="product-price">£${product.price.toFixed(2)}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="view-product-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            featuredProductsContainer.appendChild(productCard);
        });
        
        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('#featured-products-container .add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

// Function to display best sellers (limited to 3)
function displayBestSellers() {
    const bestSellerIds = [2, 4, 8]; // IDs of best-selling products (limited to 3)
    const bestSellersContainer = document.getElementById('best-sellers-container');
    
    if (bestSellersContainer) {
        // Filter best-selling products
        const bestSellerProducts = products.filter(product => 
            bestSellerIds.includes(product.id)
        );
        
        // Display each best-selling product
        bestSellerProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div style="position: relative;">
                    <span class="product-category">${product.category}</span>
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="product-price">£${product.price.toFixed(2)}</p>
                    <p class="product-description">${product.description}</p>
                    <div class="product-actions">
                        <a href="product-detail.html?id=${product.id}" class="view-product-btn">View Details</a>
                        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            bestSellersContainer.appendChild(productCard);
        });
        
        // Add event listeners to "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('#best-sellers-container .add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

// Function to handle form submissions
function setupForms() {
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message!');
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            this.reset();
        });
    }
}