let tasks = [];
document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const errorMsg = document.getElementById('errorMsg');
  const counterText = document.getElementById('counter');
  const clearBtn = document.getElementById('clearBtn');
  const allDoneMsg = document.getElementById('allDoneMsg');
  const colorCircles =document.querySelectorAll(".color-circle");
  // loadTasks();
//   let savedTasks = localStorage.getItem("tasks");

//   if (savedTasks) {
//      tasks = JSON.parse(savedTasks);
// }
   if (allDoneMsg) {
         allDoneMsg.style.display = 'none';
 }
  

  function updateCounter() {
    const undoneTasks = tasks.filter(task => !task.done).length;
    let completed = tasks.filter(function(task){
        return task.done == true;}).length;
    counterText.innerHTML = 'Tasks remaining: <span id="remainingCount">' + undoneTasks + '</span> <br>'+
    completed + " of " + tasks.length + " tasks completed";
    if (tasks.length > 0 && undoneTasks== 0) {
        counter.textContent = "🎉 All tasks done! Great job!";
        counter.classList.add("all-done-msg");
        counter.classList.add("visible");
    }

  }

  addBtn.addEventListener('click', function() {
    const textValue = taskInput.value.trim();
    errorMsg.textContent = '';
    if (textValue === '') {
      errorMsg.textContent = 'Please type a task first';
      return;
    }
  let taskNames=[];
    
  for (let i = 0; i < tasks.length; i++) {
        taskNames.push(tasks[i].text.toLowerCase());
    }

    if (taskNames.includes(textValue .toLowerCase())) {
        errorMsg.textContent = "This task already exists!";
        return;
    }


    const taskObject = { text: textValue, done: false };
    tasks.push(taskObject);
    // saveTasks();
    // localStorage.setItem("tasks", JSON.stringify(tasks));

    const li = document.createElement('li');
    li.className = 'task-item';
    //localStorage.setItem("tasks", JSON.stringify(tasks));

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = textValue;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.className = 'done-btn';

    doneBtn.addEventListener('click', function() {
      taskObject.done = !taskObject.done;
      if (taskObject.done) {
        li.classList.add('done');
        doneBtn.textContent = 'Undone';
      } else {
        li.classList.remove('done');
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


  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = []; 
        taskList.innerHTML = ''; 
        updateCounter(); 
      }
    });
  }
  colorCircles.forEach(circle => {
    circle.addEventListener('click', function(){
      colorCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');
      document.body.style.backgroundColor = circle.dataset.color;
    });
  });

  updateCounter();

// function saveTasks(){
//     let tasks = [];
//     taskList.querySelectorAll('li').forEach(function(item){
//         const textSpan = item.querySelector('.task-text');
        
//         if (textSpan) {
//             tasks.push({
//                 text:textSpan.textContent.trim(),
//                 done:item.classList.contains('done')
//             })
            
//         }
    

//     });
//     localStorage.setItem('tasks',JSON.stringify(tasks));
//  }
// function loadTasks(){
//     taskList.innerHTML ='';
//     const tasks= JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks.forEach(createTaskElement);
//     }


});