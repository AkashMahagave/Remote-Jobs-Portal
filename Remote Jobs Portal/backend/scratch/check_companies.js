const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Company = require('./models/Company');

const checkCompanies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const companies = await Company.find({}, 'name');
    console.log('Companies in DB:', JSON.stringify(companies.map(c => c.name), null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkCompanies();
