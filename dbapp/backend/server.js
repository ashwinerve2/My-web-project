const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new Express app
const app = express();

// Set up middleware for parsing JSON
app.use(express.json());

// Path for the SQLite database file
const dbPath = path.join(__dirname, 'database.db');

// Create SQLite database and the table if not already created
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database created/connected');
  }
});

// Create a table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER
  );`,
  (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created or already exists');
    }
  }
);

// CRUD services (Create, Read, Update, Delete)

// Create a new user
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  const stmt = db.prepare('INSERT INTO users (name, email, age) VALUES (?, ?, ?)');
  stmt.run([name, email, age], function (err) {
    if (err) {
      return res.status(500).send('Error creating user');
    }
    res.status(201).send({ id: this.lastID, name, email, age });
  });
});

// Read all users
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.status(200).json(rows);
  });
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const { name, email, age } = req.body;
  const { id } = req.params;
  const stmt = db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?');
  stmt.run([name, email, age, id], function (err) {
    if (err) {
      return res.status(500).send('Error updating user');
    }
    res.status(200).send({ id, name, email, age });
  });
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  stmt.run([id], function (err) {
    if (err) {
      return res.status(500).send('Error deleting user');
    }
    res.status(200).send({ message: `User with ID ${id} deleted` });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
