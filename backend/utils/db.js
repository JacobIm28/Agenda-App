const users = []
const messages = []

const addUser = (username) => {
  users.push(username)
  console.log(users, messages)
}

const removeUser = (username) => {
  users.splice(users.indexOf(username), 1)
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
  addUser,
  removeUser,
  getMessages,
  addMessage,
  removeMessage
}