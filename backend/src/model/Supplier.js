import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: {
    zip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  averageRating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

supplierSchema.statics.updateAverageRating = async function(supplierId) {
  const stats = await this.model('Rating').aggregate([
    { $match: { supplierId } },
    { $group: { _id: '$supplierId', avgRating: { $avg: '$value' } } }
  ]);
  await this.findByIdAndUpdate(supplierId, {
    averageRating: stats[0] ? stats[0].avgRating : null
  });
};

supplierSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;