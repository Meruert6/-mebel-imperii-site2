// backend/src/controllers/uploadController.js

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  return res.status(201).json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename
  });
};
