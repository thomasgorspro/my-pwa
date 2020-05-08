import { openDB } from 'idb';

export async function initDB() {
  const db = await openDB('todolist', 1, {
    upgrade(db) {
      const store = db.createObjectStore('todos', {
        keyPath: 'id',
      });
      store.createIndex('synced', 'synced');
      store.createIndex('updated', 'updated');
      store.createIndex('done', 'done');
      store.createIndex('date', 'date');
    },
  });
  return db;
}

export async function setTodos(data) {
  const db = await initDB();
  const tx = db.transaction('todos', 'readwrite');
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return await db.getAll('todos');
}

export async function setTodo(data) {
  const db = await initDB();
  const tx = db.transaction('todos', 'readwrite');
  return await tx.store.put(data);
}

export async function getTodos() {
  const db = await initDB();
  return await db.getAll('todos');
}

export async function removeTodo(key) {
  const db = await initDB();
  return await db.delete('todos', key)
}
