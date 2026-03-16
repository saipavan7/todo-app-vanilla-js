import { fetchTodos , renderTodos , addTodo , toggleTodo, deleteTodo , getFilteredTodos, updateTodoText} from "./functions.js";

const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const todoInput  = document.querySelector('#todo-input');
const filter = document.querySelector('#filters');
const todoCount =document.querySelector('#todo-count');

let currentFilter = 'all';

let todos = fetchTodos();
console.log(todos);

refreshTodos(todos);

function updateTodoCount(){
    const remaining = todos.filter(todo=> !todo.completed).length;
    todoCount.textContent = `${remaining} items left`;
}

function refreshTodos(todos){
    renderTodos(getFilteredTodos(todos , currentFilter));

    todoInput.value = '';
    updateTodoCount();
}

todoForm.addEventListener('submit' , (e)=>{

    e.preventDefault();

    const text = todoInput.value.trim();
    console.log(text);
    if(!text) return;
   todos =  addTodo(text , todos);

   console.log(todos);

  refreshTodos(todos);

})

function startEditMode(li){
    const inputBox = document.createElement("input");
    const span = li.querySelector(".todo-text");
    const text = span.textContent.trim();
    inputBox.value = text;
    console.log(inputBox);
    span.replaceWith(inputBox);
    inputBox.focus();

    inputBox.addEventListener('keydown' , (e)=>{
        const id  = Number(li.dataset.id);
        todos = updateTodoText(inputBox.value , id , todos);
        refreshTodos(todos);
    })
    // todos = updateTodoText(inputBox.value , id , todos);
    // refreshTodos(todos);
}

todoList.addEventListener('click' , handleTodoClick);

function handleTodoClick(e){

    const li = e.target.closest('li');

    if(!li) return;
    const id  = Number(li.dataset.id);

    console.log(e.target.type);

    if(e.target.type==="checkbox"){
       todos =  toggleTodo(id, todos);
        refreshTodos(todos);

    }
    console.log(e.target.classList);

    if(e.target.classList.contains("edit-button")){
       startEditMode(li);
    }
    if(e.target.classList.contains("delete-button")){
      todos =  deleteTodo(id , todos);
      refreshTodos(todos);
    }


}

filter.addEventListener('click' , (e)=>{
    const button = e.target.closest('button');

    if(!button) return;

    const filterVal = button.dataset.filter;

    renderTodos(getFilteredTodos(todos , filterVal));

    document.querySelectorAll("#filters button").forEach(btn => {
  btn.classList.remove("active-filter");
});

    button.classList.add('active-filter');
})




