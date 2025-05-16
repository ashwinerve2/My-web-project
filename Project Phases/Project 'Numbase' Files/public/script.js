document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('inputValue');
  const sourceSelect = document.getElementById('sourceBase');
  const targetSelect = document.getElementById('targetBase');

  const operand1Field = document.getElementById('operand1');
  const operand2Field = document.getElementById('operand2');
  const operationSelect = document.getElementById('operation');
  const baseSelect = document.getElementById('base');

  // Debounced versions
  const debouncedConvert = debounce(handleConvert, 400);
  const debouncedCalculate = debounce(handleCalculate, 400);

  inputField.addEventListener('input', debouncedConvert);
  sourceSelect.addEventListener('change', handleConvert);
  targetSelect.addEventListener('change', handleConvert);

  operand1Field.addEventListener('input', debouncedCalculate);
  operand2Field.addEventListener('input', debouncedCalculate);
  operationSelect.addEventListener('change', handleCalculate);
  baseSelect.addEventListener('change', handleCalculate);

  document.getElementById('copyConverterResult').addEventListener('click', copyToClipboard);
  document.getElementById('copyCalculatorResult').addEventListener('click', copyToClipboard);
});

// Debounce function
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Validators
const validators = {
  binary: /^[01]+$/,
  decimal: /^\d+$/,
  hex: /^[0-9A-Fa-f]+$/,
  octal: /^[0-7]+$/
};

// Handle Conversion
async function handleConvert() {
  const inputValue = document.getElementById('inputValue').value.trim();
  const sourceBase = document.getElementById('sourceBase').value;
  const targetBase = document.getElementById('targetBase').value;
  const resultText = document.getElementById('converterResultText');
  const copyButton = document.getElementById('copyConverterResult');

  if (!inputValue) {
    resultText.textContent = '- Please enter a number -';
    copyButton.style.display = 'none';
    return;
  }

  if (!validators[sourceBase].test(inputValue)) {
    resultText.textContent = `- Please enter a valid ${sourceBase} number -`;
    copyButton.style.display = 'none';
    return;
  }

  copyButton.style.display = 'none';

  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputValue, sourceBase, targetBase })
    });

    const data = await response.json();

    if (data.success) {
      const finalResult = `=  ${targetBase === 'hex' ? data.result.toUpperCase() : data.result}`;
      if (resultText.textContent !== finalResult) {
        resultText.textContent = finalResult;
      }

      copyButton.style.display = 'inline-block';
      copyButton.setAttribute('data-result', data.result);
    } else {
      resultText.textContent = `Error: ${data.error}`;
      copyButton.style.display = 'none';
    }
  } catch (err) {
    resultText.textContent = '- Network error, please try again later -';
    copyButton.style.display = 'none';
  }
}

// Handle Calculation
async function handleCalculate() {
  const operand1 = document.getElementById('operand1').value.trim();
  const operand2 = document.getElementById('operand2').value.trim();
  const operation = document.getElementById('operation').value;
  const base = document.getElementById('base').value;
  const resultText = document.getElementById('calculatorResultText');
  const copyButton = document.getElementById('copyCalculatorResult');

  if (!operand1 || !operand2) {
    resultText.textContent = '- Please enter both operands -';
    copyButton.style.display = 'none';
    return;
  }

  if (!validators[base].test(operand1) || !validators[base].test(operand2)) {
    resultText.textContent = `- Please enter a valid ${base} number -`;
    copyButton.style.display = 'none';
    return;
  }

  copyButton.style.display = 'none';

  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operand1, operand2, operation, base })
    });

    const data = await response.json();

    if (data.success) {
      const finalResult = `=  ${base === 'hex' ? data.result.toUpperCase() : data.result}`;
      if (resultText.textContent !== finalResult) {
        resultText.textContent = finalResult;
      }

      copyButton.style.display = 'inline-block';
      copyButton.setAttribute('data-result', data.result);
    } else {
      resultText.textContent = `Error: ${data.error}`;
      copyButton.style.display = 'none';
    }
  } catch (err) {
    resultText.textContent = '- Network error, please try again later -';
    copyButton.style.display = 'none';
  }
}

// Clipboard copy
function copyToClipboard(event) {
  const button = event.target;
  const resultText = button.getAttribute('data-result');

  if (resultText) {
    navigator.clipboard.writeText(resultText)
      .then(() => {
        button.classList.add('copied');
        button.innerText = '✓ Copied';
        setTimeout(() => {
          button.classList.remove('copied');
          button.innerText = 'Copy'; // Restore original text
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  }
}
