function menutoggle() {
    const menuItems = document.getElementById("MenuItems");
    menuItems.classList.toggle("show");
  }
  /* ========== Navigation =========== */
const navList = document.querySelector(".nav-list");

document.querySelector(".hamburger").onclick = () => {
  navList.classList.add("show");
};

document.querySelector(".close").onclick = () => {
  navList.classList.remove("show");
};



const heroCarouselInner = document.querySelector('.hero-carousel-inner');
const heroCarouselItems = document.querySelectorAll('.hero-carousel-item');
const heroPrevBtn = document.querySelector('.hero-arrow.hero-left');
const heroNextBtn = document.querySelector('.hero-arrow.hero-right');
let heroCurrentIndex = 0;

// 🌟 Function to Update Active Slide
function updateHeroCarousel() {
  heroCarouselItems.forEach((item, index) => {
    item.classList.remove('active');
  });

  heroCarouselItems[heroCurrentIndex].classList.add('active');
  heroCarouselInner.style.transform = `translateX(-${heroCurrentIndex * 100}%)`;
}

// Move to Next Slide
function goToHeroNextSlide() {
  heroCurrentIndex = (heroCurrentIndex + 1) % heroCarouselItems.length;
  updateHeroCarousel();
}

// Move to Previous Slide
function goToHeroPrevSlide() {
  heroCurrentIndex = (heroCurrentIndex - 1 + heroCarouselItems.length) % heroCarouselItems.length;
  updateHeroCarousel();
}

// Auto Slide Every 10 Seconds
try {
  setInterval(goToHeroNextSlide, 10000);
} catch (error) {
  console.error("❌ Carousel error:", error);
}


// Event Listeners for Navigation
heroNextBtn.addEventListener('click', goToHeroNextSlide);
heroPrevBtn.addEventListener('click', goToHeroPrevSlide);

// Initial Setup
updateHeroCarousel();





document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".category-wrapper");
  const prevBtn = document.querySelector(".category-carousel-prev");
  const nextBtn = document.querySelector(".category-carousel-next");

  let scrollPosition = 0;

  function getItemWidth() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth >= 1200) {
      return wrapper.clientWidth / 4; // ✅ 4 items per row
    } else if (screenWidth >= 768) {
      return wrapper.clientWidth / 2; // ✅ 2 items per row
    } else {
      return wrapper.clientWidth / 3; // ✅ 3 items per row on small screens
    }
  }

  function updateScrollPosition(direction) {
    const itemWidth = getItemWidth();
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

    if (direction === "next") {
      scrollPosition = Math.min(scrollPosition + itemWidth, maxScroll);
    } else {
      scrollPosition = Math.max(scrollPosition - itemWidth, 0);
    }

    wrapper.style.transform = `translateX(-${scrollPosition}px)`;
  }

  // ✅ Fix: Add event listeners for Next & Prev buttons
  nextBtn.addEventListener("click", () => updateScrollPosition("next"));
  prevBtn.addEventListener("click", () => updateScrollPosition("prev"));

  // ✅ Fix: Adjust dynamically when window resizes
  window.addEventListener("resize", () => {
    scrollPosition = 0; // Reset scroll on resize
    wrapper.style.transform = `translateX(0px)`;
  });
});


"./images/Screenshot 2024-10-30 120456.png"

