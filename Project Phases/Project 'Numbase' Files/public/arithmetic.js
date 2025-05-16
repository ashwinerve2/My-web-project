document.addEventListener('DOMContentLoaded', () => {
  const operand1Field = document.getElementById('operand1');
  const operand2Field = document.getElementById('operand2');
  const operationSelect = document.getElementById('operation');
  const baseSelect = document.getElementById('base');
  const resultArea = document.getElementById('resultArea');

  operand1Field.addEventListener('input', handleCalculate);
  operand2Field.addEventListener('input', handleCalculate);
  operationSelect.addEventListener('change', handleCalculate);
  baseSelect.addEventListener('change', handleCalculate);
});

async function handleCalculate() {
  const operand1 = document.getElementById('operand1').value.trim();
  const operand2 = document.getElementById('operand2').value.trim();
  const operation = document.getElementById('operation').value;
  const base = document.getElementById('base').value;
  const resultArea = document.getElementById('resultArea');

  if (!operand1 || !operand2) {
    resultArea.textContent = 'Please enter both operands.';
    return;
  }

  const validators = {
    binary: /^[01]+$/,
    decimal: /^\d+$/,
    hex: /^[0-9A-Fa-f]+$/,
    octal: /^[0-7]+$/
  };

  if (!validators[base].test(operand1)) {
    resultArea.textContent = 'Operand 1 contains invalid characters for the selected base.';
    return;
  }

  if (!validators[base].test(operand2)) {
    resultArea.textContent = 'Operand 2 contains invalid characters for the selected base.';
    return;
  }

  resultArea.textContent = 'Loading...';

  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operand1, operand2, operation, base })
    });

    const data = await response.json();

    if (data.success) {
      resultArea.textContent = `Result: ${data.result}`;
    } else {
      resultArea.textContent = `Error: ${data.error}`;
    }
  } catch (err) {
    resultArea.textContent = 'Network error, please try again later.';
  }
}
