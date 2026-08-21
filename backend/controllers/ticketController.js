// controllers/ticketController.js — handles ticket creation and retrieval

const Ticket = require('../models/Ticket');
const { calculatePriorityScore } = require('../utils/priorityCalculator');

const createTicket = async (req, res) => {
  try {
    const { title, description, category, severity } = req.body;

    if (!title || !description || !category || !severity) {
      return res.status(400).json({ message: 'Please provide title, description, category, and severity' });
    }

    const priorityScore = calculatePriorityScore(severity, 0);

    const newTicket = await Ticket.create({
      title,
      description,
      category,
      severity,
      priorityScore,
      createdBy: req.user.id, // this comes from our "protect" middleware!
    });

    res.status(201).json({
      message: 'Ticket created successfully',
      ticket: newTicket,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id })
      .sort({ priorityScore: -1 });

    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTicket, getMyTickets };