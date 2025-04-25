// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalAmountElement = document.getElementById('cart-total-amount');
    if (!cartItemsContainer || !totalAmountElement) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Clear existing cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        totalAmountElement.textContent = '0.00';
        return;
    }
    
    // Calculate total
    let total = 0;
    
    // Display each cart item
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">£${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                    <span class="cart-item-remove" data-id="${item.id}">Remove</span>
                </div>
            </div>
            <div class="cart-item-total">£${itemTotal.toFixed(2)}</div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Update total amount
    totalAmountElement.textContent = total.toFixed(2);
    
    // Add event listeners
    addCartEventListeners();
}

// Function to add event listeners to cart items
function addCartEventListeners() {
    // Minus button
    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), 'decrease');
        });
    });
    
    // Plus button
    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), 'increase');
        });
    });
    
    // Quantity input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            updateQuantity(parseInt(this.getAttribute('data-id')), 'set', parseInt(this.value));
        });
    });
    
    // Remove button
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            removeFromCart(parseInt(this.getAttribute('data-id')));
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            checkout();
        });
    }
}

// Function to update item quantity
function updateQuantity(productId, action, value = null) {
    // Get the current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Find the item
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    // Update quantity based on action
    if (action === 'increase') {
        cart[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
    } else if (action === 'set' && value !== null) {
        if (value < 1) {
            removeFromCart(productId);
            return;
        }
        cart[itemIndex].quantity = value;
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Refresh cart display
    displayCartItems();
}

// Function to remove item from cart
function removeFromCart(productId) {
    // Get the current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove the item
    cart = cart.filter(item => item.id !== productId);
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Refresh cart display
    displayCartItems();
}

// Function to handle checkout
function checkout() {
    alert('Thank you for your purchase! In a real site, you would be redirected to a payment gateway.');
    // Clear cart after purchase
    localStorage.removeItem('cart');
    displayCartItems();
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});