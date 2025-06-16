import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    zip: { type: String, required: true }, 
    city: { type: String, required: true },      
    country: { type: String, required: true }
  },
  category: {
    type: String,
    enum: ['electronics', 'office', 'food', 'furniture', 'clothing', 'other'],
    default: 'other'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },  
},
{
  timestamps:true,
}
);

supplierSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Supplier', supplierSchema);