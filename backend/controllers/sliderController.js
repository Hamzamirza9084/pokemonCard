import Slider from '../models/sliderModel.js';

// @desc    Get all slider banners
// @route   GET /api/sliders
// @access  Public
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({});
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sliders" });
  }
};

// @desc    Create a new slider banner
// @route   POST /api/sliders
// @access  Private/Admin
export const createSlider = async (req, res) => {
  try {
    const { title } = req.body;
    
    // IMPORTANT: CloudinaryStorage puts the URL in req.file.path
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const slider = new Slider({
      title,
      image: req.file.path, // This is the secure URL from Cloudinary
      description: req.body.description || '',
      link: req.body.link || '/'
    });

    const createdSlider = await slider.save();
    res.status(201).json(createdSlider);
  } catch (error) {
    // This will print the actual error to your Render Logs
    console.error("DETAILED SERVER ERROR:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// @desc    Delete a slider banner
// @route   DELETE /api/sliders/:id
// @access  Private/Admin
export const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (slider) {
      await slider.deleteOne();
      res.json({ message: 'Slider removed' });
    } else {
      res.status(404).json({ message: 'Slider not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete slider" });
  }
};