// ✅ Product Data
const products = {
  tshirts: [
    {
      name: "Basic T-Shirt",
      price: 10,
      image: "./images/shirt2.png",
      subcategory: "Casual",
      imageGallery: [
        "./images/shirt1.png",
        "./images/shirt.png",
        "./images/bag.png"
      ]
    },
    {
      name: "Graphic T-Shirt",
      price: 15,
      image: "./images/female3.png",
      subcategory: "Printed",
      imageGallery: [
        "./images/female-vest-removebg-preview.png",
        "./images/shirt.png",
        "./images/shirt1.png"
      ]
    }
  ],
  jeans: [
    {
      name: "Blue Jeans",
      price: 30,
      image: "./images/skirt3.png",
      subcategory: "Slim Fit",
      imageGallery: [
        "./images/skirt6.png",
        "./images/skirt7.png",
        "./images/jeans-3.png"
      ]
    }
  ],

  caps: [
    {
      name: "Blue Jeans",
      price: 30,
      image: "./images/hat-removebg-preview.png",
      subcategory: "Slim Fit",
      imageGallery: [
        "./images/cap6.png",
        "./images/skirt7.png",
        "./images/jeans-3.png"
      ]
    }
  ],

  bags: [
    {
      name: "Leather Bag",
      price: 45,
      image: "./images/bag.png",
      subcategory: "Shoulder",
      imageGallery: [
        "./images/bag9.png",
        "./images/bag4.png",
        "https://via.placeholder.com/203"
      ]
    }
  ]
};

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script Loaded Successfully");

    const productContainer = document.querySelector("#product1 .pro-container");
    const filterButtons = document.querySelectorAll(".filter-item");

    if (!productContainer) {
        console.error("❌ productContainer not found! Ensure #product1 .pro-container exists in HTML.");
        return;
    }

    console.log("🔍 productContainer found:", productContainer);

    // ✅ Function to create and display a product card
    function addProduct(product, index) {
        const productCard = document.createElement("div");
        productCard.classList.add("pro");

        const imageUrl = product.image || "https://via.placeholder.com/200";

        productCard.innerHTML = `
            <div class="discount-badge">-30%</div>
            <div class="favorite-icon">&#9825;</div>
            <img class="product-image" src="${imageUrl}" alt="${product.name}">
            <div class="des">
                <span>${product.subcategory}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4 class="price">$${product.price.toFixed(2)}</h4>
            </div>
            <div class="cart-actions">
                <div class="quantity">
                    <button class="qty-btn decrease">-</button>
                    <span class="qty-value">1</span>
                    <button class="qty-btn increase">+</button>
                </div>
                <button class="view-details">View Details</button>
            </div>
        `;

        productContainer.appendChild(productCard);
        console.log(`✅ Added product: ${product.name}`);

        // ✅ Quantity Update Logic
        const qtyValue = productCard.querySelector(".qty-value");
        const priceElement = productCard.querySelector(".price");
        const increaseBtn = productCard.querySelector(".increase");
        const decreaseBtn = productCard.querySelector(".decrease");
        const unitPrice = product.price;
        let quantity = 1;

        // ✅ Unique Key for Storing Quantity
        const productKey = `qty-${product.name}-${index}`;

        // ✅ Retrieve stored quantity if available
        const storedQuantity = sessionStorage.getItem(productKey);
        if (storedQuantity) {
            quantity = parseInt(storedQuantity);
            qtyValue.textContent = quantity;
            priceElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
        }

        increaseBtn.addEventListener("click", () => {
            quantity++;
            qtyValue.textContent = quantity;
            priceElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
            sessionStorage.setItem(productKey, quantity); // ✅ Store updated quantity
        });

        decreaseBtn.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                qtyValue.textContent = quantity;
                priceElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
                sessionStorage.setItem(productKey, quantity); // ✅ Store updated quantity
            }
        });

        // ✅ Redirect to Product Page when clicking product image
        productCard.querySelector(".product-image").addEventListener("click", function () {
            console.log(`📢 Redirecting to product page for: ${product.name}`);

            const productData = {
                image: product.image,
                category: product.subcategory,
                name: product.name,
                price: product.price,
                discount: 30,
                imageGallery: product.imageGallery || [],
                quantity: quantity // ✅ Pass quantity to product page
            };

            sessionStorage.setItem("selectedProduct", JSON.stringify(productData));
            window.location.href = "product.html";
        });

        // ✅ Redirect to Product Page when clicking "View Details"
        productCard.querySelector(".view-details").addEventListener("click", function () {
            console.log(`📢 Redirecting to product page for: ${product.name}`);

            const productData = {
                image: product.image,
                category: product.subcategory,
                name: product.name,
                price: product.price,
                discount: 30,
                imageGallery: product.imageGallery || [],
                quantity: quantity // ✅ Pass quantity to product page
            };

            sessionStorage.setItem("selectedProduct", JSON.stringify(productData));
            window.location.href = "product.html";
        });
    }

    // ✅ Function to display products based on category
    function displayProducts(category) {
        productContainer.innerHTML = "";
        console.log(`📢 Displaying products for category: ${category}`);

        let selectedProducts = category === "all"
            ? Object.values(products).flat()
            : products[category] || [];

        if (selectedProducts.length === 0) {
            console.warn("⚠️ No products found for category:", category);
        } else {
            console.log(`✅ Found ${selectedProducts.length} products.`);
        }

        selectedProducts.forEach(addProduct);
    }

    // ✅ Add event listeners to filter buttons
    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            document.querySelector(".filter-item.active")?.classList.remove("active");
            this.classList.add("active");
            displayProducts(this.dataset.category);
        });
    });

    // ✅ Display all products on page load
    displayProducts("all");
});





