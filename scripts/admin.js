document.getElementById("product-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    const response = await fetch("/upload-product", {
      method: "POST",
      body: formData,
    });
  
    const result = await response.text();
    document.getElementById("status").innerText = result;
  });
  