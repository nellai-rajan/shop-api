const Product = require('../models/Product');

exports.getAll = async (req, res) => {
  const data = await Product.find();
  res.json(data);
};

exports.create = async (req, res) => {
  const data = await Product.create(req.body);
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(data);
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};