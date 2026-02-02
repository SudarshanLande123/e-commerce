const container = document.getElementById("productContainer");

function displayProducts(list) {
  container.innerHTML = "";

  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">

      <h3>${product.name}</h3>
      <p class="price"><i class="fa-solid fa-indian-rupee-sign"></i> ${product.price}</p>
      <p class="category">${product.category}</p>

      <button onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    container.appendChild(div);
  });
}

displayProducts(products);


// ADD TO CART
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find(p => p.id === id);

  let found = cart.find(item => item.id === id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart");
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").innerText = count;
}

updateCartCount();

// SEARCH
function searchProducts() {
  let value = document.getElementById("search").value.toLowerCase();
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  displayProducts(filtered);
}

// FILTER
function filterCategory() {
  let value = document.getElementById("categoryFilter").value;

  if (value === "all") {
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === value));
  }
}



