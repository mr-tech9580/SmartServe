// controllers/analyticsController.js — dashboard analytics using HashMap/HashSet

const Ticket = require('../models/Ticket');

const getCategoryBreakdown = async (req, res) => {
  try {
    const tickets = await Ticket.find();

    const categoryMap = {};
    tickets.forEach(ticket => {
      categoryMap[ticket.category] = (categoryMap[ticket.category] || 0) + 1;
    });
    res.status(200).json({ breakdown: categoryMap });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getDuplicateTickets = async (req, res) => {
  try {
    const openTickets = await Ticket.find({ status: 'open' });

    const seenTitles = new Set(); // HashSet — O(1) average lookup
    const duplicates = [];

    openTickets.forEach(ticket => {
      const key = ticket.title.trim().toLowerCase();
      if (seenTitles.has(key)) {
        duplicates.push(ticket); // we've seen this exact title before
      } else {
        seenTitles.add(key);
      }
    });
    
    res.status(200).json({ duplicates });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCategoryBreakdown, getDuplicateTickets };