// Account Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Set up tab switching in account page
    setupAccountTabs();
    
    // Set up tracking modal
    setupTrackingModal();
    
    // Set up order filtering
    setupOrderFilters();
    
    // Handle view all link
    setupViewAllLink();
});

// Function to handle account tab switching
function setupAccountTabs() {
    const menuItems = document.querySelectorAll('.account-menu li');
    const tabs = document.querySelectorAll('.account-tab');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all menu items and tabs
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked menu item and corresponding tab
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Function to handle order filtering
function setupOrderFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const orderItems = document.querySelectorAll('.order-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked filter button
            this.classList.add('active');
            
            // Show/hide order items based on filter
            if (filter === 'all') {
                orderItems.forEach(item => item.style.display = 'flex');
            } else {
                orderItems.forEach(item => {
                    const statusElement = item.querySelector('.order-status');
                    if (statusElement.classList.contains(filter)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
}

// Function to handle tracking modal
function setupTrackingModal() {
    const trackButtons = document.querySelectorAll('[data-order-id]');
    const modal = document.getElementById('tracking-modal');
    const closeModal = document.querySelector('.close-modal');
    const trackingOrderId = document.querySelector('.tracking-order-id');
    
    trackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            trackingOrderId.textContent = `Order #${orderId}`;
            
            // Update tracking timeline based on order status
            updateTrackingTimeline(orderId);
            
            // Display modal
            modal.style.display = 'block';
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Function to update tracking timeline based on order status
function updateTrackingTimeline(orderId) {
    // For demo purposes, we'll just use the provided timeline
    // In a real application, this would fetch the actual tracking data from the server
}

// Function to handle view all link
function setupViewAllLink() {
    const viewAllLink = document.querySelector('.view-all');
    
    if (viewAllLink) {
        viewAllLink.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Click the corresponding menu item
            document.querySelector(`.account-menu li[data-tab="${tabId}"]`).click();
        });
    }
}

// Function to handle form submissions
document.addEventListener('submit', function(e) {
    // Prevent actual form submission in this demo
    e.preventDefault();
    
    // Show a success message
    alert('Changes saved successfully!');
});

// Add event listeners to the "Add New" cards
document.addEventListener('DOMContentLoaded', function() {
    // Add new address
    const addAddressCard = document.querySelector('.address-card.add-new');
    if (addAddressCard) {
        addAddressCard.addEventListener('click', function() {
            alert('This feature will be available in the complete application.');
        });
    }
    
    // Add new payment method
    const addPaymentCard = document.querySelector('.payment-card.add-new');
    if (addPaymentCard) {
        addPaymentCard.addEventListener('click', function() {
            alert('This feature will be available in the complete application.');
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            alert('This feature will be available in the complete application.');
        });
    }
});

// Add event listeners to all address action buttons
const addressActionButtons = document.querySelectorAll('.address-actions button');
addressActionButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert('This feature will be available in the complete application.');
    });
});

// Add event listeners to all payment action buttons
const paymentActionButtons = document.querySelectorAll('.payment-actions button');
paymentActionButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert('This feature will be available in the complete application.');
    });
});