const Orders = require("../models/order");

const createOrder = async (req, res) => {
  try {
    const { name, email, address, mobile, orderTotal, cart, user_id, status } =
      req.body;
    const newOrder = new Orders({
      name,
      email,
      address,
      mobile,
      orderTotal,
      cart,
      user_id,
      status,
    });

    // Save data in mongodb
    await newOrder.save().then((order) => {
      console.log(order);
      res.status(201).json(order);
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const orderHistory = async (req, res) => {
  const user_id = req.params.id;

  await Orders.find({ user_id: user_id })
    .then((result) => {
      console.log(result[0]);
      res.status(200).json(result);
    })
    .catch((e) => {
      res.send(e);
    });
};

const viewOrder = async (req, res) => {
  await Orders.find({ _id: req.params.order_id })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};
module.exports = {
  createOrder,
  orderHistory,
  viewOrder,
};
