require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Suburb = require('./models/Suburb');

const suburbs = JSON.parse(fs.readFileSync(path.join(__dirname, '../..', 'melbourne_suburbs_sample.json'), 'utf-8'));

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    await Suburb.deleteMany({});
    console.log('Existing suburbs cleared');

    await Suburb.insertMany(suburbs);
    console.log('Suburbs seeded successfully');

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedDB(); 