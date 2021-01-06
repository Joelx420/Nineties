const express = require("express");
const products = require("./src/products");
const path = require("path");
const app = express();
const port = 5555;

const categories = ["tshirts", "hoodies", "pants"];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/aboutus", (req, res) => {
  res.render("about_us");
});

app.get("/agb", (req, res) => {
  res.render("agb");
});

app.get("/imprint", (req, res) => {
  res.render("impressum");
});

app.get("/return", (req, res) => {
  res.render("return_policy");
});

app.get("/support", (req, res) => {
  res.render("support");
});

app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/products", (req, res) => {
  if (req.query.category && categories.includes(req.query.category)) {
    let category = [];
    products.forEach((product) => {
      if (product.category == req.query.category) category.push(product);
    });
    res.render("products", { products: category });
  } else res.redirect("/categories");
});

app.get("/product/:name", (req, res) => {
  if (req.params.name) {
    let found = false;
    products.forEach((product) => {
      if (product.shortname == req.params.name && !found) {
        found = true;
        res.render("product", { product: product });
      }
    });
    if (!found) res.redirect("/categories");
  } else res.redirect("/categories");
});

app.listen(port, () => console.log("Running on", port));
