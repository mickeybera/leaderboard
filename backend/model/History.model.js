import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  pointsClaimed: Number,
  claimedAt: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);
export default History;

