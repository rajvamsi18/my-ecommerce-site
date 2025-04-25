// Product Detail Page JavaScript

// Sample product data for the detail page (in a real app, this would come from the server)
const productDetails = {
    1: {
        name: "Organic Hand Soap",
        brand: "Little Soap Company",
        category: "Personal Care",
        price: 4.99,
        description: "A gentle, organic hand soap that cleanses without irritating sensitive skin. Made with natural ingredients and essential oils.",
        details: "Our organic hand soap is made with ingredients derived from plants and minerals. It's gentle on your skin and tough on germs. The soap is free from harsh chemicals, making it suitable for the whole family.",
        ingredients: "Water, Organic Coconut Oil, Organic Olive Oil, Organic Hemp Oil, Organic Shea Butter, Sodium Hydroxide, Essential Oils.",
        images: [
            "https://via.placeholder.com/600x600?text=Hand+Soap+1",
            "https://via.placeholder.com/600x600?text=Hand+Soap+2",
            "https://via.placeholder.com/600x600?text=Hand+Soap+3",
            "https://via.placeholder.com/600x600?text=Hand+Soap+4"
        ],
        reviews: [
            {
                name: "Sarah J.",
                date: "April 15, 2025",
                rating: 5,
                comment: "Love this soap! My skin feels clean without being dried out."
            },
            {
                name: "Michael T.",
                date: "April 3, 2025",
                rating: 4,
                comment: "Great product with natural ingredients. Scent is subtle but pleasant."
            }
        ],
        relatedProducts: [2, 7]
    },
    2: {
        name: "Premium Dark Chocolate",
        brand: "Eco Chocolatier",
        category: "Food",
        price: 3.49,
        description: "72% cocoa dark chocolate bar, ethically sourced from sustainable farms.",
        details: "This premium dark chocolate is made from cocoa beans harvested from sustainable farms in South America. The high cocoa content gives it a rich, complex flavor with notes of berry and subtle earthiness.",
        ingredients: "Organic Cocoa Mass, Organic Cocoa Butter, Organic Cane Sugar, Organic Vanilla Extract.",
        images: [
            "https://via.placeholder.com/600x600?text=Chocolate+1",
            "https://via.placeholder.com/600x600?text=Chocolate+2",
            "https://via.placeholder.com/600x600?text=Chocolate+3"
        ],
        reviews: [
            {
                name: "David W.",
                date: "April 10, 2025",
                rating: 5,
                comment: "Best dark chocolate I've ever tasted. Not too bitter, perfect balance."
            }
        ],
        relatedProducts: [4, 5]
    },
    3: {
        name: "Sparkling Mineral Water",
        brand: "Pure Springs",
        category: "Drinks",
        price: 1.79,
        description: "Refreshing sparkling water with natural minerals for a clean, crisp taste.",
        details: "Our sparkling mineral water is sourced from protected underground springs and naturally filtered through layers of rock. The carbonation is added after bottling to create the perfect level of bubbles.",
        ingredients: "Natural Spring Water, Carbon Dioxide.",
        images: [
            "https://via.placeholder.com/600x600?text=Water+1",
            "https://via.placeholder.com/600x600?text=Water+2"
        ],
        reviews: [
            {
                name: "Emily R.",
                date: "March 28, 2025",
                rating: 4,
                comment: "Perfectly carbonated and great taste. My go-to sparkling water."
            },
            {
                name: "Jason K.",
                date: "March 15, 2025",
                rating: 5,
                comment: "Clean, refreshing, and no artificial aftertaste. Love it!"
            }
        ],
        relatedProducts: [6]
    }
    // ... more product details would be added here
};

