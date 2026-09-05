const express = require('express');
const router = express.Router();
const product = require('../controller/product.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// // GET all
// router.get('/', async (req, res) => {
//   const data = await Product.find();
//   res.json(data);
// });

// // ADD
// router.post('/', async (req, res) => {
//   const product = new Product(req.body);
//   await product.save();
//   res.json(product);
// });

// // DELETE
// router.delete('/:id', async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Deleted' });
// });

// PUBLIC (customer)
router.get('/', product.getAll);

// ADMIN ONLY
router.post('/', auth, role('admin-user'), product.create);
router.put('/:id', auth, role('admin-user'), product.update);
router.delete('/:id', auth, role('admin-user'), product.remove);

module.exports = router;


