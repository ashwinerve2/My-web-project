document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.querySelector('#historyTable tbody');

  try {
    const response = await fetch('/api/history');
    const data = await response.json();

    if (!data.history || data.history.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6">No history available</td></tr>';
      return;
    }

    data.history.forEach(entry => {
      const row = document.createElement('tr');

      let inputOrOperands, operation, base;

      if (entry.type === 'conversion') {
        inputOrOperands = entry.input;
        operation = `${entry.sourceBase} ➜ ${entry.targetBase}`;
        base = '-';
      } else if (entry.type === 'calculation') {
        inputOrOperands = `${entry.operand1} ${entry.operation} ${entry.operand2}`;
        operation = entry.operation;
        base = entry.base;
      }

      row.innerHTML = `
        <td>${entry.type}</td>
        <td>${inputOrOperands}</td>
        <td>${operation}</td>
        <td>${base}</td>
        <td>${entry.result}</td>
        <td>${entry.timestamp}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading history:', error);
    tableBody.innerHTML = '<tr><td colspan="6">Failed to load history.</td></tr>';
  }

  // Moved out of the try block to ensure it's always attached
  const clearBtn = document.getElementById('clearHistoryButton');
  if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to clear history?')) return;

      try {
        const response = await fetch('/api/clear-history', { method: 'DELETE' });
        const result = await response.json();

        if (result.success) {
          tableBody.innerHTML = '<tr><td colspan="6">History cleared</td></tr>';
        } else {
          alert('Failed to clear history.');
        }
      } catch (error) {
        alert('Error clearing history.');
      }
    });
  }
});
