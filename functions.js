
const addTodoBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');



export const fetchTodos =()=>{
 const todos =    localStorage.getItem('todos');
 return JSON.parse(todos || []);
}

export const renderTodos = (todos)=>{
    todoList.innerHTML='';
    todos.forEach(todo => {
    const li = document.createElement('li');

    li.dataset.id = todo.id;
    
    li.innerHTML = `<input type="checkbox" ${todo.completed?'checked':''}/>
                    <span> ${todo.text} </span>
                    <button> X </button>`

        todoList.appendChild(li);

});
}

export function getFilteredTodos(filterVal){
    const todos = fetchTodos();
    if (filterVal == "active"){
        return todos.filter(todo=> !todo.completed);
    }
    if(filterVal == "completed"){
        return todos.filter(todo=> todo.completed);
    }
    return todos;
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

export function toggleTodo(id, todos){
    todos = todos.map(todo=> todo.id===id?{...todo , completed:!todo.completed}
    :todo
        )

    saveTodos(todos);
}

export function deleteTodo(id, todos){

    todos = todos.filter(todo=> todo.id!==id)

    saveTodos(todos);

}

