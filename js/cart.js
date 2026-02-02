const cartContainer = document.getElementById("cartContainer");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    calculateTotal();
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-card";

    div.innerHTML = `
      <img src="${item.image}" class="cart-img">

      <div class="cart-info">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  calculateTotal(); 
}


function calculateTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  let discount = total >= 3000 ? total * 0.1 : 0; // 10% discount above 3000
  let finalPrice = total - discount;

  document.getElementById("total").innerText = total;
  document.getElementById("discount").innerText = discount.toFixed(0);
  document.getElementById("finalPrice").innerText = finalPrice.toFixed(0);
}


function changeQty(i, val) {
  cart[i].quantity += val;
  if (cart[i].quantity < 1) cart[i].quantity = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();
