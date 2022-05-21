const Products = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      status: "success",
      result: products.length,
      products: products,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_id, title, price, description, content, images } = req.body;
    if (!images) return res.status(400).json({ msg: "No image upload" });

    const product = await Products.findOne({ product_id });
    if (product)
      return res.status(400).json({ msg: "This product already exists." });

    const newProduct = new Products({
      product_id,
      title: title.toLowerCase(),
      price,
      description,
      content,
      images,
    });

    await newProduct.save().then((product) => {
      res.json({ msg: "Created a product", data: product });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json({ msg: "Deleted a Product" });
      })
      .catch((err) => {
        res.status(502).send(err.message);
      });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  console.log(req.body, req.params);
  try {
    const { title, price, description, content, images } = req.body;
    if (!images) return res.status(400).json({ msg: "No image upload" });

    await Products.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
      }
    )
      .then(() => {
        res.json({ msg: "Updated a Product" });
      })
      .catch((err) => {
        res.status(502).send(err.message);
      });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { updateProduct, getProducts, deleteProduct, createProduct };
