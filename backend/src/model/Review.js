import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  isApproved: {
    type: Boolean,
    default: false // For moderation
  },
  
},
{timestamps:true,}
);

// Update product ratings on save
reviewSchema.post('save', async function() {
  await this.model('Product').updateRating(this.productId);
});

// Update product ratings on remove
reviewSchema.post('remove', async function() {
  await this.model('Product').updateRating(this.productId);
});

// Prevent duplicate reviews
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);