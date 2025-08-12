const express = require('express');
const router = express.Router();

// Mock data for demonstration (in a real app, this would come from a database)
let computerItems = [
  {
    id: 1,
    name: 'Gaming Laptop',
    category: 'Laptop',
    price: 1299.99,
    brand: 'ASUS',
    specs: {
      processor: 'Intel i7-12700H',
      ram: '16GB',
      storage: '512GB SSD',
      graphics: 'RTX 3060'
    },
    inStock: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 49.99,
    brand: 'Logitech',
    specs: {
      dpi: '8000',
      battery: 'Rechargeable',
      connectivity: '2.4GHz Wireless'
    },
    inStock: true,
    createdAt: new Date().toISOString()
  }
];

// GET all computer items
router.get('/', (req, res) => {
  try {
    const { category, brand, inStock, minPrice, maxPrice } = req.query;
    
    let filteredItems = [...computerItems];
    
    // Apply filters
    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (brand) {
      filteredItems = filteredItems.filter(item => 
        item.brand.toLowerCase().includes(brand.toLowerCase())
      );
    }
    
    if (inStock !== undefined) {
      filteredItems = filteredItems.filter(item => 
        item.inStock === (inStock === 'true')
      );
    }
    
    if (minPrice) {
      filteredItems = filteredItems.filter(item => 
        item.price >= parseFloat(minPrice)
      );
    }
    
    if (maxPrice) {
      filteredItems = filteredItems.filter(item => 
        item.price <= parseFloat(maxPrice)
      );
    }
    
    res.json({
      success: true,
      count: filteredItems.length,
      data: filteredItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch computer items'
    });
  }
});

// GET single computer item by ID
router.get('/:id', (req, res) => {
  try {
    const item = computerItems.find(item => item.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Computer item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch computer item'
    });
  }
});

// POST create new computer item
router.post('/', (req, res) => {
  try {
    const { name, category, price, brand, specs } = req.body;
    
    // Basic validation
    if (!name || !category || !price || !brand) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, category, price, and brand'
      });
    }
    
    const newItem = {
      id: computerItems.length > 0 ? Math.max(...computerItems.map(item => item.id)) + 1 : 1,
      name,
      category,
      price: parseFloat(price),
      brand,
      specs: specs || {},
      inStock: true,
      createdAt: new Date().toISOString()
    };
    
    computerItems.push(newItem);
    
    res.status(201).json({
      success: true,
      message: 'Computer item created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create computer item'
    });
  }
});

// PUT update computer item
router.put('/:id', (req, res) => {
  try {
    const itemIndex = computerItems.findIndex(item => item.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Computer item not found'
      });
    }
    
    const updatedItem = {
      ...computerItems[itemIndex],
      ...req.body,
      id: parseInt(req.params.id), // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    computerItems[itemIndex] = updatedItem;
    
    res.json({
      success: true,
      message: 'Computer item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update computer item'
    });
  }
});

// DELETE computer item
router.delete('/:id', (req, res) => {
  try {
    const itemIndex = computerItems.findIndex(item => item.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Computer item not found'
      });
    }
    
    const deletedItem = computerItems.splice(itemIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Computer item deleted successfully',
      data: deletedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete computer item'
    });
  }
});

module.exports = router; 