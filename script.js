let tasks = [];

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');
const counterText = document.getElementById('counter');

function updateCounter() {
  const undoneTasks = tasks.filter(task => !task.done).length;
  counterText.innerHTML = 'Tasks remaining: <span id="remainingCount">' + undoneTasks + '</span>';
}

addBtn.addEventListener('click', function() {
  const textValue = taskInput.value.trim();
  
  errorMsg.textContent = '';

  if (textValue === '') {
    errorMsg.textContent = 'Please type a task first';
    return;
  }

  const taskObject = { text: textValue, done: false };
  tasks.push(taskObject);

  const li = document.createElement('li');
  li.className = 'task-item';

  const textSpan = document.createElement('span');
  textSpan.className = 'task-text';
  textSpan.textContent = textValue;

  const doneBtn = document.createElement('button');
  doneBtn.textContent = 'Done';
  doneBtn.className = 'done-btn';

  doneBtn.addEventListener('click', function() {
    taskObject.done = !taskObject.done;
    if (taskObject.done) {
      li.className = 'task-item done';
      doneBtn.textContent = 'Undone';
    } else {
      li.className = 'task-item';
      doneBtn.textContent = 'Done';
    }
    updateCounter();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  deleteBtn.addEventListener('click', function() {
    const index = tasks.indexOf(taskObject);
    if (index > -1) {
      tasks.splice(index, 1);
    }
    li.remove();
    updateCounter();
  });

  li.appendChild(textSpan);
  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  updateCounter();
});