const Category = require("../models/category.model");
const Product = require("../models/product.model");

const categoryCtlr = {};

//POST
categoryCtlr.saveCategory = (req, res) => {
  let body = req.body;
  let category = new Category({
    description: body.description,
  });
  category
    .save()
    .then((categoryDB) => {
      res.json({
        ok: true,
        message: "saved category",
        categoryDB,
      });
    })
    .catch((err) => {
      res.json({
        ok: False,
        err,
      });
    });
};

//GET
categoryCtlr.findCategory = (req, res) => {
  Category.find()
    .sort("description") // Ordenar por ...
    .then((categories) => {
      res.json({
        ok: true,
        message: "All Categories ",
        categories,
      });
    })
    .catch((err) => {
      res.json({
        ok: false,
        err,
      });
    });
};

categoryCtlr.findById = (req, res) => {
  category = {
    category: req.params.id,
  };
  // Find all Product by Category
  Product.find(category, "name avaliable quantity")
    .populate("category", "description")
    .then((categoryDB) => {
      res.json({
        ok: true,
        categoryDB,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });

  // Category.findById(id)
  //   .then((categoryDB) => {
  //     res.json({
  //       ok: true,
  //       message: "Se encontro",
  //       categoryDB,
  //     });
  //   })
  //   .catch((err) =>
  //     res.status(500).json({
  //       ok: false,
  //       err,
  //     })
  //   );
};

// PUT

categoryCtlr.updateCategory = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  let options = {
    new: true,
    runValidators: true,
  };

  Category.findByIdAndUpdate(id, body, options)
    .then((categoryDB) => {
      res.json({
        ok: true,
        message: " Category successfully updated",
        categoryDB,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });
};
module.exports = categoryCtlr;
