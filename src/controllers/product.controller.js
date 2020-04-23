const Product = require("../models/product.model");
const productCtrl = {};

//GET
productCtrl.findProduct = (req, res) => {
  Product.find({ avaliable: true })
    .populate({ path: "category", select: "description" })
    .sort("name")
    .then((products) => {
      res.json({
        ok: true,
        message: "All Products",
        products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });
};

productCtrl.findById = (req, res) => {
  let id = req.params.id;
  Product.findById(id)
    .populate({ path: "category" })
    .then((productDB) => {
      if (productDB.avaliable === false) {
        res.json({
          message: "Product sold out",
        });
        return;
      }
      res.json({
        ok: true,
        message: "Found Product",
        productDB,
      });
    })
    .catch((err) => {
      res.json({
        ok: false,
        err,
      });
    });
};

//POST
productCtrl.saveProduct = (req, res) => {
  let body = req.body;
  let product = new Product({
    name: body.name,
    quantity: body.quantity,
    price: body.price,
    category: body.category,
  });
  product
    .save()
    .then((productDB) => {
      res.json({
        ok: true,
        message: "Saved Product",
        productDB,
      });
    })
    .catch((err) => {
      res.json({
        ok: false,
        message: "Not saved Product",
        err,
      });
    });
};

// PUT
productCtrl.updateProduct = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let options = {
    new: true,
    runValidators: true,
  };

  Product.findByIdAndUpdate(id, body, options)
    .then((productDB) => {
      res.json({
        ok: true,
        message: "Product successfully updated",
        productDB,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });
};

// DELETE soft
productCtrl.deleteProduct = (req, res) => {
  let id = req.params.id;
  let status = {
    avaliable: false,
  };
  let options = {
    new: true,
    runValidators: true,
  };

  Product.findByIdAndUpdate(id, status, options)
    .then((productDB) => {
      if (productDB.avaliable === false) {
        return res.json({
          message: "Product  sold out",
        });
      }
      res.json({
        ok: true,
        message: "Delted Successfully !",
        productDB,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        message: "Not Found",
        err,
      });
    });
};
module.exports = productCtrl;
