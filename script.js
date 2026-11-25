
/* =========================================
   JENNIEYEBS — STORE WEBSITE
   ========================================= */

const WHATSAPP_NUMBER = "233558224251";
const CART_STORAGE_KEY = "jennieyebs-cart";
const REVIEWS_STORAGE_KEY = "jennieyebs-reviews";

/* SAMPLE PRODUCTS
   Replace names, prices and photos with your
   actual products before launching the store.
*/

const products = [
  {
    id: 1,
    name: "Classic Tailored Dress",
    category: "women",
    type: "clothing",
    price: 450,
    description: "A beautifully tailored dress designed for an elegant, timeless look.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=900"
  },
  {
    id: 2,
    name: "Everyday Luxury Shirt",
    category: "men",
    type: "clothing",
    price: 280,
    description: "A refined shirt made for effortless everyday style.",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900"
  },
  {
    id: 3,
    name: "Elegant Two-Piece Set",
    category: "women",
    type: "clothing",
    price: 520,
    description: "A coordinated outfit for a confident and polished appearance.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900"
  },
  {
    id: 4,
    name: "Modern Casual Sneakers",
    category: "unisex",
    type: "footwear",
    price: 390,
    description: "Comfortable sneakers with a clean, modern finish.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900"
  },
  {
    id: 5,
    name: "Statement Handbag",
    category: "women",
    type: "accessories",
    price: 350,
    description: "A versatile handbag that completes your outfit.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900"
  },
  {
    id: 6,
    name: "Men's Smart Trousers",
    category: "men",
    type: "clothing",
    price: 320,
    description: "Smart, comfortable trousers for work and special occasions.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900"
  },
  {
    id: 7,
    name: "Women's Classic Heels",
    category: "women",
    type: "footwear",
    price: 420,
    description: "Elegant heels for occasions that call for something special.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900"
  },
  {
    id: 8,
    name: "Premium Men's Jacket",
    category: "men",
    type: "clothing",
    price: 580,
    description: "A versatile jacket with a clean, sophisticated silhouette.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900"
  },
  {
    id: 9,
    name: "Minimalist Wristwatch",
    category: "unisex",
    type: "accessories",
    price: 260,
    description: "A simple accessory that adds a refined finishing touch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
  },
  {
    id: 10,
    name: "Elegant Evening Outfit",
    category: "women",
    type: "clothing",
    price: 650,
    description: "An elegant look for celebrations and memorable occasions.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=900"
  },
  {
    id: 11,
    name: "Classic Leather Shoes",
    category: "men",
    type: "footwear",
    price: 480,
    description: "Classic footwear designed to complement smart outfits.",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=900"
  },
  {
    id: 12,
    name: "Everyday Style Sunglasses",
    category: "unisex",
    type: "accessories",
    price: 180,
    description: "A stylish finishing touch for everyday looks.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900"
  }
];

/* =========================================
   ELEMENTS
   ========================================= */

const productGrid = document.getElementById("productGrid");
const productSearch = document.getElementById("productSearch");
const emptyProducts = document.getElementById("emptyProducts");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartButton = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShopping = document.getElementById("continueShopping");

const productModal = document.getElementById("productModal");
const closeProductModal = document.getElementById("closeProductModal");
const productModalContent = document.getElementById("productModalContent");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutTotal = document.getElementById("checkoutTotal");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

let selectedFilter = "all";
let cart = loadCart();

/* =========================================
   HELPERS
   ========================================= */

function formatPrice(amount) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2
  }).format(amount);
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

/* =========================================
   PRODUCT DISPLAY
   ========================================= */

function renderProducts() {
  if (!productGrid) return;

  const searchTerm = productSearch
    ? productSearch.value.trim().toLowerCase()
    : "";

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.type.toLowerCase().includes(searchTerm);

    const filter = selectedFilter.toLowerCase();

    const matchesFilter =
      filter === "all" ||
      product.category === filter ||
      product.type === filter ||
      (filter === "accessories" && product.type === "accessories") ||
      (filter === "footwear" && product.type === "footwear");

    return matchesSearch && matchesFilter;
  });

  productGrid.innerHTML = filteredProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x750/f4f0e9/333333?text=JENNIEYEBS';"
        >
        <button
          class="quick-view-button"
          type="button"
          data-view="${product.id}"
          aria-label="View ${escapeHTML(product.name)}"
        >Quick view</button>
      </div>

      <div class="product-info">
        <span class="product-category">${escapeHTML(product.type)}</span>
        <h3>${escapeHTML(product.name)}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>

        <div class="product-actions">
          <button
            class="add-to-cart"
            type="button"
            data-add="${product.id}"
          >Add to bag</button>
        </div>
      </div>
    </article>
  `).join("");

  if (emptyProducts) {
    emptyProducts.hidden = filteredProducts.length > 0;
  }
}

/* Filter buttons */
document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter || "all";

    document.querySelectorAll("[data-filter]").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderProducts();
  });
});

/* Collection cards */
document.querySelectorAll("[data-collection]").forEach(card => {
  card.addEventListener("click", () => {
    selectedFilter = card.dataset.collection || "all";

    document.querySelectorAll("[data-filter]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.filter === selectedFilter
      );
    });

    renderProducts();

    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Search */
productSearch?.addEventListener("input", renderProducts);

/* =========================================
   SHOPPING CART
   ========================================= */

function addToCart(productId) {
  const product = products.find(item => item.id === Number(productId));
  if (!product) return;

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} added to your bag.`);
}

