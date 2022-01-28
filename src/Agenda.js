import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './styles/Agenda.css'
import { FaTrash } from 'react-icons/fa'

function Agenda({ socket }) {
  const [userList, setUserList] = useState([])
  const [taskList, setTaskList] = useState([])
  const { username } = useParams()
  console.log(username)

  useEffect(() => {
    socket.emit('join', { username })
    // socket.emit('delete')
  }, [])

  socket.on('users', ({ users }) => {
    setUserList(users)
  })

  socket.on('tasks', ({ tasks }) => {
    setTaskList(tasks)
  })

  const handleDelete = (task) => {
    console.log("deleting task")
    socket.emit('deleteTask', task)
  }

  console.log(userList)
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
                <button class="delete-button" onClick={() => handleDelete(task)}>
                  <FaTrash />
                </button>
              </div>
            )
          })}
        </div>
        <div className="chat">
          <div className="chatbox">
            hajanlks
          </div>
        </div>
      </div>
    </div>
  )
}

export default Agenda
