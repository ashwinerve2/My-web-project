const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

// Create the Express app
const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Define the absolute path to the SQLite database
const dbPath = path.resolve(__dirname, 'database.db');

// Open SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the users table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    seat TEXT NOT NULL
  )`);
});

// GET Route: Get all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ users: rows });
  });
});

// GET Route: Get a specific user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: row });
  });
});

// POST Route: Create a new user
app.post('/users', (req, res) => {
  const { name, className, seat } = req.body;
  const query = 'INSERT INTO users (name, class, seat) VALUES (?, ?, ?)';
  db.run(query, [name, className, seat], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({
      message: 'User created successfully',
      user: { id: this.lastID, name, class: className, seat }
    });
  });
});

// PUT Route: Update an existing user
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, className, seat } = req.body;
  const query = 'UPDATE users SET name = ?, class = ?, seat = ? WHERE id = ?';
  
  db.run(query, [name, className, seat, id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      user: { id, name, class: className, seat }
    });
  });
});

// DELETE Route: Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  
  db.run(query, [id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User deleted successfully',
      userId: id
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
