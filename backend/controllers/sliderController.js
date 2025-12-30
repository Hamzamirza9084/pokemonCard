import Slider from '../models/sliderModel.js'; // Ensure this model exists

// @desc    Get all slider banners
// @route   GET /sliders
// @access  Public
export const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find({});
    res.json(sliders);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch sliders" });
  }
};

// @desc    Create a new slider banner
// @route   POST /sliders
// @access  Private/Admin
export const createSlider = async (req, res) => {
  try {
    const { title } = req.body;
    
    // Check if Cloudinary successfully processed the file
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded. Check Cloudinary credentials.' });
    }

    const slider = new Slider({
      title,
      image: req.file.path, // The URL provided by CloudinaryStorage
    });

    const createdSlider = await slider.save();
    res.status(201).json(createdSlider);
  } catch (error) {
    // This logs the exact error to your Render Dashboard
    console.error("Slider Upload Error:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

// @desc    Delete a slider banner
// @route   DELETE /sliders/:id
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