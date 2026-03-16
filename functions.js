
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
                    <span class ="todo-text"> ${todo.text} </span>
                    <button class="edit-button">Edit</button> 
                    <button class = "delete-button"> X </button>`

        todoList.appendChild(li);

});
}

export function getFilteredTodos(todos , filterVal){
    console.log('getFilterTodos', todos);

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


export const addTodo = (text , todos)=>{
    const newTodo = {
        id:Date.now(),
        text,
        completed:false
    };

    console.log('old todos', todos);
    console.log('newTodo', newTodo);
     todos.push(newTodo);

    saveTodos(todos);

    return todos;

}

export function toggleTodo(id, todos){
    todos = todos.map(todo=> todo.id===id?{...todo , completed:!todo.completed}
    :todo
        )

    saveTodos(todos);
    return todos;
}

export function deleteTodo(id, todos){

    todos = todos.filter(todo=> todo.id!==id)

    saveTodos(todos);

    return todos;

}

export function updateTodoText(updatedText, id ,todos){

    todos = todos.map(todo=>{
        if(todo.id===id){
            console.log(todo);
            console.log(id);
        todo.text = updatedText;}
        return todo
        })

        console.log(todos);

    saveTodos(todos);

    return todos;
}

