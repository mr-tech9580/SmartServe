// controllers/adminController.js — admin-only ticket operations

const Ticket = require('../models/Ticket');
const PriorityQueue = require('../utils/PriorityQueue');

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('createdBy', 'name email')   // replaces the ObjectId with actual user info
      .populate('assignedTo', 'name email')
      .sort({ priorityScore: -1 });
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getNextTicket = async (req, res) => {
  try {
    // Pull all currently-open tickets from MongoDB
    const openTickets = await Ticket.find({ status: 'open' })
      .populate('createdBy', 'name email');

    const pq = new PriorityQueue();
    openTickets.forEach(ticket => pq.insert(ticket));

    const nextTicket = pq.extractMax();

    if (!nextTicket) {
      return res.status(200).json({ message: 'No open tickets', ticket: null });
    }

    res.status(200).json({ ticket: nextTicket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const assignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignedTo, status: 'in-progress' },
      { new: true } // return the UPDATED document, not the old one
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket assigned', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['open', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Status updated', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllTickets, getNextTicket, assignTicket, updateTicketStatus };