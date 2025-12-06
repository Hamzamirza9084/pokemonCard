import Product from '../models/Product.js';

// @desc    Fetch all products (Supports category, subcategory, limit, and sort)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, subcategory, limit, sort } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    
    if (subcategory) {
      query.subcategory = subcategory;
    }

    // Initialize Query
    let productsQuery = Product.find(query);

    // Handle Sorting
    if (sort === 'newest') {
      // Sort by _id descending (creation time)
      productsQuery = productsQuery.sort({ _id: -1 }); 
    }

    // Handle Limit
    if (limit) {
      productsQuery = productsQuery.limit(Number(limit));
    }

    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const { name, price, image, category, subcategory, countInStock, description } = req.body;
  const product = new Product({
    name, price, image, category, subcategory, countInStock, description
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const { name, price, description, brand, category, subcategory, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.countInStock = countInStock || product.countInStock;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export { 
  getProducts, 
  getProductById, 
  deleteProduct, 
  createProduct, 
  updateProduct 
};