let EliminarAudio = new Audio("./mario-bros-jump.mp3")
let IgualAudio = new Audio("./mario-coin.mp3")


var addButton = document.getElementById('button2');

var taskContainer = document.getElementById('section2');

var storedTasks = localStorage.getItem('tasks');
var tasks = storedTasks ? JSON.parse(storedTasks) : [];

var taskForm;

var navigationInput = document.getElementById('navigation');

function showTaskForm() {
  if (taskForm) {
    return;
  }

  var form = document.createElement('form');

  var titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Título de la tarea';
  form.appendChild(titleInput);

  var saveButton = document.createElement('button');
  saveButton.type = 'submit';
  saveButton.textContent = 'Guardar';
  form.appendChild(saveButton);

  var cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancelar';
  cancelButton.classList.add('cancel-button');
  form.appendChild(cancelButton);

  form.classList.add('task-form');

  setTimeout(function() {
    form.classList.add('visible');
  }, 0);

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var title = titleInput.value;

    if (title !== '') {
      var task = {
        title: title,
        completed: false
      };
      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));

      titleInput.value = '';
      renderTasks();

      form.classList.remove('visible');

      setTimeout(function() {
        taskContainer.removeChild(form);
        taskForm = null;
      }, 300); 
      
    }
  });

  cancelButton.addEventListener('click', function() {
    titleInput.value = '';

    form.classList.remove('visible');

    setTimeout(function() {
      taskContainer.removeChild(form);
      taskForm = null;
    }, 300); 
  });

  taskForm = form;

  taskContainer.appendChild(form);
}

function deleteTask(index) {
  tasks.splice(index, 1);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
}

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;

  localStorage.setItem('tasks', JSON.stringify(tasks));

 
  renderTasks();
}

function filterTasks() {
  var navigationValue = navigationInput.value.toLowerCase();

  var filteredTasks = tasks.filter(function(task) {
    return task.title.toLowerCase().includes(navigationValue);
  });

  renderTasks(filteredTasks);
}

function renderTasks(filteredTasks) {
  var taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  var tasksToRender = filteredTasks || tasks;

  tasksToRender.forEach(function(task, index) {
    var taskItem = document.createElement('li');

    var taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item'); 

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      completeTask(index);
      IgualAudio.play();
    });
    taskDiv.appendChild(checkbox);
    


    var titlePara = document.createElement('p');
    titlePara.textContent = task.title;
    taskDiv.appendChild(titlePara);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
      taskItem.classList.add('delete-animation');

      setTimeout(function() {
        deleteTask(index);
        EliminarAudio.play();
      }, 500); 
    });
    taskDiv.appendChild(deleteButton);

    taskItem.appendChild(taskDiv);

    taskList.appendChild(taskItem);
  });
}

addButton.addEventListener('click', showTaskForm);

navigationInput.addEventListener('input', filterTasks);

renderTasks();
