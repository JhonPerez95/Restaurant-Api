const Product = require("../models/product.model");
const Order = require("../models/order.model");

const orderCtrl = {};

// POST
orderCtrl.saveOrder = async (req, res) => {
  let body = req.body;
  let products = body.items;

  let productDB = await findProduct(products);
  let productOrder = await findQuantity(productDB, products);

  if (productOrder.ok === false) {
    console.log(productOrder.message);
    res.json({
      ok: false,
      message: productOrder.message,
    });
  } else {
    let order = new Order({
      total: body.total,
      items: productOrder,
    });

    let savedOder = await order.save();

    let updated = await updateProduct(productDB, products);
    if (!updated) {
      res.json({
        ok: false,
        message: "No se pudo actualizar produc",
      });
    } else {
      res.json({
        ok: true,
        message: "Saved Order",
        savedOder,
        messageUpdate: "updated successfully",
      });
    }
  }
};

let findProduct = async (products) => {
  let idProduct = [];
  products.forEach((element) => {
    idProduct.push(element.product);
  });

  let productDB = await Product.find().where("_id").in(idProduct);
  return productDB;
};

let findQuantity = (productDB, products) => {
  let prueba = [];

  for (let i = 0; i < productDB.length; i++) {
    qty = products.find((data) => data.product == productDB[i]._id).quantity;

    if (qty <= productDB[i].quantity) {
      prueba.push({
        product: productDB[i]._id,
        quantity: qty,
        isAdditional: products[i].isAdditional,
      });
    } else {
      return {
        ok: false,
        message: `Hay disponibles  ${productDB[i].quantity} unidades de ${productDB[i].name} , escoja otro producto `,
      };
    }
  }
  return prueba;
};

let updateProduct = async (productDB, products) => {
  for (let i = 0; i < productDB.length; i++) {
    qty = products.find((data) => data.product == productDB[i]._id).quantity;

    if (qty <= productDB[i].quantity) {
      quantityNew = {
        quantity: productDB[i].quantity - qty,
      };

      let modify = await Product.findByIdAndUpdate(
        productDB[i]._id,
        quantityNew
      );
      if (!modify) {
        return false;
      } else {
        return true;
      }
    }
  }
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

//PUT
orderCtrl.updateOrder = (req, res) => {
  //
  let id = req.params.id;
  let body = req.body;
  let options = {
    new: true,
    runValidators: true,
  };
  Order.findByIdAndUpdate(id, body, options)
    .then((orderDB) => {
      res.json({
        ok: true,
        message: "Product successfully updated",
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

// DELETE
orderCtrl.deleteOrder = (req, res) => {
  let id = req.params.id;

  Order.findByIdAndRemove(id)
    .then((orderDB) => {
      res.json({
        ok: false,
        message: "Delted Successfully !",
        orderDB,
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

module.exports = orderCtrl;
