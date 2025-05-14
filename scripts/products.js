document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("/products");
    const products = await res.json();
  
    const container = document.getElementById("product-list");
  
    products.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("product");
  
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>$${parseFloat(p.price).toFixed(2)}</strong></p>
        <img src="/uploads/${p.image}" alt="${p.name}" style="max-width:150px" />
        <br>
        <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
      `;
  
      container.appendChild(div);
    });
  });
  
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  }
  