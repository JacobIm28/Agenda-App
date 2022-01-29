const users = []
const messages = [{
  username: 'test',
  time: new Date(),
  text: 'TEsting 123'
},{
  username: 'Jacob',
  time: new Date(),
  text: 'Yo What\'s up'
}]
let tasks = [{
  title: "Introduction",
  time:"20 min",
  description: "Intro for the meeting"
}]

const addTask = (task) => {
  tasks.push(task)
  return task
}

const removeTask = (task) => {
  tasks = tasks.filter((x) => x.title !== task.title)
  return task
}

const updateTask = (update, task) => {
  console.log('task to update: ',task)
  const index = tasks.findIndex(el => el.title === task.title)
  console.log(index)
  tasks[index] = update
  console.log('tasks', tasks)
  return tasks 
}

const getTasks = () => {
  return tasks
}

const addUser = (username) => {
  users.push(username)
  console.log('users being stored: ', users)
  return { username }
}

const removeUser = (username) => {
  users.splice(users.indexOf(username), 1)
  return users
}

const reset = () => {
  users = []
  messages = []
}

const getUsers = () => {
  return users
}

const getMessages = () => {
  return messages
}

const addMessage = (message) => {
  messages.push(message)
  return messages
}

const removeMessage = (message) => {
  messages.splice(messages.indexOf(message), 1)
}

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
}