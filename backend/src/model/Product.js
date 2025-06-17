import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  cost: { type: Number, required: true, min: 0 },
  unit: {
    type: String,
    enum: ['piece', 'kg', 'liter', 'box', 'pack'],
    default: 'piece'
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

productSchema.statics.updateRating = async function(productId) {
  const stats = await this.model('Review').aggregate([
    { $match: { productId } },
    {
      $group: {
        _id: '$productId',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);
  await this.findByIdAndUpdate(productId, {
    averageRating: stats[0] ? stats[0].avgRating : null,
    reviewCount: stats[0] ? stats[0].count : 0
  });
};

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
