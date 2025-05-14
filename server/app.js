const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/upload-product", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file?.filename;

  if (!name || !price || !description || !image) {
    return res.status(400).send("Missing fields");
  }

  const product = { name, price, description, image };
  const productsPath = "./data/products.json";
  let products = [];

  if (fs.existsSync(productsPath)) {
    products = JSON.parse(fs.readFileSync(productsPath));
  }

  products.push(product);
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  res.send("✅ Product added successfully!");
});

app.get("/products", (req, res) => {
  const productsPath = "./data/products.json";
  if (fs.existsSync(productsPath)) {
    const data = fs.readFileSync(productsPath);
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
