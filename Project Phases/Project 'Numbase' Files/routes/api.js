const express = require('express');
const router = express.Router();
const db = require('../db/database');

const baseMap = { binary: 2, decimal: 10, octal: 8, hex: 16 };

// Convert Number System
router.post('/convert', (req, res) => {
  const { inputValue, sourceBase, targetBase } = req.body;

  console.log(`Converting: ${inputValue} from ${sourceBase} to ${targetBase}`);

  if (!baseMap[sourceBase] || !baseMap[targetBase]) {
    return res.status(400).json({ success: false, error: 'Invalid base type.' });
  }

  const decimalValue = parseInt(inputValue, baseMap[sourceBase]);

  console.log(`Parsed value: ${decimalValue}`);

  if (isNaN(decimalValue)) {
    return res.status(400).json({ success: false, error: 'Invalid number for the selected base.' });
  }

  const result = decimalValue.toString(baseMap[targetBase]).toUpperCase();
  console.log(`Conversion result: ${result}`);

  db.run(`
    INSERT INTO Conversions (inputValue, sourceBase, targetBase, result)
    VALUES (?, ?, ?, ?)
  `, [inputValue, sourceBase, targetBase, result]);

  res.json({ success: true, result });
});

// Get Conversion History
router.get('/history', (req, res) => {
  console.log("Fetching history...");
  db.all('SELECT * FROM Conversions ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.log("Error fetching history:", err);
      res.status(500).json({ success: false, error: 'Error fetching history' });
      return;
    }
    console.log("History fetched:", rows);
    res.json({ success: true, history: rows });
  });
});

// Perform Arithmetic Operation
router.post('/calculate', (req, res) => {
  const { operand1, operand2, operation, base } = req.body;

  console.log(`Calculating: ${operand1} ${operation} ${operand2} in ${base}`);

  if (!baseMap[base]) {
    return res.status(400).json({ success: false, error: 'Invalid base type.' });
  }

  const num1 = parseInt(operand1, baseMap[base]);
  const num2 = parseInt(operand2, baseMap[base]);

  console.log(`Parsed operands: ${num1}, ${num2}`);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ success: false, error: 'Operands are invalid for the selected base.' });
  }

  let result;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        return res.status(400).json({ success: false, error: 'Division by zero is not allowed' });
      }
      result = num1 / num2;
      break;
    default:
      return res.status(400).json({ success: false, error: 'Invalid operation type' });
  }

  const resultStr = result.toString(baseMap[base]).toUpperCase();
  console.log(`Calculation result: ${resultStr}`);

  db.run(`
    INSERT INTO Calculations (operand1, operand2, operationType, base, result)
    VALUES (?, ?, ?, ?, ?)
  `, [operand1, operand2, operation, base, resultStr]);

  res.json({ success: true, result: resultStr });
});

module.exports = router;
