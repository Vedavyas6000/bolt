const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, email, password, role, college_name, admin_name, contact_number } = req.body;
  const file = req.file;

/* Removed console.log to prevent sensitive info logging */
// console.log('RegisterUser request body:', req.body);
  console.log('Uploaded file:', file);

  if (role === 'student' && (!name || !email || !password)) {
    return res.status(400).json({ message: 'Please provide all required fields for student' });
  }

  if (role === 'college' && (!college_name || !admin_name || !email || !contact_number || !password)) {
    return res.status(400).json({ message: 'Please provide all required fields for college' });
  }

  if (role !== 'student' && role !== 'college') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const existingUser = await User.findByEmail(email, role);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let userData = { name, email, password, role };

    if (role === 'college') {
      userData = {
        college_name,
        admin_name,
        email,
        contact_number,
        password,
        role,
      };
    }

    if (file) {
      userData.idDocumentPath = file.path;
    }

    const userId = await User.create(userData);

    const token = generateToken(userId);

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  let { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Please provide email, password, and role' });
  }

  role = role.trim().toLowerCase();

  if (role !== 'student' && role !== 'college') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const user = await User.findByEmail(email, role);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
