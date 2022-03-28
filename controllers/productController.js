const Product = require("../models/product.js");

const urls = require("../static/urls.js");

const getAddProduct = (request, response, next) => {
  response.render("admin/addProduct.ejs", {
    path: urls.ADD_PRODUCT_PATH,
    pageTitle: "Add a new awesome product!",
  });
};

const postAddProduct = (request, response, next) => {
  const title = request.body.title;
  const imageURL = request.body.imageURL;
  const description = request.body.description;
  const price = request.body.price;
  const stock = request.body.stock;

  const product = new Product(title, imageURL, description, price, stock);
  product
    .save()
    .then((result) => {
      response.redirect(urls.ALL_PRODUCTS_PATH);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllProducts = (request, response, next) => {
  Product.findAll()
    .then((products) => {
      products.map((product) => {
        product._id = product._id.toString();
      });

      response.render("products.ejs", {
        path: urls.ALL_PRODUCTS_PATH,
        pageTitle: "All products",
        products: products,
      });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

// get product by its id
const getProduct = (request, response, next) => {
  let productId = request.params.productId;

  Product.findById(productId).then((product) => {
    if (!product) {
      next();
    }

    product._id = product._id.toString();

    response.render("product.ejs", {
      path: urls.ALL_PRODUCTS_PATH + "/" + productId,
      pageTitle: product.title,
      product: product,
    });
  });
};

// delete product by its id
const deleteProduct = (request, response, next) => {
  const productId = request.params.productId;

  Product.deleteById(productId)
    .then((result) => {
      console.log("Item was deleted successfully!");
      response.redirect(urls.ALL_PRODUCTS_PATH);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUpdateProduct = (request, response, next) => {
  const productId = request.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        next();
      }
      product._id = product._id.toString();

      response.render("admin/updateProduct.ejs", {
        path: urls.ALL_PRODUCTS_PATH + urls.UPDATE_ACTION + "/" + productId,
        pageTitle: "Update product " + product.title,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProduct = (request, response, next) => {
  const productId = request.body.productId;
  const title = request.body.title;
  const imageURL = request.body.imageURL;
  const description = request.body.description;
  const price = request.body.price;
  const stock = request.body.stock;

  const product = new Product(
    title,
    imageURL,
    description,
    price,
    stock,
    productId
  );

  product
    .update()
    .then(() => {
      console.log("Product with id" + productId + "was updated.");
      response.redirect(urls.ALL_PRODUCTS_PATH);
    })
    .catch((err) => {
      console.log(error);
    });
};

module.exports.getAddProduct = getAddProduct;
module.exports.postAddProduct = postAddProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getAllProducts = getAllProducts;
module.exports.getProduct = getProduct;
module.exports.getUpdateProduct = getUpdateProduct;
module.exports.updateProduct = updateProduct;
