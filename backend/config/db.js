const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'veda',
  database: process.env.MYSQL_DATABASE || 'college_buzz'
});

const connectDB = () => {
  connection.connect(error => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
      process.exit(1);
    }
    console.log('MySQL database connected');
  });
};

module.exports = connectDB;
module.exports.connection = connection;
