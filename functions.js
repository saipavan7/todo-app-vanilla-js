
const addTodoBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');



export const fetchTodos =()=>{
 const todos =    localStorage.getItem('todos');
 return JSON.parse(todos || []);
}

export const renderTodos = (todos)=>{
    console.log(todos);
    todoList.innerHTML='';
    todos.forEach(todo => {
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    
    li.innerHTML = `<input type="checkbox" ${todo.isCompleted?'checked':''}/>
                    <span> ${todo.text} </span>
                    <button> X </button>`

        todoList.appendChild(li);

});
}

const saveTodos = (todos)=>{
    localStorage.setItem('todos' , JSON.stringify(todos));
}


export const addTodo = (text)=>{
    const newTodo = {
        id:Date.now(),
        text,
        completed:false
    };
    const allTodos = fetchTodos();
    allTodos.push(newTodo);

    saveTodos(allTodos);

}