function changeQuantity(productId, amount) {
  const item = cart.find(entry => entry.id === Number(productId));
  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== Number(productId));
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== Number(productId));
  saveCart();
  renderCart();
}

function renderCart() {
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  if (cartCount) cartCount.textContent = totalQuantity;
  if (cartTotal) cartTotal.textContent = formatPrice(totalPrice);
  if (checkoutTotal) checkoutTotal.textContent = formatPrice(totalPrice);

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <p>Your shopping bag is empty.</p>
        <p>Discover something you love.</p>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => {
      const product = products.find(entry => entry.id === item.id);
      if (!product) return "";

      return `
        <div class="cart-item">
          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            onerror="this.onerror=null;this.src='https://placehold.co/120x140/f4f0e9/333333?text=JY';"
          >

          <div class="cart-item-info">
            <h4>${escapeHTML(product.name)}</h4>
            <p>${formatPrice(product.price)}</p>

            <div class="cart-quantity">
              <button type="button" data-decrease="${product.id}" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-increase="${product.id}" aria-label="Increase quantity">+</button>
            </div>

            <button
              class="remove-item"
              type="button"
              data-remove="${product.id}"
            >Remove</button>
          </div>
        </div>
      `;
    }).join("");
  }

  if (checkoutButton) {
    checkoutButton.disabled = cart.length === 0;
  }
}

