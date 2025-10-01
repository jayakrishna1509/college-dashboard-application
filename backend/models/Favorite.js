import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  userId: {
    type: String,
    default: 'default-user', // For simplicity, using a default user
  },
}, {
  timestamps: true,
});

// Ensure one favorite per college per user
favoriteSchema.index({ collegeId: 1, userId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
