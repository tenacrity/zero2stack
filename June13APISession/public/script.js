const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');

async function fetchTasks() {
  try {
    const res = await fetch('/tasks');
    const data = await res.json();
    tasksContainer.innerHTML = '';
    data.data.forEach((task) => {
      const div = document.createElement('div');
      div.className = 'task-item';
      div.innerHTML = `
        <span>${task.title}</span>
        <button onclick="deleteTask(${task.id})">❌</button>
      `;
      tasksContainer.appendChild(div);
    });
  } catch (err) {
    console.error('Failed to load tasks:', err);
    tasksContainer.innerHTML = `<p>Failed to load tasks</p>`;
  }
}

// ✅ REPLACE this entire block
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('text');
  const title = input.value.trim();

  if (!title) return;

  // Debug log
  console.log('Sending to backend:', { title });

  try {
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      const errRes = await res.json();
      console.error('Failed to add task:', errRes.error);
      return;
    }

    input.value = '';
    fetchTasks();
  } catch (err) {
    console.error('Error adding task:', err);
  }
});

async function deleteTask(id) {
  try {
    await fetch(`/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

fetchTasks();
