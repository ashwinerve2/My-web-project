const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db/database'); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes to serve static HTML pages
app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/history.html'));
});

app.get('/arithmetic', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/arithmetic.html'));
});

// Route: Conversion API
app.post('/api/convert', (req, res) => {
  const { inputValue, sourceBase, targetBase } = req.body;

  console.log("POST /api/convert", req.body);
  const baseMap = { binary: 2, decimal: 10, octal: 8, hex: 16 };

  try {
    const sourceBaseNum = baseMap[sourceBase];
    const targetBaseNum = baseMap[targetBase];

    if (!sourceBaseNum || !targetBaseNum) {
      return res.json({ success: false, error: 'Invalid base type.' });
    }

    const parsedInput = parseInt(inputValue, sourceBaseNum);
    if (isNaN(parsedInput)) {
      return res.json({ success: false, error: 'Invalid input value.' });
    }

    const result = parsedInput.toString(targetBaseNum);

    // Insert into database
    db.run(`
      INSERT INTO history (type, input, sourceBase, targetBase, result, timestamp)
      VALUES (?, ?, ?, ?, ?, ?)
    `, ['conversion', inputValue, sourceBase, targetBase, result, new Date().toLocaleString()]);

    res.json({ success: true, result });
  } catch (err) {
    console.error('Conversion failed:', err);
    res.json({ success: false, error: 'Conversion failed.' });
  }
});

// Route: Arithmetic Calculation API
app.post('/api/calculate', (req, res) => {
  const { operand1, operand2, operation, base } = req.body;

  console.log("POST /api/calculate", req.body);
  const baseMap = { binary: 2, decimal: 10, octal: 8, hex: 16 };
  const operationMap = {
    add: '+', subtract: '-', multiply: '*', divide: '/'
  };

  try {
    const baseNum = baseMap[base];
    const op1 = parseInt(operand1, baseNum);
    const op2 = parseInt(operand2, baseNum);

    if (isNaN(op1) || isNaN(op2)) {
      return res.json({ success: false, error: 'Invalid operands.' });
    }

    const symbol = operationMap[operation];
    if (!symbol) return res.json({ success: false, error: 'Invalid operation' });

    let result;
    switch (symbol) {
      case '+': result = op1 + op2; break;
      case '-': result = op1 - op2; break;
      case '*': result = op1 * op2; break;
      case '/':
        if (op2 === 0) return res.json({ success: false, error: 'Cannot divide by zero' });
        result = Math.floor(op1 / op2); break;
    }

    const finalResult = result.toString(baseNum);

    // Insert into database
    db.run(`
      INSERT INTO history (type, operand1, operand2, operation, base, result, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, ['calculation', operand1, operand2, symbol, base, finalResult, new Date().toLocaleString()]);

    res.json({ success: true, result: finalResult });
  } catch (err) {
    console.error('Calculation failed:', err);
    res.json({ success: false, error: 'Calculation failed.' });
  }
});

// Route: Get History (latest 10)
app.get('/api/history', (req, res) => {
  db.all(`
    SELECT * FROM history
    ORDER BY id DESC
    LIMIT 10
  `, (err, rows) => {
    if (err) {
      console.error('Failed to fetch history:', err);
      return res.json({ success: false, error: 'Database error' });
    }
    res.json({ history: rows });
  });
});

// Route: Clear History
app.delete('/api/clear-history', (req, res) => {
  db.run('DELETE FROM history', (err) => {
    if (err) {
      console.error('Failed to clear history:', err);
      return res.json({ success: false, error: 'Failed to clear history' });
    }
    res.json({ success: true });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
