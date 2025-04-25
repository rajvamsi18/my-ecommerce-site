// Sample product data (later we'll fetch this from a database)

// Updated product data with real items
const products = [
    {
        id: 1,
        name: "Organic Hand Soap",
        brand: "Little Soap Company",
        category: "Personal Care",
        price: 4.99,
        image: "https://via.placeholder.com/300x300?text=Hand+Soap",
        description: "Natural hand soap with lavender essential oil for sensitive skin",
        details: "Our organic hand soap is made with ingredients derived from plants and minerals. It's gentle on your skin and tough on germs. The soap is free from harsh chemicals, making it suitable for the whole family.",
        ingredients: "Water, Organic Coconut Oil, Organic Olive Oil, Organic Hemp Oil, Organic Shea Butter, Sodium Hydroxide, Essential Oils.",
        popular: true,
        featured: true
    },
    {
        id: 2,
        name: "Premium Dark Chocolate",
        brand: "Eco Chocolatier",
        category: "Food",
        price: 3.49,
        image: "https://via.placeholder.com/300x300?text=Dark+Chocolate",
        description: "72% cocoa dark chocolate bar, ethically sourced from sustainable farms",
        details: "This premium dark chocolate is made from cocoa beans harvested from sustainable farms in South America. The high cocoa content gives it a rich, complex flavor with notes of berry and subtle earthiness.",
        ingredients: "Organic Cocoa Mass, Organic Cocoa Butter, Organic Cane Sugar, Organic Vanilla Extract.",
        popular: true,
        featured: false
    },
    {
        id: 3,
        name: "Sparkling Mineral Water",
        brand: "Pure Springs",
        category: "Drinks",
        price: 1.79,
        image: "https://via.placeholder.com/300x300?text=Mineral+Water",
        description: "Refreshing sparkling water with natural minerals for a clean, crisp taste",
        details: "Our sparkling mineral water is sourced from protected underground springs and naturally filtered through layers of rock. The carbonation is added after bottling to create the perfect level of bubbles.",
        ingredients: "Natural Spring Water, Carbon Dioxide.",
        popular: false,
        featured: true
    },
    {
        id: 4,
        name: "Whole Grain Bread",
        brand: "Fresh Bakery",
        category: "Bakery",
        price: 3.29,
        image: "https://via.placeholder.com/300x300?text=Whole+Grain+Bread",
        description: "Freshly baked whole grain bread, rich in fiber and nutrients",
        details: "Our whole grain bread is baked fresh daily using a blend of whole wheat flour, seeds, and grains. It's perfect for sandwiches, toast, or enjoying with your favorite spreads.",
        ingredients: "Whole Wheat Flour, Water, Honey, Yeast, Salt, Flax Seeds, Sunflower Seeds, Oats.",
        popular: true,
        featured: false
    },
    {
        id: 5,
        name: "Fresh Avocados (3 pack)",
        brand: "Fresh Farm",
        category: "Produce",
        price: 4.99,
        image: "https://via.placeholder.com/300x300?text=Avocados",
        description: "Ripe and ready-to-eat Hass avocados, perfect for guacamole or toast",
        details: "Our Hass avocados are carefully selected for ripeness and quality. Rich in healthy fats and nutrients, they're versatile for many recipes or simply enjoyed on their own.",
        ingredients: "100% Fresh Hass Avocados.",
        popular: false,
        featured: true
    },
    {
        id: 6,
        name: "Organic Cold Brew Coffee",
        brand: "Pure Springs",
        category: "Drinks",
        price: 4.49,
        image: "https://via.placeholder.com/300x300?text=Cold+Brew",
        description: "Smooth, low-acid cold brew coffee in a convenient bottle",
        details: "Our cold brew coffee is steeped for 12 hours to create a smooth, rich flavor with lower acidity than regular coffee. Made with organic, fair-trade beans.",
        ingredients: "Filtered Water, Organic Fair-Trade Coffee.",
        popular: false,
        featured: true
    },
    {
        id: 7,
        name: "Dishwashing Liquid",
        brand: "Little Soap Company",
        category: "Household",
        price: 2.99,
        image: "https://via.placeholder.com/300x300?text=Dishwashing+Liquid",
        description: "Effective and eco-friendly dishwashing liquid that's gentle on hands",
        details: "Our plant-based dishwashing liquid cuts through grease effectively while being gentle on your hands and the environment. The biodegradable formula is free from harsh chemicals.",
        ingredients: "Water, Coconut-Derived Surfactants, Citric Acid, Salt, Natural Fragrance, Preservative.",
        popular: true,
        featured: false
    },
    {
        id: 8,
        name: "Organic Eggs (12 pack)",
        brand: "Fresh Farm",
        category: "Dairy & Eggs",
        price: 5.49,
        image: "https://via.placeholder.com/300x300?text=Organic+Eggs",
        description: "Free-range, organic eggs from local farms with rich, golden yolks",
        details: "Our organic eggs come from free-range hens raised on local farms with access to outdoor space and a natural diet. The result is eggs with vibrant, golden yolks and superior flavor.",
        ingredients: "Organic Free-Range Eggs.",
        popular: true,
        featured: false
    }
];


