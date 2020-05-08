export function fetchTodos() {
  return fetch("http://localhost:2337/todos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  
}

export function addTodo(data) {
  return fetch("http://localhost:2337/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .catch(error => {
    console.error(error);
    return null;
  });
}

export function updateTodoStatus(data, id) {
  return fetch(`http://localhost:2337/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .catch(error => {
    console.error(error);
    return null;
  });
}
