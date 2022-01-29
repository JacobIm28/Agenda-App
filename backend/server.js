import express from 'express'
import path from 'path'
import http from 'http'
import { Server, Socket } from 'socket.io'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import utils from './utils/db.js'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../src/index.js')

app.use(express.static(publicDirectoryPath))
app.use(cors())

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('join', ({ username }) => {
    console.log('joining')
    const user = utils.addUser(username)

    const m = utils.addMessage({
      username: 'Admin',
      time: new Date(),
      text: `Welcome ${username}!`,
    })
    const userList = utils.getUsers()
    const taskList = utils.getTasks()
    const messageList = utils.getMessages()

    io.emit('users', { users: userList })
    io.emit('tasks', { tasks: taskList })
    io.emit('messages', { messages: messageList })
  })

  socket.on('message', ({ username, message }) => {
    const updatedMessages = utils.addMessage({
      username,
      text: message,
    })

    io.emit('messages', { messages: updatedMessages })
  })

  socket.on('task', (task) => {
    utils.addTask(task)

    const taskList = utils.getTasks()

    io.emit('tasks', { tasks: taskList })
  })

  socket.on('users', () => {
    const users = utils.getUsers()
    socket.emit('users', { users })
  })

  socket.on('addevent', (event) => {
    const task = utils.addTask(event)
    const events = utils.getTasks()

    io.emit('tasks', { tasks: events })
  })

  socket.on('deleteTask', (task) => {
    const deletedTask = utils.removeTask(task)
    console.log('deleted the task', deletedTask)

    const updatedTasks = utils.getTasks()
    io.emit('tasks', { tasks: updatedTasks })
  })

  socket.on('update', ({ update, editedTask }) => {
    const tasks = utils.updateTask(update, editedTask)
    io.emit('tasks', { tasks })
  })

  socket.on('disconnect', ({ username }) => {
    const userList = utils.removeUser(username)
    const messageList = utils.addMessage({
      username: 'Admin',
      time: new Date(),
      text: `${username} has left the chat.`,
    })

    io.emit('users', { users: userList })
    io.emit('messages', { messages: messageList })
  })
})

server.listen(port, () => {
  console.log('server is up on port ' + port)
})
