import { fetchTodos , renderTodos , addTodo} from "./functions.js";

const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const todoInput  = document.querySelector('#todo-input');


let todos = fetchTodos();

renderTodos(todos);

todoForm.addEventListener('submit' , (e)=>{

    e.preventDefault();

    const text = todoInput.value.trim();
    if(!text) return;
    addTodo(text);

   const updatedTodos = fetchTodos();
    renderTodos(updatedTodos);
    todos = updatedTodos;

    todoInput.value = '';

})

todoList.addEventListener('click' , handleTodoClick);

function handleTodoClick(e){

    const li = e.target.closest('li');

    if(!li) return;
    

}



