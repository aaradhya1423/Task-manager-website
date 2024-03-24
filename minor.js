document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterCompleted = document.getElementById('filterCompleted');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        if (!filterCompleted.checked || task.completed) {
          const li = document.createElement('li');
          li.textContent = `${task.text} - Deadline: ${task.deadline || 'Not set'}`;
          if (task.completed) {
            li.classList.add('completed');
          }
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.classList.add('delete-btn');
          deleteBtn.addEventListener('click', () => deleteTask(index));
          li.appendChild(deleteBtn);
          li.addEventListener('click', () => toggleTask(index));
          taskList.appendChild(li);
        }
      });
    };
  
    const addTask = () => {
      const taskText = taskInput.value.trim();
      const taskDeadline = deadlineInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, deadline: taskDeadline, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        deadlineInput.value = '';
        renderTasks();
      }
    };
  
    const toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    };
  
    addTaskBtn.addEventListener('click', addTask);
    filterCompleted.addEventListener('change', renderTasks);
  
    renderTasks();
  });
  