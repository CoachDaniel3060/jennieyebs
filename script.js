
const WHATSAPP_NUMBER = "233558224251";

const products = [
  {
    id: 1,
    name: "Elegant Women's Dress",
    category: "clothing",
    price: 350,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
    description: "A stylish dress for special occasions and everyday elegance."
  },
  {
    id: 2,
    name: "Classic Fashion Outfit",
    category: "clothing",
    price: 280,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    description: "A fashionable outfit for a confident and beautiful look."
  },
  {
    id: 3,
    name: "Ladies Casual Wear",
    category: "clothing",
    price: 250,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",
    description: "Comfortable casual fashion for your everyday wardrobe."
  },
  {
    id: 4,
    name: "Elegant Evening Dress",
    category: "clothing",
    price: 420,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85",
    description: "An elegant look for parties and special occasions."
  },
  {
    id: 5,
    name: "Stylish Ladies Heels",
    category: "footwear",
    price: 320,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
    description: "Stylish footwear to complete your outfit."
  },
  {
    id: 6,
    name: "Classic Sneakers",
    category: "footwear",
    price: 290,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    description: "A versatile pair for casual everyday styling."
  },
  {
    id: 7,
    name: "Elegant Ladies Handbag",
    category: "accessories",
    price: 260,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    description: "A beautiful handbag to complement your look."
  },
  {
    id: 8,
    name: "Fashion Sunglasses",
    category: "accessories",
    price: 120,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
    description: "A stylish accessory for a finishing touch."
  },
  {
    id: 9,
    name: "Ladies Fashion Bag",
    category: "accessories",
    price: 300,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85",
    description: "A versatile fashion bag for different occasions."
  },
  {
    id: 10,
    name: "Beautiful Casual Dress",
    category: "clothing",
    price: 310,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=700&q=85",
    description: "A beautiful addition to your fashion collection."
  },
  {
    id: 11,
    name: "Modern Fashion Shoes",
    category: "footwear",
    price: 350,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    description: "Modern footwear designed to complement your style."
  },
  {
    id: 12,
    name: "Chic Fashion Accessory",
    category: "accessories",
    price: 150,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85",
    description: "A finishing touch for your favourite outfit."
  }
];

let activeCategory = "all";
let searchTerm = "";
let cart = [];

try {
  const savedCart = JSON.parse(localStorage.getItem("jennieyebs-cart") || "[]");
  if (Array.isArray(savedCart)) cart = savedCart;
} catch (error) {
  cart = [];
}

const productGrid = document.getElementById("productGrid");
const emptyProducts = document.getElementById("emptyProducts");
const filterButtons = document.getElementById("filterButtons");
const productSearch = document.getElementById("productSearch");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const continueShopping = document.getElementById("continueShopping");

const productModal = document.getElementById("productModal");
const productModalContent = document.getElementById("productModalContent");
const closeProductModal = document.getElementById("closeProductModal");

const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutTotal = document.getElementById("checkoutTotal");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function formatPrice(amount) {
  return `GH₵ ${Number(amount).toFixed(2)}`;
}

function saveCart() {
  try {
    localStorage.setItem("jennieyebs-cart", JSON.stringify(cart));
  } catch (error) {
    console.warn("Your shopping bag could not be saved.", error);
  }
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function renderProducts() {
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    emptyProducts.style.display = "block";
    return;
  }

  emptyProducts.style.display = "none";

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/700x900/f1eee8/333333?text=JENNIEYEBS';"
        >
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-price">${formatPrice(product.price)}</div>

        <div class="product-actions">
          <button type="button" data-add="${product.id}">ADD TO BAG</button>
          <button type="button" data-view="${product.id}">VIEW</button>
        </div>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

function setCategory(category) {
  activeCategory = category;

  document.querySelectorAll("#filterButtons button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === category
    );
  });

  renderProducts();
}

function addToCart(id) {
  const product = getProduct(id);
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
  openCart();
}

function changeQuantity(id, change) {
  const item = cart.find(entry => entry.id === Number(id));
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== Number(id));
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  renderCart();
}

function calculateTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function renderCart() {
  const validCart = cart.filter(item => getProduct(item.id));
  cart = validCart;

  const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(calculateTotal());

  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(calculateTotal());
  }

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <p>Your shopping bag is empty.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = getProduct(item.id);

    return `
      <div class="cart-item">
        <img
          src="${product.image}"
          alt="${product.name}"
          onerror="this.onerror=null;this.src='https://placehold.co/200x250/f1eee8/333333?text=JENNIEYEBS';"
        >

        <div>
          <h4>${product.name}</h4>
          <p>${formatPrice(product.price)}</p>

          <div class="cart-item-controls">
            <button type="button" data-minus="${product.id}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-plus="${product.id}">+</button>
            <button type="button" data-remove="${product.id}">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function showProduct(id) {
  const product = getProduct(id);
  if (!product) return;

  productModalContent.innerHTML = `
    <div class="modal-product-layout">
      <img
        src="${product.image}"
        alt="${product.name}"
        onerror="this.onerror=null;this.src='https://placehold.co/700x900/f1eee8/333333?text=JENNIEYEBS';"
      >

      <div>
        <span class="product-category">${product.category}</span>
        <h2>${product.name}</h2>
        <div class="modal-price">${formatPrice(product.price)}</div>
        <p>${product.description}</p>

        <button class="btn btn-primary" type="button"
          data-modal-add="${product.id}">
          ADD TO BAG
        </button>
      </div>
    </div>
  `;

  productModal.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeProduct() {
  productModal.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function openCheckout() {
  if (cart.length === 0) {
    alert("Your shopping bag is empty. Add a product first.");
    return;
  }

  closeCart();
  checkoutTotal.textContent = formatPrice(calculateTotal());
  checkoutModal.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

function sendOrderToWhatsApp(event) {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your shopping bag is empty.");
    closeCheckoutModal();
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const customerPhone = document.getElementById("customerPhone").value.trim();
  const customerAddress = document.getElementById("customerAddress").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (!customerName || !customerPhone || !customerAddress || !paymentMethod) {
    alert("Please complete all the checkout fields.");
    return;
  }

  const orderLines = cart.map(item => {
    const product = getProduct(item.id);
    return `${product.name} x ${item.quantity} — ${formatPrice(product.price * item.quantity)}`;
  });

  const message = [
    "Hello JENNIEYEBS! I would like to place an order.",
    "",
    "CUSTOMER DETAILS",
    `Name: ${customerName}`,
    `Phone: ${customerPhone}`,
    `Delivery address: ${customerAddress}`,
    `Preferred payment: ${paymentMethod}`,
    "",
    "ORDER DETAILS",
    ...orderLines,
    "",
    `ORDER TOTAL: ${formatPrice(calculateTotal())}`,
    "",
    "Please confirm availability, delivery charges and payment instructions. Thank you."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

function closeNavigation() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

filterButtons.addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;

  setCategory(button.dataset.category);
});

productSearch.addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderProducts();
});

productGrid.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const viewButton = event.target.closest("[data-view]");

  if (addButton) addToCart(addButton.dataset.add);
  if (viewButton) showProduct(viewButton.dataset.view);
});

cartItems.addEventListener("click", event => {
  const minus = event.target.closest("[data-minus]");
  const plus = event.target.closest("[data-plus]");
  const remove = event.target.closest("[data-remove]");

  if (minus) changeQuantity(minus.dataset.minus, -1);
  if (plus) changeQuantity(plus.dataset.plus, 1);
  if (remove) removeFromCart(remove.dataset.remove);
});

productModalContent.addEventListener("click", event => {
  const button = event.target.closest("[data-modal-add]");
  if (!button) return;

  const id = button.dataset.modalAdd;
  closeProduct();
  addToCart(id);
});

document.querySelectorAll("[data-collection]").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.collection;
    setCategory(category);
    document.getElementById("shop").scrollIntoView({
      behavior: "smooth"
    });
  });
});

openCartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
continueShopping.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", openCheckout);
closeProductModal.addEventListener("click", closeProduct);
closeCheckout.addEventListener("click", closeCheckoutModal);

productModal.addEventListener("click", event => {
  if (event.target === productModal) closeProduct();
});

checkoutModal.addEventListener("click", event => {
  if (event.target === checkoutModal) closeCheckoutModal();
});

checkoutForm.addEventListener("submit", sendOrderToWhatsApp);

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeProduct();
    closeCheckoutModal();
    closeNavigation();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
