import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  room: { type: String, required: true }, // This will be the User's ID
  author: { type: String, required: true },
  message: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // True if sent by Admin
  time: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;