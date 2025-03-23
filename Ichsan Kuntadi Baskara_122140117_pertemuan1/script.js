const domOutput = document.getElementById("todo-output");
const todoInput = document.getElementById("todo-input");
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo.text, todo.completed);
    });
}
function saveTodos() {
    const todos = [];
    domOutput.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
            text: item.querySelector('span').innerText,
            completed: item.classList.contains('line-through')
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
function addTodoToDOM(text, completed = false) {
    const newItem = document.createElement("div");
    newItem.className = `todo-item flex justify-between items-center p-2 mb-2 bg-black p-6 rounded ${completed ? 'line-through' : ''}`;
    newItem.innerHTML = `
        <span>${text}</span>
        <div>
            <button class="complete-btn bg-green-500 text-black px-2 py-1 rounded hover:bg-green-600 mr-2">${completed ? 'Batal' : 'Selesai'}</button>
            <button class="delete-btn bg-red-500 text-black px-2 py-1 rounded hover:bg-red-600">Hapus</button>
        </div>
    `;
    domOutput.appendChild(newItem);

    newItem.querySelector('.complete-btn').addEventListener('click', function () {
        newItem.classList.toggle('line-through');
        this.innerText = newItem.classList.contains('line-through') ? 'Batal' : 'Selesai';
        saveTodos();
    });

    newItem.querySelector('.delete-btn').addEventListener('click', function () {
        domOutput.removeChild(newItem);
        saveTodos();
    });
}

document.getElementById("btn-tambah-item").addEventListener("click", function () {
    const text = todoInput.value.trim();
    if (text !== "") {
        addTodoToDOM(text);
        todoInput.value = "";
        saveTodos();
    }
});
