const { connection } = require('../config/db');

const createEvent = (req, res) => {
  const {
    title,
    category,
    description,
    image,
    event_datetime,
    location,
    host,
    registration_link,
  } = req.body;

  // Assuming college_id is available in req.user.id after authentication middleware
  const college_id = req.user.id;

  if (
    !title ||
    !category ||
    !description ||
    !image ||
    !event_datetime ||
    !location ||
    !host ||
    !registration_link
  ) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const query = `
    INSERT INTO events 
    (college_id, title, category, description, image, event_datetime, location, host, registration_link) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    college_id,
    title,
    category,
    description,
    image,
    event_datetime,
    location,
    host,
    registration_link,
  ];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error('Error creating event:', JSON.stringify(error, null, 2));
      return res.status(500).json({ message: 'Server error', error: error.sqlMessage || error.message });
    }
    res.status(201).json({ message: 'Event created successfully', eventId: results.insertId });
  });
};

module.exports = {
  createEvent,
};
