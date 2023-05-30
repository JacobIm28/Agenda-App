let users = [];
let messages = [];
let tasks = [];

const addTask = (task) => {
  tasks.push(task);
  return task;
};

const removeTask = (task) => {
  tasks = tasks.filter((x) => x.title !== task.title);
  return task;
};

const updateTask = (update, task) => {
  console.log("task to update: ", task);
  const index = tasks.findIndex((el) => el.title === task.title);
  console.log(index);
  tasks[index] = update;
  console.log("tasks", tasks);
  return tasks;
};

const getTasks = () => {
  return tasks;
};

const addUser = (user) => {
  users.push(user);
  console.log("users being stored: ", users);
  return user;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  return users.splice(index, 1)[0];
};

const reset = () => {
  users = [];
  messages = [];
};

const getUsers = () => {
  return users;
};

const getMessages = () => {
  return messages;
};

const addMessage = (message) => {
  messages.push(message);
  return messages;
};

const removeMessage = (message) => {
  messages.splice(messages.indexOf(message), 1);
};

export default {
  addTask,
  removeTask,
  updateTask,
  getTasks,
  addUser,
  removeUser,
  getUsers,
  getMessages,
  addMessage,
  removeMessage
};
