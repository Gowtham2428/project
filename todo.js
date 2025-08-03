const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const startTimeInput = document.getElementById('startTimeInput');
const endTimeInput = document.getElementById('endTimeInput');
const tableBody = document.getElementById('todoTableBody');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const task = taskInput.value.trim();
  const start = startTimeInput.value;
  const end = endTimeInput.value;
  if (!task || !start || !end) return;

  // Get current datetime for the entry
  const now = new Date();
  const entryDate = now.toLocaleDateString();
  const entryTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tr = document.createElement('tr');

  // Task column
  const tdTask = document.createElement('td');
  tdTask.textContent = task;
  tr.appendChild(tdTask);

  // Start column
  const tdStart = document.createElement('td');
  tdStart.textContent = formatDateTime(start);
  tr.appendChild(tdStart);

  // End column
  const tdEnd = document.createElement('td');
  tdEnd.textContent = formatDateTime(end);
  tr.appendChild(tdEnd);

  // Entry column
  const tdEntry = document.createElement('td');
  tdEntry.textContent = `${entryDate} ${entryTime}`;
  tr.appendChild(tdEntry);

  // Status column with dropdown
  const tdStatus = document.createElement('td');
  const select = document.createElement('select');
  select.className = 'status-select status-inprogress';

  const options = [
    { val: 'inprogress', label: 'In Progress' },
    { val: 'completed', label: 'Completed' },
    { val: 'ignored',   label: 'Ignored' }
  ];
  options.forEach(opt => {
    const o = document.createElement('option');
    o.value = opt.val;
    o.textContent = opt.label;
    select.appendChild(o);
  });

  // Default as inprogress
  select.value = 'inprogress';
  updateStatusClass(select);

  select.addEventListener('change', function() {
    updateStatusClass(select);
  });

  tdStatus.appendChild(select);
  tr.appendChild(tdStatus);

  // Delete column
  const tdDelete = document.createElement('td');
  const delBtn = document.createElement('button');
  delBtn.innerHTML = '&#128465;';
  delBtn.className = 'delete-btn';
  delBtn.title = "Delete";
  delBtn.onclick = () => tableBody.removeChild(tr);
  tdDelete.appendChild(delBtn);
  tr.appendChild(tdDelete);

  tableBody.appendChild(tr);

  form.reset();
  taskInput.focus();
});

function formatDateTime(dtString) {
  if (!dtString) return '';
  const dt = new Date(dtString);
  return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

function updateStatusClass(select) {
  select.classList.remove('status-completed', 'status-inprogress', 'status-ignored');
  if (select.value === 'completed') select.classList.add('status-completed');
  else if (select.value === 'ignored') select.classList.add('status-ignored');
  else select.classList.add('status-inprogress');
}
