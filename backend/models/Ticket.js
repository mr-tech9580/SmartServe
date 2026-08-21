// models/Ticket.js — defines the structure of a "ticket" document in MongoDB

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Hardware', 'Network', 'Software', 'Electrical', 'Other'],
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
  },
  priorityScore: {
    type: Number,
    required: true,
    default: 0, // will be calculated before saving — explained in the controller
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, // this is HOW we reference another document
    ref: 'User',                           // tells Mongoose WHICH model it points to
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // no one assigned yet when a ticket is first created
  },
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;