// Function to load product details
function loadProductDetails() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // If no valid product ID, redirect to products page
    if (!productId || !productDetails[productId]) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = productDetails[productId];
    
    // Update page title
    document.title = `${product.name} - FreshMart`;
    
    // Update breadcrumb
    document.getElementById('product-breadcrumb-name').textContent = product.name;
    
    // Update product details
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-price').textContent = product.price.toFixed(2);
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-details').textContent = product.details;
    document.getElementById('product-ingredients').textContent = product.ingredients;
    
    // Set main image
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
    
    // Generate thumbnails
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    thumbnailGallery.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${product.name} - Image ${index + 1}`;
        thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumbnail.addEventListener('click', () => {
            // Update main image when thumbnail is clicked
            mainImage.src = image;
            mainImage.alt = `${product.name} - Image ${index + 1}`;
            
            // Update active thumbnail class
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            thumbnail.classList.add('active');
        });
        
        thumbnailGallery.appendChild(thumbnail);
    });
    
    // Load reviews
    loadReviews(product.reviews);
    
    // Load related products
    loadRelatedProducts(product.relatedProducts);
    
    // Add to cart button functionality
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCartFromDetail(productId, quantity);
    });
}

// Function to load reviews
function loadReviews(reviews) {
    const reviewsContainer = document.getElementById('product-reviews');
    
    // If no reviews, show the "no reviews" message
    if (!reviews || reviews.length === 0) {
        return;
    }
    
    // Clear the "no reviews" message
    reviewsContainer.innerHTML = '';
    
    // Add each review
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'product-review';
        
        // Create stars
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<span class="star ${i <= review.rating ? 'active' : ''}">★</span>`;
        }
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${review.name}</span>
                <span class="review-date">${review.date}</span>
            </div>
            <div class="review-rating">${stars}</div>
            <div class="review-content">${review.comment}</div>
        `;
        
        reviewsContainer.appendChild(reviewElement);
    });
}

// Function to load related products
function loadRelatedProducts(relatedProductIds) {
    const relatedProductsGrid = document.getElementById('related-products-grid');
    relatedProductsGrid.innerHTML = '';
    
    relatedProductIds.forEach(id => {
        if (productDetails[id]) {
            const product = productDetails[id];
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div style="position: relative;">
                    <span class="product-category">${product.category}</span>
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                </div>
                <h3>${product.name}</h3>
                <p class="product-price">£${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <a href="product-detail.html?id=${id}" class="btn add-to-cart-btn">View Details</a>
            `;
            
            relatedProductsGrid.appendChild(productCard);
        }
    });
}

// Handle tab switching
function setupTabs() {
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Remove active class from all tabs
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            header.classList.add('active');
            const tabId = `${header.getAttribute('data-tab')}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Handle quantity selectors
function setupQuantityControls() {
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity');
    
    decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    
    // Ensure quantity is never less than 1
    quantityInput.addEventListener('change', () => {
        if (parseInt(quantityInput.value) < 1) {
            quantityInput.value = 1;
        }
    });
}

// Handle review star rating
function setupStarRating() {
    const stars = document.querySelectorAll('.review-form .star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            
            // Update visual state
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });
}

// Handle review form submission
function setupReviewForm() {
    const reviewForm = document.querySelector('.review-form');
    const submitButton = document.querySelector('.submit-review-btn');
    
    if (reviewForm && submitButton) {
        submitButton.addEventListener('click', function() {
            const starsSelected = document.querySelectorAll('.review-form .star.active').length;
            const reviewText = document.querySelector('.review-form textarea').value;
            
            if (starsSelected === 0) {
                alert('Please select a rating before submitting your review.');
                return;
            }
            
            if (reviewText.trim() === '') {
                alert('Please write a review before submitting.');
                return;
            }
            
            // Show a confirmation message
            alert('Thank you for your review!');
            
            // Clear the form
            document.querySelectorAll('.review-form .star').forEach(s => s.classList.remove('active'));
            document.querySelector('.review-form textarea').value = '';
        });
    }
}

// Function to add product to cart from detail page
function addToCartFromDetail(productId, quantity) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Get product details
    const product = productDetails[productId];
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Increase quantity
        existingItem.quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart!`);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    setupTabs();
    setupQuantityControls();
    setupStarRating();
    setupReviewForm();
});