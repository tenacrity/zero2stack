const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasks');

async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const text = await response.text(); // Temporarily parse as plain text
        console.log('Raw response:', text); // Log to inspect error details
        const tasks = JSON.parse(text); // Then try parsing as JSON
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
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
