document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const container = document.getElementById("cart-container");
    const totalDiv = document.getElementById("cart-total");
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    container.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += parseFloat(item.price);
      const div = document.createElement("div");
      div.classList.add("product");
  
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>$${parseFloat(item.price).toFixed(2)}</strong></p>
        <img src="/uploads/${item.image}" style="max-width:150px;" />
        <br />
        <button onclick="removeItem(${index})">Remove</button>
        <hr>
      `;
      container.appendChild(div);
    });
  
    totalDiv.innerText = `Total: $${total.toFixed(2)}`;
  });
  
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
  
  function checkout() {
    window.location.href = "/"; // redirect to homepage where payment options are shown
  }
  