import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './styles/Agenda.css'
import { FaTrash, FaPlusCircle, FaPen } from 'react-icons/fa'
import moment from 'moment'

function Agenda({ socket }) {
  const [userList, setUserList] = useState([])
  const [taskList, setTaskList] = useState([])
  const [messageList, setMessageList] = useState([])
  const [addEvent, toggleAddEvent] = useState(false)
  const [editMode, toggleEditMode] = useState(false)
  const [editedTask, setEditedTask] = useState(null)
  const { username } = useParams()
  const messagesEndRef = React.createRef()

  useEffect(() => {
    socket.emit('join', { username })
  }, [])

  socket.on('users', ({ users }) => {
    setUserList(users)
  })

  socket.on('tasks', ({ tasks }) => {
    setTaskList(tasks)
  })

  socket.on('messages', ({ messages }) => {
    setMessageList(messages)
  })

  const handleDelete = (task) => {
    socket.emit('deleteTask', task)
  }

  const handleAdd = () => {
    toggleAddEvent(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit('message', { username, message: e.target.elements.message.value })

    e.target.elements.message.value = ''
  }

  const handleEdit = (task) => {
    setEditedTask(task)
    toggleEditMode(true)
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    const update = {
      title: e.target.elements.title.value,
      time: e.target.elements.time.value,
      description: e.target.elements.description.value,
    }

    socket.emit('update', { update, editedTask })

    toggleEditMode(false)
  }

  const handleForm = (e) => {
    e.preventDefault()
    socket.emit('addevent', {
      title: e.target.elements.title.value,
      time: e.target.elements.time.value,
      description: e.target.elements.description.value,
    })

    e.target.elements.title.value = ''
    e.target.elements.time.value = ''
    e.target.elements.description.value = ''

    toggleAddEvent(false)
  }

  console.log(!taskList[0])

  return (
    <div className="container">
      <div className="sidebar">
        <div className="user-list">
          <h3>Members</h3>
          {userList.map((user) => {
            return <div className="user">{user}</div>
          })}
        </div>
      </div>
      <div className="main">
        <div className="title">
          <h3>Agenda</h3>
        </div>
        <div className="add-event-bar">
          {editMode && (
            <div className="edit-container">
              <div className="add-event-form">
                <form className="add-form" onSubmit={handleUpdate}>
                  <input type="text" name="title" placeholder={editedTask.title} required />
                  <input type="text" name="time" placeholder={editedTask.time} required />
                  <input type="text" name="description" placeholder={editedTask.description} required />
                  <button>Update </button>
                </form>
              </div>
            </div>
          )}
          {addEvent ? (
            <div className="add-event-form">
              <form className="add-form" onSubmit={handleForm}>
                <input type="text" name="title" placeholder="Title of this topic" required />
                <input type="text" name="time" placeholder="Length of topic" required />
                <input type="text" name="description" placeholder="Text description" required />
                <button>Add </button>
              </form>
            </div>
          ) : (
            <button className="add-event" onClick={handleAdd}>
              <FaPlusCircle size={20} />
            </button>
          )}
        </div>
        {!taskList[0] ? (
          <div>Nothing scheduled for this meeting</div>
        ) : (
          <div className="tasks">
            {taskList.map((task) => {
              return (
                <div className="task">
                  <div className="info">
                    <div className="task-title">
                      {task.title} - <span>{task.time}</span>
                    </div>
                    <div className="task-description">{task.description}</div>
                  </div>
                  <button class="button" onClick={() => handleEdit(task)}>
                    <FaPen />
                  </button>
                  <button class="button" onClick={() => handleDelete(task)}>
                    <FaTrash />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="right-sidebar">
        <div className="chat-title">Chat</div>
        <div className="chat">
          <div className="messages">
            {messageList.map((message) => {
              return (
                <div className="message">
                  <div className="username">
                    {message.username} <span>{moment(message.time).format('h:mm a')}</span>
                  </div>
                  <div className="text">{message.text}</div>
                </div>
              )
            })}
          </div>
          <form className="chat-form" onSubmit={handleSubmit}>
            <input type="text" name="message" placeholder="Send a message" autocomplete="off" required />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Agenda
