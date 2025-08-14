const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection(process.env.MYSQL_URL);


const connectDB = () => {
  connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL on Railway');
});
};

module.exports = connectDB;
module.exports.connection = connection;