// Function to display products on the products page
function displayProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return; // Exit if we're not on a page with product grid
    
    // Clear existing products
    productGrid.innerHTML = '';
    
    // Add each product to the grid
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div style="position: relative;">
                <span class="product-category">${product.category}</span>
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <h3>${product.name}</h3>
            <p class="product-price">£${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
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

// Function to add a product to the cart
function addToCart(productId) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the product in our products array
    const product = products.find(p => p.id === productId);
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

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    
    // Set up proper social media links to open in new tabs
    document.querySelectorAll('.social-links a').forEach(link => {
        // Set target to _blank to open in new tab
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Extended product data with complete details for the product page and filtering
const extendedProducts = [
    {
        id: 1,
        name: "Organic Hand Soap",
        brand: "Little Soap Company",
        category: "Personal Care",
        price: 4.99,
        image: "https://via.placeholder.com/300x300?text=Hand+Soap",
        description: "Natural hand soap with lavender essential oil for sensitive skin",
        details: "Our organic hand soap is made with ingredients derived from plants and minerals. It's gentle on your skin and tough on germs. The soap is free from harsh chemicals, making it suitable for the whole family.",
        ingredients: "Water, Organic Coconut Oil, Organic Olive Oil, Organic Hemp Oil, Organic Shea Butter, Sodium Hydroxide, Essential Oils.",
        popular: true,
        featured: true
    },
    {
        id: 2,
        name: "Premium Dark Chocolate",
        brand: "Eco Chocolatier",
        category: "Food",
        price: 3.49,
        image: "https://via.placeholder.com/300x300?text=Dark+Chocolate",
        description: "72% cocoa dark chocolate bar, ethically sourced from sustainable farms",
        details: "This premium dark chocolate is made from cocoa beans harvested from sustainable farms in South America. The high cocoa content gives it a rich, complex flavor with notes of berry and subtle earthiness.",
        ingredients: "Organic Cocoa Mass, Organic Cocoa Butter, Organic Cane Sugar, Organic Vanilla Extract.",
        popular: true,
        featured: false
    },
    {
        id: 3,
        name: "Sparkling Mineral Water",
        brand: "Pure Springs",
        category: "Drinks",
        price: 1.79,
        image: "https://via.placeholder.com/300x300?text=Mineral+Water",
        description: "Refreshing sparkling water with natural minerals for a clean, crisp taste",
        details: "Our sparkling mineral water is sourced from protected underground springs and naturally filtered through layers of rock. The carbonation is added after bottling to create the perfect level of bubbles.",
        ingredients: "Natural Spring Water, Carbon Dioxide.",
        popular: false,
        featured: true
    },
    {
        id: 4,
        name: "Whole Grain Bread",
        brand: "Fresh Bakery",
        category: "Bakery",
        price: 3.29,
        image: "https://via.placeholder.com/300x300?text=Whole+Grain+Bread",
        description: "Freshly baked whole grain bread, rich in fiber and nutrients",
        details: "Our whole grain bread is baked fresh daily using a blend of whole wheat flour, seeds, and grains. It's perfect for sandwiches, toast, or enjoying with your favorite spreads.",
        ingredients: "Whole Wheat Flour, Water, Honey, Yeast, Salt, Flax Seeds, Sunflower Seeds, Oats.",
        popular: true,
        featured: false
    },
    {
        id: 5,
        name: "Fresh Avocados (3 pack)",
        brand: "Fresh Farm",
        category: "Produce",
        price: 4.99,
        image: "https://via.placeholder.com/300x300?text=Avocados",
        description: "Ripe and ready-to-eat Hass avocados, perfect for guacamole or toast",
        details: "Our Hass avocados are carefully selected for ripeness and quality. Rich in healthy fats and nutrients, they're versatile for many recipes or simply enjoyed on their own.",
        ingredients: "100% Fresh Hass Avocados.",
        popular: false,
        featured: true
    },
    {
        id: 6,
        name: "Organic Cold Brew Coffee",
        brand: "Pure Springs",
        category: "Drinks",
        price: 4.49,
        image: "https://via.placeholder.com/300x300?text=Cold+Brew",
        description: "Smooth, low-acid cold brew coffee in a convenient bottle",
        details: "Our cold brew coffee is steeped for 12 hours to create a smooth, rich flavor with lower acidity than regular coffee. Made with organic, fair-trade beans.",
        ingredients: "Filtered Water, Organic Fair-Trade Coffee.",
        popular: false,
        featured: true
    },
    {
        id: 7,
        name: "Dishwashing Liquid",
        brand: "Little Soap Company",
        category: "Household",
        price: 2.99,
        image: "https://via.placeholder.com/300x300?text=Dishwashing+Liquid",
        description: "Effective and eco-friendly dishwashing liquid that's gentle on hands",
        details: "Our plant-based dishwashing liquid cuts through grease effectively while being gentle on your hands and the environment. The biodegradable formula is free from harsh chemicals.",
        ingredients: "Water, Coconut-Derived Surfactants, Citric Acid, Salt, Natural Fragrance, Preservative.",
        popular: true,
        featured: false
    },
    {
        id: 8,
        name: "Organic Eggs (12 pack)",
        brand: "Fresh Farm",
        category: "Dairy & Eggs",
        price: 5.49,
        image: "https://via.placeholder.com/300x300?text=Organic+Eggs",
        description: "Free-range, organic eggs from local farms with rich, golden yolks",
        details: "Our organic eggs come from free-range hens raised on local farms with access to outdoor space and a natural diet. The result is eggs with vibrant, golden yolks and superior flavor.",
        ingredients: "Organic Free-Range Eggs.",
        popular: true,
        featured: false
    },
    {
        id: 9,
        name: "Greek Yogurt",
        brand: "Fresh Farm",
        category: "Dairy & Eggs",
        price: 3.99,
        image: "https://via.placeholder.com/300x300?text=Greek+Yogurt",
        description: "Creamy, protein-rich Greek yogurt made with whole milk",
        details: "Our Greek yogurt is strained the traditional way for a thick, creamy texture. It's packed with protein and probiotics for a healthy snack or breakfast option.",
        ingredients: "Pasteurized Whole Milk, Live Active Cultures.",
        popular: false,
        featured: false
    },
    {
        id: 10,
        name: "Organic Honey",
        brand: "Fresh Farm",
        category: "Food",
        price: 6.99,
        image: "https://via.placeholder.com/300x300?text=Organic+Honey",
        description: "Raw, unfiltered honey sourced from local apiaries",
        details: "Our organic honey is harvested from local beehives and minimally processed to preserve all the natural enzymes and beneficial properties. Perfect for sweetening tea, drizzling on yogurt, or baking.",
        ingredients: "100% Raw Organic Honey.",
        popular: false,
        featured: false
    },
    {
        id: 11,
        name: "Reusable Produce Bags (5 pack)",
        brand: "Eco Essentials",
        category: "Household",
        price: 20.99,
        image: "https://via.placeholder.com/300x300?text=Produce+Bags",
        description: "Washable mesh bags for plastic-free produce shopping",
        details: "These lightweight, durable mesh bags are perfect for plastic-free shopping. Use them for fruits, vegetables, bulk foods, and more. Machine washable and designed to last for years.",
        ingredients: "Organic Cotton Mesh.",
        popular: false,
        featured: false
    },
    {
        id: 12,
        name: "Facial Cleanser",
        brand: "Little Soap Company",
        category: "Personal Care",
        price: 7.99,
        image: "https://via.placeholder.com/300x300?text=Facial+Cleanser",
        description: "Gentle, pH-balanced facial cleanser for all skin types",
        details: "Our facial cleanser effectively removes dirt and makeup without stripping your skin's natural oils. The pH-balanced formula is suitable for all skin types, including sensitive skin.",
        ingredients: "Aloe Vera Juice, Coconut-Derived Cleansers, Vegetable Glycerin, Chamomile Extract, Lavender Essential Oil.",
        popular: false,
        featured: false
    }
];

// Initialize variables for pagination in products.js
let currentPage = 1;
const productsPerPage = 6;
let filteredProducts = [...extendedProducts];