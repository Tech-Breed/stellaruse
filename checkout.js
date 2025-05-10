document.addEventListener("DOMContentLoaded", function () {
    let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    let orderListElement = document.getElementById("order-list");
    let shippingSelect = document.getElementById("shipping-options");
    let shippingPriceElement = document.getElementById("shipping-price");
    let totalPriceElement = document.getElementById("total-price");

    let billingNameElement = document.getElementById("billing-name");
    let billingEmailElement = document.getElementById("billing-email");
    let billingAddressElement = document.getElementById("billing-address");
    let billingPhoneElement = document.getElementById("billing-phone");

    let nameInput = document.getElementById("name");
    let emailInput = document.getElementById("email");
    let addressInput = document.getElementById("address");
    let phoneInput = document.getElementById("phone");

    let shippingOptions = {
        "0": 0,       // Standard
        "1500": 1500, // Express
        "3000": 3000  // Premium
    };

    function updateCartSummary() {
        orderListElement.innerHTML = "";

        if (!cartItems || cartItems.length === 0) {
            orderListElement.innerHTML = "<p>Your cart is empty.</p>";
            shippingPriceElement.textContent = "0";
            totalPriceElement.textContent = "0";
            return;
        }

        let subtotal = 0;

        cartItems.forEach((item, index) => {
            let listItem = document.createElement("li");
            listItem.className = "collection-item avatar";
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="circle">
                <span class="title"><b>${item.name}</b></span>
                <p>Size: <b>${item.size || "N/A"}</b></p>
                <p>₦${(item.price * item.quantity).toFixed(2)} (Qty: <span class="quantity">${item.quantity}</span>)</p>
                
                <div class="quantity-controls">
                    <button class="btn-small decrease-btn" data-index="${index}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                    <button class="btn-small increase-btn" data-index="${index}">+</button>
                </div>

                <a href="#" class="secondary-content remove-item red-text" data-index="${index}">
                    <i class="material-icons">remove_circle</i>
                </a>
            `;

            orderListElement.appendChild(listItem);
            subtotal += item.price * item.quantity;
        });

        let shippingPrice = shippingOptions[shippingSelect.value] || 0;
        let total = subtotal + shippingPrice;

        shippingPriceElement.textContent = shippingPrice.toFixed(2);
        totalPriceElement.textContent = total.toFixed(2);
    }

    function updateBillingSummary() {
        billingNameElement.textContent = nameInput.value.trim() || "N/A";
        billingEmailElement.textContent = emailInput.value.trim() || "N/A";
        billingAddressElement.textContent = addressInput.value.trim() || "N/A";
        billingPhoneElement.textContent = phoneInput.value.trim() || "N/A";
    }

    shippingSelect.addEventListener("change", updateCartSummary);

    // Handle remove, quantity update, and input changes
    orderListElement.addEventListener("click", function (e) {
        let target = e.target;

        // Ensure the button clicked has a dataset index
        let index = target.closest("[data-index]")?.dataset.index;
        if (index === undefined) return; // Prevent errors

        index = parseInt(index); // Ensure index is a number

        if (target.classList.contains("remove-item") || target.closest(".remove-item")) {
            cartItems.splice(index, 1);
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartSummary();
        } else if (target.classList.contains("increase-btn")) {
            cartItems[index].quantity++;
        } else if (target.classList.contains("decrease-btn")) {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
            } else {
                cartItems.splice(index, 1);
            }
        }

        sessionStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartSummary();
    });

    // Handle direct input for quantity field
    orderListElement.addEventListener("input", function (e) {
        if (e.target.classList.contains("quantity-input")) {
            let index = parseInt(e.target.dataset.index);
            let newQuantity = parseInt(e.target.value);

            if (!isNaN(newQuantity) && newQuantity > 0) {
                cartItems[index].quantity = newQuantity;
            } else {
                cartItems[index].quantity = 1;
            }

            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            updateCartSummary();
        }
    });

    document.getElementById("checkout-form").addEventListener("submit", function (e) {
        e.preventDefault();

        if (!nameInput.value || !emailInput.value || !addressInput.value || !phoneInput.value) {
            alert("Please fill in all fields.");
            return;
        }

        alert(`Order placed successfully!\nTotal: ₦${totalPriceElement.textContent}`);
        sessionStorage.removeItem("cart");
        window.location.href = "payment.html";
    });

    nameInput.addEventListener("input", updateBillingSummary);
    emailInput.addEventListener("input", updateBillingSummary);
    addressInput.addEventListener("input", updateBillingSummary);
    phoneInput.addEventListener("input", updateBillingSummary);

    updateCartSummary();
    updateBillingSummary();
});




