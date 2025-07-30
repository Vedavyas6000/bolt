const { connection } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (userData) => {
    const { name, email, password, role, college_name, admin_name, contact_number, idDocumentPath } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      let query = '';
      let params = [];
      if (role === 'student') {
        query = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';
        params = [name, email, hashedPassword];
      } else if (role === 'college') {
        query = 'INSERT INTO colleges (college_name, admin_name, email, contact_number, password, id_document_path) VALUES (?, ?, ?, ?, ?, ?)';
        params = [college_name, admin_name, email, contact_number, hashedPassword, idDocumentPath];
      } else {
        return reject(new Error('Invalid role'));
      }
      connection.query(query, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results.insertId);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM colleges WHERE id = ?';
      connection.query(query, [id], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  },

  findByEmail: (email, role) => {
    return new Promise((resolve, reject) => {
      let query = '';
      if (role === 'student') {
        query = 'SELECT * FROM students WHERE email = ?';
      } else if (role === 'college') {
        query = 'SELECT * FROM colleges WHERE email = ?';
      } else {
        return reject(new Error('Invalid role'));
      }
      connection.query(query, [email], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  },

  comparePassword: async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
};

module.exports = User;
