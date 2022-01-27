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
    console.log("joining")
    utils.addUser(username)
    socket.emit('message',`Welcome ${username}!`)
  })

  socket.on('message', ({username, message}) => {
    utils.addMessage({
      username,
      text: message
    })

    socket.emit('message', {
      username,
      text: message
    })
  })

  socket.on('disconnect', ({username}) => {
    utils.removeUser(username)
    socket.emit('message', `${username} has left the chat.`)
  })
})

server.listen(port, () => {
  console.log('server is up on port ' + port)
})