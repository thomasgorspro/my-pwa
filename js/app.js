import page from "page";
import { setTodos, setTodo, getTodos } from "./idb.js";
import { fetchTodos, addTodo, updateTodoStatus } from './api/todo';
import checkConnectivity from './network.js';

checkConnectivity({});
document.addEventListener('connection-changed', e => {
  document.offline = !e.detail;
  if (e.detail) {
    console.log('Back Online');
  } else {
    console.log('Connection too slow');
  }
});

const app = document.querySelector("#app .outlet");

page("/", async () => {
  const module = await import("./views/Home.js");
  const Home = module.default;

  let todos = [];
  if (!document.offline) {
    const data = await fetchTodos();
    todos = await setTodos(data);
  } else {
    todos = await getTodos();
  }

  const el = Home(app, todos);
  el.addEventListener('add-todo', async ({ detail }) => {
    if (!document.offline) {
      const result = await addTodo(detail);
      if(result !== null) {
        await setTodo(detail);
      }
    } else {
      detail.synced = true;
      await setTodo(detail);
      console.log('[todo] Todo created offline');
    }
  });

  el.addEventListener('check-todo', async ({ detail }) => {
    // console.log(detail);
    // console.log(id);
  //   if (!document.offline) {
      const result = await updateTodoStatus({done: detail.done}, detail.id);
  //     if(result !== null) {
  //       await setTodo(detail);
  //     }
  //   } else {
  //     detail.synced = true;
  //     await setTodo(detail);
  //     console.log('[todo] Todo updated offline');
  //   }
  });
});

page();
