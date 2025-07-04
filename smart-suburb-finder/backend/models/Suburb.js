const mongoose = require('mongoose');

const suburbSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  avg_rent: Number,
  commute_time_cbd: Number,
  lifestyle: [String],
  school_rating: Number,
  safety_score: Number,
  description: String
});

module.exports = mongoose.model('Suburb', suburbSchema); 