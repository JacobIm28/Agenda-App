const users = []
const messages = []
const tasks = [{
  title: "Introduction",
  time: '30 min',
  description: 'Come join for a quick introduction'
}, {
  title: "Icebreaker",
  time: '1 hour',
  description: 'Play some icebreaker games'
}, {
  title: 'Meeting 1',
  time: '2 hours',
  description: 'Go over project design'
}, {
  title: "Introduction",
  time: '30 min',
  description: 'Come join for a quick introduction'
}, {
  title: "Icebreaker",
  time: '1 hour',
  description: 'Play some icebreaker games'
}, {
  title: 'Meeting 1',
  time: '2 hours',
  description: 'Go over project design'
}, {
  title: "Introduction",
  time: '30 min',
  description: 'Come join for a quick introduction'
}, {
  title: "Icebreaker",
  time: '1 hour',
  description: 'Play some icebreaker games'
}, {
  title: 'Meeting 1',
  time: '2 hours',
  description: 'Go over project design'
}]

const addTask = (task) => {
  tasks.push(task)
  return task
}

const removeTask = (task) => {
  tasks.splice(tasks.indexOf(task), 1)
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
}

const removeMessage = (message) => {
  messages.splice(messages.indexOf(message), 1)
}

export default {
  addTask,
  removeTask,
  getTasks,
  addUser,
  removeUser,
  getUsers,
  getMessages,
  addMessage,
  removeMessage
}