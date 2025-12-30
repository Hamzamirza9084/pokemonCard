import mongoose from 'mongoose';

const sliderSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // URL from Cloudinary
    description: { type: String },
    link: { type: String, default: '/' }, // Where the slide points to
  },
  { timestamps: true }
);

const Slider = mongoose.model('Slider', sliderSchema);
export default Slider;