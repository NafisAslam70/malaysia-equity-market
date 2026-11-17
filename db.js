const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data.db');

// Initialize table for historical data
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS historical_data (symbol TEXT PRIMARY KEY, data TEXT)");
});

module.exports = db;





// const sqlite3 = require('sqlite3').verbose();

// const db = new sqlite3.Database('./data.db');

// // Initialize tables
// db.serialize(() => {
//   db.run("CREATE TABLE IF NOT EXISTS historical_data (symbol TEXT PRIMARY KEY, data TEXT)");
//   db.run("CREATE TABLE IF NOT EXISTS profile_details (symbol TEXT PRIMARY KEY, data TEXT)");
//   db.run("CREATE TABLE IF NOT EXISTS news_data (symbol TEXT PRIMARY KEY, data TEXT)");
// });

// module.exports = db;
