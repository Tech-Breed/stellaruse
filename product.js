document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Product Page Loaded");

    const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

    if (!productData) {
        console.error("❌ No product data found! Redirecting to home.");
        window.location.href = "index.html";
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

    sizeOptions.forEach((size) => {
        size.addEventListener("click", function () {
            // ✅ Remove active class from all sizes
            sizeOptions.forEach((s) => s.classList.remove("active"));

            // ✅ Add active class to clicked size
            this.classList.add("active");

            // ✅ Store selected size in sessionStorage
            sessionStorage.setItem("selectedSize", this.textContent);

            console.log(`✔ Selected Size: ${this.textContent}`);
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

    // ✅ Continue Shopping Button
    document.querySelector(".continue-shopping").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

