document.addEventListener("DOMContentLoaded", function () {
    console.log("🛒 Cart Page Loaded");

    const cartItemsContainer = document.querySelector(".cart-items");
    const totalItemsDisplay = document.getElementById("total-items");
    const totalPriceDisplay = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.querySelector(".checkout-btn");

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; 
        
        // Clear previous cart items
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            updateCartCount();
            totalItemsDisplay.textContent = "0";
            totalPriceDisplay.textContent = "₦0.00";
            return;
        }

        cart.forEach((item, index) => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <p class="item-name">${item.name} (${item.size})</p>
                    <p class="item-price">₦${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        totalItemsDisplay.textContent = totalItems;
        totalPriceDisplay.textContent = `₦${totalPrice.toFixed(2)}`;
        updateCartCount();
    }

    function updateSessionStorage() {
        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        document.querySelectorAll("#cart-count, .cart-count").forEach(el => {
            el.textContent = totalItems;
        });

        if (cartCount) {
            cartCount.classList.add("bump");
            setTimeout(() => cartCount.classList.remove("bump"), 300);
        }
    }

    cartItemsContainer.addEventListener("click", function (e) {
        const index = e.target.dataset.index;

        if (!cart[index]) return;

        if (e.target.classList.contains("increase")) {
            cart[index].quantity++;
        } else if (e.target.classList.contains("decrease")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        } else if (e.target.classList.contains("remove-btn")) {
            cart.splice(index, 1);
        }

        updateSessionStorage();
        updateCartDisplay();
    });

    // Redirect to Checkout with Cart Data
    checkoutBtn.addEventListener("click", function () {
        sessionStorage.setItem("cart", JSON.stringify(cart)); // Ensures cart data is saved
        window.location.href = "checkout.html"; // Redirects to checkout page
    });

    updateCartDisplay();
    updateCartCount();
});

window.updateCartCount = function () {
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll("#cart-count, .cart-count").forEach(el => {
        el.textContent = totalItems;
    });
};