function openCart() {
  cartDrawer?.classList.add("open");
  cartOverlay?.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCartDrawer() {
  cartDrawer?.classList.remove("open");
  cartOverlay?.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

cartButton?.addEventListener("click", openCart);
closeCartButton?.addEventListener("click", closeCartDrawer);
cartOverlay?.addEventListener("click", closeCartDrawer);
continueShopping?.addEventListener("click", closeCartDrawer);

/* Product and cart button actions */
document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const viewButton = event.target.closest("[data-view]");
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");
  const removeButton = event.target.closest("[data-remove]");

  if (addButton) addToCart(addButton.dataset.add);
  if (viewButton) openProductModal(viewButton.dataset.view);
  if (increaseButton) changeQuantity(increaseButton.dataset.increase, 1);
  if (decreaseButton) changeQuantity(decreaseButton.dataset.decrease, -1);
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

/* =========================================
   PRODUCT QUICK VIEW
   ========================================= */

function openProductModal(productId) {
  const product = products.find(item => item.id === Number(productId));
  if (!product || !productModal || !productModalContent) return;

  productModalContent.innerHTML = `
    <div class="modal-product-layout">
      <img
        src="${product.image}"
        alt="${escapeHTML(product.name)}"
        onerror="this.onerror=null;this.src='https://placehold.co/600x750/f4f0e9/333333?text=JENNIEYEBS';"
      >

      <div class="modal-product-details">
        <span class="product-category">${escapeHTML(product.type)}</span>
        <h2>${escapeHTML(product.name)}</h2>
        <p class="modal-price">${formatPrice(product.price)}</p>
        <p>${escapeHTML(product.description)}</p>

        <button
          class="add-to-cart"
          type="button"
          data-add="${product.id}"
        >Add to bag</button>
      </div>
    </div>
  `;

  productModal.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeProduct() {
  productModal?.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

closeProductModal?.addEventListener("click", closeProduct);

productModal?.addEventListener("click", event => {
  if (event.target === productModal) closeProduct();
});

/* =========================================
   CHECKOUT — WHATSAPP ORDER
   ========================================= */

function openCheckout() {
  if (cart.length === 0) {
    showToast("Your shopping bag is empty.");
    return;
  }

  closeCartDrawer();
  checkoutModal?.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCheckoutModal() {
  checkoutModal?.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

checkoutButton?.addEventListener("click", openCheckout);
closeCheckout?.addEventListener("click", closeCheckoutModal);

checkoutModal?.addEventListener("click", event => {
  if (event.target === checkoutModal) closeCheckoutModal();
});

checkoutForm?.addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) {
    showToast("Your shopping bag is empty.");
    return;
  }

  if (!checkoutForm.reportValidity()) return;

  const customerName = document.getElementById("customerName")?.value.trim() || "";
  const customerPhone = document.getElementById("customerPhone")?.value.trim() || "";
  const customerAddress = document.getElementById("customerAddress")?.value.trim() || "";
  const paymentMethod = document.getElementById("paymentMethod")?.value || "To be confirmed";

  const total = cart.reduce((sum, item) => {
    const product = products.find(entry => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const orderLines = cart.map(item => {
    const product = products.find(entry => entry.id === item.id);
    if (!product) return "";

    return `• ${product.name} x ${item.quantity} — ${formatPrice(product.price * item.quantity)}`;
  }).filter(Boolean);

  const message = [
    "Hello JENNIEYEBS!",
    "",
    "I would like to place an order:",
    "",
    ...orderLines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "CUSTOMER DETAILS",
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Delivery address: ${customerAddress}`,
    `Preferred payment method: ${paymentMethod}`,
    "",
    "Please confirm my order and the next steps. Thank you."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");

  cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();
  closeCheckoutModal();

  showToast("Your order message is ready in WhatsApp.");
});

/* =========================================
   MOBILE NAVIGATION
   ========================================= */

function closeMobileMenu() {
  mainNav?.classList.remove("open");
  menuToggle?.classList.remove("active");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("open");
  menuToggle.classList.toggle("active", Boolean(isOpen));
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

/* =========================================
   GHANA DATE AND TIME
   ========================================= */

function updateGhanaClock() {
  const clock = document.getElementById("ghanaClock");
  if (!clock) return;

  const now = new Date();

  clock.textContent = new Intl.DateTimeFormat("en-GH", {
    timeZone: "Africa/Accra",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(now);
}

updateGhanaClock();
setInterval(updateGhanaClock, 1000);

/* =========================================
   ROTATING ANNOUNCEMENTS
   ========================================= */

const announcements = [
  "Welcome to JENNIEYEBS — Style with confidence.",
  "Discover timeless fashion and everyday elegance.",
  "Need a custom outfit? Get in touch with our team.",
  "Your style. Your confidence. Your JENNIEYEBS experience.",
  "Shop your favourites and order easily through WhatsApp."
];

let announcementIndex = 0;

function rotateAnnouncement() {
  const announcementText = document.getElementById("announcementText");
  if (!announcementText) return;

  announcementText.style.opacity = "0";

  setTimeout(() => {
    announcementIndex = (announcementIndex + 1) % announcements.length;
    announcementText.textContent = announcements[announcementIndex];
    announcementText.style.opacity = "1";
  }, 250);
}

setInterval(rotateAnnouncement, 10000);

/* =========================================
   CUSTOMER REVIEWS
   Reviews are saved in this browser only.
   A shared public review system needs a database.
   ========================================= */

function loadReviews() {
  try {
    const reviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY));
    return Array.isArray(reviews) ? reviews : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  const reviewsList = document.getElementById("reviewsList");
  if (!reviewsList) return;

  const reviews = loadReviews();

  if (reviews.length === 0) {
    reviewsList.innerHTML = `
      <p class="no-reviews">Be the first to share your JENNIEYEBS experience.</p>
    `;
    return;
  }

  reviewsList.innerHTML = reviews.map(review => `
    <article class="review-card">
      <div class="review-stars" aria-label="${review.rating} out of 5 stars">
        ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}
      </div>
      <p>${escapeHTML(review.message)}</p>
      <strong>${escapeHTML(review.name)}</strong>
      <small>${escapeHTML(review.date)}</small>
    </article>
  `).join("");
}

const reviewForm = document.getElementById("reviewForm");

reviewForm?.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("reviewName")?.value.trim() || "";
  const rating = Number(document.getElementById("reviewRating")?.value || 5);
  const message = document.getElementById("reviewMessage")?.value.trim() || "";

  if (!name || !message || rating < 1 || rating > 5) {
    showToast("Please complete all review fields.");
    return;
  }

  const reviews = loadReviews();

  reviews.unshift({
    name,
    rating,
    message,
    date: new Intl.DateTimeFormat("en-GH", {
      timeZone: "Africa/Accra",
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(new Date())
  });

  saveReviews(reviews.slice(0, 30));
  reviewForm.reset();
  renderReviews();
  showToast("Thank you for sharing your review!");
});

/* =========================================
   FOOTER YEAR
   ========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   TOAST NOTIFICATIONS
   ========================================= */

function showToast(message) {
  let toast = document.getElementById("siteToast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "siteToast";
    toast.className = "site-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timeout);

  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* =========================================
   KEYBOARD ACCESSIBILITY
   ========================================= */

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  closeCartDrawer();
  closeProduct();
  closeCheckoutModal();
  closeMobileMenu();
});

/* =========================================
   START WEBSITE
   ========================================= */

renderProducts();
renderCart();
renderReviews();

console.log("JENNIEYEBS website loaded successfully.");
