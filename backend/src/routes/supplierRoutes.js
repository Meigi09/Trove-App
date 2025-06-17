import express from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  exportSuppliers
} from '../controllers/supplierController.js';

const router = express.Router();

router.post('/', createSupplier);
router.get('/', getSuppliers);
router.get('/export', exportSuppliers);
router.get('/:id', getSupplierById);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
