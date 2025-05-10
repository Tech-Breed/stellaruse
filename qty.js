document.addEventListener("DOMContentLoaded", () => {
    // Select all product cards
    const productCards = document.querySelectorAll(".pro");

    productCards.forEach((card, index) => {
        const qtyValue = card.querySelector(".qty-value");
        const priceElement = card.querySelector(".price");
        const increaseBtn = card.querySelector(".increase");
        const decreaseBtn = card.querySelector(".decrease");
        const productImage = card.querySelector(".product-image"); 
        // Fix image display

        if (!qtyValue || !priceElement || !increaseBtn || !decreaseBtn || !productImage) return;

        //  Set Image Source Correctly
        const imageUrl = card.dataset.image || "https://via.placeholder.com/200";
        productImage.src = imageUrl;

        // Get Base Price
        let basePrice = parseFloat(card.dataset.price) || parseFloat(priceElement.textContent.replace("₦", ""));
        let quantity = 1; // Default quantity

        //  Unique Key for Each Product Instance
        const productKey = `qty-${card.dataset.name}-${index}`;

        //  Retrieve Stored Quantity (if available)
        const storedQuantity = sessionStorage.getItem(productKey);
        if (storedQuantity) {
            quantity = parseInt(storedQuantity);
            qtyValue.textContent = quantity;
            priceElement.textContent = `₦${(basePrice * quantity).toFixed(2)}`;
        }

        //  Increase Quantity
        increaseBtn.addEventListener("click", () => {
            quantity++;
            qtyValue.textContent = quantity;
            priceElement.textContent = `₦${(basePrice * quantity).toFixed(2)}`;
            sessionStorage.setItem(productKey, quantity);
        });

        // Decrease Quantity
        decreaseBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                qtyValue.textContent = quantity;
                priceElement.textContent = `₦${(basePrice * quantity).toFixed(2)}`;
                sessionStorage.setItem(productKey, quantity);
            }
        });
    });
});

// Handle View Details Click
document.addEventListener("DOMContentLoaded", () => {
    console.log(" Shirt Page Loaded");

    const productCards = document.querySelectorAll(".pro");

    productCards.forEach((card, index) => {
        const viewDetailsBtn = card.querySelector(".view-details");

        if (!viewDetailsBtn) return;

        viewDetailsBtn.addEventListener("click", function () {
            console.log(`📢 Redirecting to product page for: ${card.dataset.name}`);

            let thumbnails = [];
            try {
                thumbnails = JSON.parse(card.dataset.thumbnails);
            } catch (error) {
                console.error("❌ Error parsing thumbnails:", error);
            }

            //  Retrieve Quantity Before Sending to Product Page
            const productKey = `qty-${card.dataset.name}-${index}`;
            let quantity = parseInt(sessionStorage.getItem(productKey)) || 1;

            const productData = {
                image: card.dataset.image || "https://via.placeholder.com/200", 
                
                // Ensure image exists
                category: card.dataset.category,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                discount: parseInt(card.querySelector(".discount-badge")?.textContent.replace('%', '').replace('-', '')) || 0,
                imageGallery: thumbnails.length > 0 ? thumbnails : ["https://via.placeholder.com/201"], 
                
                // Ensure thumbnails exist
                quantity: quantity 
                // Pass quantity to product page
            };

            // Store in sessionStorage
            sessionStorage.setItem("selectedProduct", JSON.stringify(productData));

            // Redirect to product page
            window.location.href = "product.html";
        });
    });
});

