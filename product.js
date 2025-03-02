document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Product Page Loaded");

    const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

    if (!productData) {
        console.error("❌ No product data found!");

        // ✅ Fix: Redirect only if NOT already on index.html
        if (!window.location.pathname.includes("index.html")) {
            window.location.href = "index.html";
        }

        return;
    }

    console.log("📢 Loaded Product:", productData);

    // ✅ Update main product details dynamically
    const mainImage = document.getElementById("main-product-image");
    mainImage.src = productData.image;
    document.getElementById("product-category").textContent = productData.category;
    document.getElementById("product-name").textContent = productData.name;
    document.getElementById("current-price").textContent = `$${productData.price.toFixed(2)}`;
    document.getElementById("discount-badge").textContent = `-${productData.discount}%`;

    // ✅ Calculate Original Price
    const originalPrice = (productData.price / (1 - productData.discount / 100)).toFixed(2);
    document.getElementById("original-price").textContent = `$${originalPrice}`;

    console.log("✅ Product Details Updated Successfully");

    // ✅ Load Thumbnails
    const thumbnailContainer = document.querySelector(".thumbnail-container");
    thumbnailContainer.innerHTML = "";

    if (productData.imageGallery && productData.imageGallery.length > 0) {
        productData.imageGallery.forEach((imgSrc) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = imgSrc;
            thumbnail.classList.add("thumbnail");

            // ✅ On Click - Update Main Image
            thumbnail.addEventListener("click", function () {
                mainImage.src = imgSrc;
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    } else {
        console.warn("⚠️ No thumbnails found.");
    }

    // ✅ Quantity Update (Carry forward quantity from previous page)
    let quantity = productData.quantity || 1; // Default to 1 if no quantity stored
    const quantityDisplay = document.querySelector(".number");
    const increaseBtn = document.querySelector(".increase");
    const decreaseBtn = document.querySelector(".decrease");
    const currentPrice = document.getElementById("current-price");

    quantityDisplay.textContent = quantity;
    currentPrice.textContent = `$${(productData.price * quantity).toFixed(2)}`;

    increaseBtn.addEventListener("click", () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        currentPrice.textContent = `$${(productData.price * quantity).toFixed(2)}`;
    });

    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            currentPrice.textContent = `$${(productData.price * quantity).toFixed(2)}`;
        }
    });

    // ✅ Size Selection Logic
    const sizeOptions = document.querySelectorAll(".size-option");
    let selectedSize = "";

    sizeOptions.forEach((size) => {
        size.addEventListener("click", function () {
            // ✅ Remove active class from all sizes
            sizeOptions.forEach((s) => s.classList.remove("active"));

            // ✅ Add active class to clicked size
            this.classList.add("active");

            // ✅ Store selected size in sessionStorage
            selectedSize = this.textContent;
            sessionStorage.setItem("selectedSize", selectedSize);

            console.log(`✔ Selected Size: ${selectedSize}`);
        });
    });

    // ✅ Retrieve stored size selection (if available)
    const storedSize = sessionStorage.getItem("selectedSize");
    if (storedSize) {
        sizeOptions.forEach((size) => {
            if (size.textContent === storedSize) {
                size.classList.add("active");
            }
        });
    }

    // ✅ Add to Cart Functionality (Updated)
    document.querySelector(".add-to-cart").addEventListener("click", function () {
        const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

        // ✅ Get the product details again
        const currentProductData = JSON.parse(sessionStorage.getItem("selectedProduct"));

        const cartItem = {
            id: currentProductData.id, // ✅ Ensure unique identification
            name: currentProductData.name,
            category: currentProductData.category,
            image: currentProductData.image, // ✅ Only main image
            price: currentProductData.price,
            quantity: quantity, // ✅ User-selected quantity
            size: selectedSize || "M", // ✅ Default to "M" if no size selected
            description: currentProductData.description || "Luxury crafted sneakers for daily wear.",
        };

        // ✅ Check if an item with the same ID **AND** size already exists
        const existingItemIndex = cartItems.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);

        if (existingItemIndex !== -1) {
            // ✅ If product with the same size already exists, update quantity
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // ✅ If it's a new product (or same product with different size), add it as new
            cartItems.push(cartItem);
        }

        // ✅ Update sessionStorage
        sessionStorage.setItem("cart", JSON.stringify(cartItems));

        // ✅ Update Cart Count Immediately
        updateCartCount();

        console.log("🛒 Product added to cart:", cartItem);
        showPopup("✅ Added to cart successfully!");
    });

    // ✅ Function to Show Custom Popup
    function showPopup(message) {
        const popup = document.getElementById("custom-popup");
        const popupMessage = document.getElementById("popup-message");
        const popupOk = document.getElementById("popup-ok");

        popupMessage.textContent = message;
        popup.classList.add("show");

        popupOk.addEventListener("click", function () {
            popup.classList.remove("show");
        });
    }

    // ✅ Function to Update Cart Count
    function updateCartCount() {
        const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById("cart-count");

        cartCount.textContent = totalItems;

        // ✅ Add animation when cart count updates
        cartCount.classList.add("bump");
        setTimeout(() => cartCount.classList.remove("bump"), 300);
    }

    // ✅ Update Cart Count on Page Load
    updateCartCount();
});
