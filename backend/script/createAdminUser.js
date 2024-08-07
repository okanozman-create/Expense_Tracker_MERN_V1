const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path to your User model
const connectDB = require('../config/db'); // Import the connectDB function

require('dotenv').config({ path: '../.env' }); // Load environment variables

const createAdminUser = async () => {
  try {
    // Connect to the database
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD not set in .env file');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists.');
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({ email, password: hashedPassword, isAdmin: true });

    await adminUser.save();
    console.log('Admin user created successfully.');

    mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    mongoose.disconnect();
  }
};

// Call the function to create the admin user
createAdminUser();
