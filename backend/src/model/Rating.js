import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedback: {
    type: String,
    trim: true,
    maxlength: 500
  },
  
},
{timestamps:true,}
);

// Update supplier average rating on save
ratingSchema.post('save', async function() {
  await this.model('Supplier').updateAverageRating(this.supplierId);
});

// Update supplier average rating on remove
ratingSchema.post('remove', async function() {
  await this.model('Supplier').updateAverageRating(this.supplierId);
});

// Prevent duplicate ratings
ratingSchema.index({ supplierId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Rating', ratingSchema);