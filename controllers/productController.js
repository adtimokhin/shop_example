const Product = require("../models/product.js");
const Cart = require("../models/cart.js");

const urls = require("../static/urls.js");


const getAddProduct = (request, response, next) => {
  response.render("addProduct.ejs", {
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

  const product = Product.create({
    title: title,
    imageURL: imageURL,
    description: description,
    price: price,
    stock: stock,
  })
    .then(() => {
      response.redirect(urls.ALL_PRODUCTS_PATH);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllProducts = (request, response, next) => {
  Product.findAll()
    .then((products) => {
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
  Product.findByPk(productId)
    .then((products) => {
      if (!products) {
        next();
      }

      response.render("product.ejs", {
        path: urls.ALL_PRODUCTS_PATH + "/" + productId,
        pageTitle: products.dataValues.title,
        product: products,
      });
    })
    .catch(next);
};

// delete product by its id
const deleteProduct = (request, response, next) => {
  const productId = request.params.productId;

  Product.destroy({ where: { id: productId } })
    .then(() => {
      console.log("Product is destroyed!");
      response.redirect(urls.ALL_PRODUCTS_PATH);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUpdateProduct = (request, response, next) => {
  const productId = request.params.productId;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      if (!product) {
        next();
      }

      response.render("updateProduct.ejs", {
        path: urls.ALL_PRODUCTS_PATH + urls.UPDATE_ACTION + "/" + productId,
        pageTitle: "Update product" + product.title,
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

  Product.findOne({ where: { id: productId } })
    .then((product) => {
      if (product == null) {
        console.log("Tried to update a product that does not exist");
        next();
      }

      product.title = title;
      product.imageURL = imageURL;
      product.description = description;
      product.price = price;
      product.stock = stock;

      return product.save();
    })
    .then(() => {
      console.log("Product with id" + productId + "was updated.");
      response.redirect(urls.ALL_PRODUCTS_PATH);
    })
    .catch((error) => {
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
