const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId, products } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const orderItems = await Promise.all(products.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return { product: product._id, quantity: item.quantity };
    }));

    const order = new Order({ user: user._id, products: orderItems });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get order details
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user').populate('products.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};

// List all orders for a user
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id }).populate('products.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
