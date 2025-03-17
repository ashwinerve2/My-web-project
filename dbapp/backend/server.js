const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path'); // For resolving file paths
const cors = require('cors');


// Create the Express app
const app = express();

//Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());




// (In development, the React app is served by npm start on port 3000, so we comment these out)
// Serve index.html when the root URL is requested
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
// });

// Serve static files (HTML, CSS, JS)
// app.use(express.static('frontend'));

// Open SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
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

// POST Route: Create a new user
app.post('/users', (req, res) => {
  const { name, class: className, seat } = req.body;

  // Validation: Check if the fields are provided
  if (!name || !className || !seat) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // SQL query to insert the user into the database
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

// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
