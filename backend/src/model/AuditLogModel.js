import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'password_change',
      'profile_update',
      '2fa_enabled',
      '2fa_disabled',
      'supplier_created',
      'supplier_updated',
      'supplier_deleted',
      'product_created',
      'product_updated',
      'product_deleted'
    ]
  },
  ipAddress: String,
  userAgent: String,
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true,
  capped: { size: 10000000, max: 10000 } // 10MB space, max 10,000 documents
});

// Indexes for faster querying
auditLogSchema.index({ userId: 1 });
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ action: 1 });

export default mongoose.model('AuditLog', auditLogSchema);