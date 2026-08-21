const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: 'Comment text required' });

    const comment = await Comment.create({
      ticket: ticketId,
      author: req.user.id,
      text,
    });

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const comments = await Comment.find({ ticket: ticketId })
      .populate('author', 'name')
      .sort({ createdAt: 1 });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addComment, getComments };