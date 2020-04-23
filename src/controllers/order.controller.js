const Product = require("../models/product.model");
const Order = require("../models/order.model");

const orderCtrl = {};

// POST
orderCtrl.saveOrder = async (req, res) => {
  let body = req.body;
  let products = body.items;

  let idProduct = [];
  products.forEach((element) => {
    idProduct.push(element.product);
  });

  let productOrder = [];

  Product.find()
    .where("_id")
    .in(idProduct)
    .then(async (productDB) => {
      for (let i = 0; i < productDB.length; i++) {
        //  products ---- Array pedido
        //  productDB --- Array db

        let qty = products.find((data) => data.product == productDB[i]._id)
          .quantity;

        if (qty <= productDB[i].quantity) {
          quantityNew = {
            quantity: productDB[i].quantity - qty,
          };
          let options = {
            new: true,
            runValidators: true,
          };

          let modify = await Product.findByIdAndUpdate(
            productDB[i]._id,
            quantityNew,
            options
          );

          if (modify) {
            productOrder.push({
              product: modify._id,
              quantity: qty,
              isAdditional: products.isAdditional,
            });
          }
        }
      }
      // console.log(productOrder);
      let order = new Order({
        total: body.total,
        items: productOrder,
      });

      let orderDB = await order.save();
      res.json({
        ok: true,
        message: "Saved Order",
        orderDB,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });

  // console.log(order);

  // order
  //   .save()
  //   .then((orderDB) => {
  //     res.json({
  //       ok: true,
  //       message: "Saved Order",
  //       orderDB,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       ok: false,
  //       err,
  //     });
  //   });
};

validQuantity = async (products) => {
  // Obtengo Solo los id de los productos

  let idProduct = [];
  products.forEach((element) => {
    idProduct.push(element.product);
  });

  let productOrder = [];
  Product.find()
    .where("_id")
    .in(idProduct)
    .then(async (productDB) => {
      for (let i = 0; i < productDB.length; i++) {
        //  products ---- Array pedido
        //  productDB --- Array db

        let qty = products.find((data) => data.product == productDB[i]._id)
          .quantity;

        if (qty <= productDB[i].quantity) {
          quantityNew = {
            quantity: productDB[i].quantity - qty,
          };
          let options = {
            new: true,
            runValidators: true,
          };

          let modify = await Product.findByIdAndUpdate(
            productDB[i]._id,
            quantityNew,
            options
          );
          if (!modify) {
            console.log(`No suficiente productos ${productDB.name}`);
            // res.json({
            //   ok: false,
            //   message: `No suficiente productos ${productDB[i].name}`,
            // });
          }
          if (modify) {
            productOrder.push({
              product: modify._id,
              quantity: qty,
              isAdditional: products.isAdditional,
            });
          }
        }
      }
      console.log(productOrder);
      // return productOrder;
      // return callback(false, productOrder);
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });
};

// GET
orderCtrl.findOrder = (req, res) => {
  Order.find({})
    .populate({ path: "items.product", model: Product, select: "name" })
    .then((orderDB) => {
      res.json({
        ok: true,
        orderDB,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        err,
      });
    });
};

module.exports = orderCtrl;
