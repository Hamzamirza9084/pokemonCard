import Slider from '../models/sliderModel.js';

// @desc    Get all slider banners
// @route   GET /api/sliders
// @access  Public
export const getSliders = async (req, res) => {
  const sliders = await Slider.find({});
  res.json(sliders);
};

// @desc    Create a new slider banner
// @route   POST /api/sliders
// @access  Private/Admin
export const createSlider = async (req, res) => {
  const { title, description, link } = req.body;
  
  // Use the image URL returned by the uploadMiddleware (Cloudinary)
  const image = req.file ? req.file.path : '';

  if (!image) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  const slider = new Slider({
    title,
    image,
    description,
    link,
  });

  const createdSlider = await slider.save();
  res.status(201).json(createdSlider);
};

// @desc    Delete a slider banner
// @route   DELETE /api/sliders/:id
// @access  Private/Admin
export const deleteSlider = async (req, res) => {
  const slider = await Slider.findById(req.params.id);

  if (slider) {
    await slider.deleteOne();
    res.json({ message: 'Slider removed' });
  } else {
    res.status(404);
    throw new Error('Slider not found');
  }
};