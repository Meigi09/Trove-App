// controllers/supplierController.js
import Supplier from '../model/Supplier.js';
import Rating from '../model/Rating.js';
import { Parser } from 'json2csv';

// @desc    Create a new supplier
// @route   POST /api/suppliers
export const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({ success: true, data: supplier });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all suppliers (search, pagination, filter)
// @route   GET /api/suppliers
export const getSuppliers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const query = {};

    if (req.query.search) {
      query.$or = [
        { name: new RegExp(req.query.search, 'i') },
        { contactPerson: new RegExp(req.query.search, 'i') },
        { email: new RegExp(req.query.search, 'i') },
      ];
    }

    const total = await Supplier.countDocuments(query);
    const suppliers = await Supplier.find(query).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      count: suppliers.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: suppliers,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single supplier by ID
// @route   GET /api/suppliers/:id
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ success: false, error: 'Supplier not found' });
    res.status(200).json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!supplier) return res.status(404).json({ success: false, error: 'Supplier not found' });
    res.status(200).json({ success: true, data: supplier });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ success: false, error: 'Supplier not found' });
    res.status(200).json({ success: true, message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Export suppliers to CSV
// @route   GET /api/suppliers/export
export const exportSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    const fields = ['name', 'contactPerson', 'email', 'phone', 'address.city', 'address.country', 'averageRating'];
    const parser = new Parser({ fields });
    const csv = parser.parse(suppliers);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=suppliers.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
