// Define UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all event listeners
loadEventListeners()

// Function to load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask)
        // Remove task event
    taskList.addEventListener('click', removeTask)
        // clear task event
    clearBtn.addEventListener('click', clearTasks)
        // filter tasks event
    filter.addEventListener('keyup', filterTasks)

}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add a task')
    }

    // create li element
    const li = document.createElement('li')
        // add class
    li.className = 'collection-item'
        // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
        // create new link element
    const link = document.createElement('a')
        // add class
    link.className = 'delete-item secondary-content'
        // add icon html
    link.innerHTML = '<i class="fa fa-remove"></li>'
        // append link to li
    li.appendChild(link)
        // append li to ul
    taskList.appendChild(li)
        // Store task in local storage
    storeTaskInLocalStorage(taskInput.value)


    // clear input
    taskInput.value = ''

    e.preventDefault()
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure you want to delete?')) {
            e.target.parentElement.parentElement.remove()
        }
    }
}

// Clear tasks
function clearTasks() {
    // taskList.innerHTML = ''

    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    // REFERENCE LINK : https://jsperf.com/innerhtml-vs-removechild/47
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'
            } else {
                task.style.display = 'none'
            }

        }
    )

}