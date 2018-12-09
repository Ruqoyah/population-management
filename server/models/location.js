import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;
/**
 * Location Schema
 */
const locationSchema = new Schema({
  location: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  totalFemale: {
    type: Number,
    trim: true,
    required: true,
  },
  totalMale: {
    type: Number,
    trim: true,
    required: true,
  },
  totalResidents: {
    type: Number,
    trim: true,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model('location', locationSchema);
