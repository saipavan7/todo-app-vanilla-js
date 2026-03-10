import { fetchTodos , renderTodos , addTodo , toggleTodo, deleteTodo , getFilteredTodos} from "./functions.js";

const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const todoInput  = document.querySelector('#todo-input');
const filter = document.querySelector('#filters');

let currentFilter = 'all';

let todos = getFilteredTodos(currentFilter);

renderTodos(todos);

function refreshTodos(){
 const updatedTodos = fetchTodos();
 console.log(updatedTodos);
    renderTodos(updatedTodos);
    todos = updatedTodos;

    todoInput.value = '';
}

todoForm.addEventListener('submit' , (e)=>{

    e.preventDefault();

    const text = todoInput.value.trim();
    if(!text) return;
    addTodo(text);

  refreshTodos();

})

todoList.addEventListener('click' , handleTodoClick);

function handleTodoClick(e){

    const li = e.target.closest('li');

    if(!li) return;
    const id  = Number(li.dataset.id);

    console.log(e.target.type);

    if(e.target.type==="checkbox"){
        toggleTodo(id, todos);
        refreshTodos();

    }

    if(e.target.tagName==="BUTTON"){
        deleteTodo(id, todos);
        refreshTodos();
    }


}

filter.addEventListener('click' , (e)=>{
    const button = e.target.closest('button');

    if(!button) return;

    const filterVal = button.dataset.filter;

    renderTodos(getFilteredTodos(filterVal));

    document.querySelectorAll("#filters button").forEach(btn => {
  btn.classList.remove("active-filter");
});

    button.classList.add('active-filter');
})




