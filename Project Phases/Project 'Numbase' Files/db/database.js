// db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the database file 
const dbPath = path.join(__dirname, 'numbase.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite DB:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create the history table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL, -- 'conversion' or 'calculation'
      input TEXT,
      sourceBase TEXT,
      targetBase TEXT,
      operand1 TEXT,
      operand2 TEXT,
      operation TEXT,
      base TEXT,
      result TEXT,
      timestamp TEXT
    )
  `);
});

module.exports = db;
