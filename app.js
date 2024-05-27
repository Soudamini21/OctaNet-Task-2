let taskCounter = 0;

document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const categoryInput = document.getElementById('category');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    taskCounter++;

    const taskText = taskInput.value.trim();
    const taskDueDate = dueDateInput.value;
    const taskPriority = priorityInput.value;
    const taskCategory = categoryInput.value;

    const taskList = document.getElementById('task-list');
    const listItem = document.createElement('li');
    listItem.className = taskPriority;

    listItem.innerHTML = `
        <span>
            Task-${taskCounter}: ${taskText} (${taskCategory}) - ${taskDueDate} [${taskPriority}]
        </span>
        <div>
            <button onclick="toggleComplete(this)">Complete</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(listItem);

    // Clear input fields after adding the task
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'low';
    categoryInput.value = 'work';
}

function toggleComplete(button) {
    const taskItem = button.parentNode.parentNode;
    taskItem.classList.toggle('complete');

    if (taskItem.classList.contains('complete')) {
        setTimeout(() => {
            deleteTask(button);
        }, 3000); // 3000 milliseconds = 3 seconds
    }
}

function deleteTask(button) {
    const taskItem = button.parentNode.parentNode;
    taskItem.remove();
    updateTaskNumbers();
}

function updateTaskNumbers() {
    taskCounter = 0;
    const taskListItems = document.querySelectorAll('#task-list li');
    taskListItems.forEach((item) => {
        taskCounter++;
        const taskDetails = item.querySelector('span');
        const taskText = taskDetails.textContent.replace(/Task-\d+:/, `Task-${taskCounter}:`);
        taskDetails.textContent = taskText;
    });
}
