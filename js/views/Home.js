import { generateUUID } from '../utils/utils';

export default function Home(page, data) {
  page.innerHTML = "";
  const constructor = document.createElement('div');
  constructor.innerHTML = `
    <section class="h-full w-full flex items-center justify-center font-sans" id="Home">
	    <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="font-bold text-3xl text-gray-900">Todo List</h1>
            <form class="flex mt-4" id="addTodo">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-darker" placeholder="Add Todo">
                <button class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">Add</button>
            </form>
        </div>
      <section id="todo-list"></section>
      </div>
    </section>
  `;

  const view = constructor
    .querySelector('#Home')
    .cloneNode(true);

  const form = view.querySelector('#addTodo');
  const input = form.querySelector('input');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '') return console.warn('[todo] Value is required !!!');
    const todo = {
      id: generateUUID(),
      title: input.value,
      synced: true,
      updated: false,
      done: false,
      date: Date.now()
    };
    const event = new CustomEvent('add-todo', { detail: todo });
    view.dispatchEvent(event);

    // Clean input
    input.value = '';
  });
    
  page.appendChild(view);

  const constructorTodoItems = document.createElement('div');
  constructorTodoItems.innerHTML = `
    <div class="flex mb-4 items-center todo-item">
        <p class="w-full text-gray-900"></p>
        <button class="done-btn flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white"></button>
        <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600">Remove</button>
    </div>
  `;

  const todoSelector = document.querySelector('#todo-list');
    const todos = data.map(item => {
      const todoItem = constructorTodoItems
        .querySelector('.todo-item')
        .cloneNode(true);
  
      const title = todoItem.querySelector('p');
      title.innerHTML = item.title;
  
      const doneBtn = todoItem.querySelector('.done-btn');
  
      if (item.done) {
        title.classList.add("text-green-500", "line-through");
        doneBtn.innerHTML = "Not Done";
        doneBtn.classList.add("text-green-500", "border-green-500", "hover:bg-green-500");
      } else {
        title.classList.add("text-gray-900");
        doneBtn.innerHTML = "Done";
        doneBtn.classList.add("text-gray-600", "border-gray-600", "hover:bg-gray-600");
      }
      todoSelector.appendChild(todoItem);
      return todoItem;
    })
  
  return view;
}
