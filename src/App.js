import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {randomColor} from 'randomcolor'
import Draggable from 'react-draggable';
import './App.css';

function App() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [todos, setTodos] = React.useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  const timeStamp = () => {
    const date = new Date().toString().slice(4,24)
    return date
  }

  const newTodo = (() => {
    if(description.trim() !== '') { 
      const newItem = {
        id: uuidv4(),
        title: title,
        description: description,
        color: randomColor({
          luminosity: 'light'
        }),
          defaultPos: {
            x: 420,
            y: -450
        },
        timeStamp: `Add: ${timeStamp()}`,
        status: false,
      }
      setTodos((todos) => [...todos, newItem])
      setDescription('')
      setTitle('')
    } else {
      alert('add text to input field. Please...')
      setDescription('')
      
    }
    
  }
  )
 
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  const updatePos = (data, index) => {
    let newArr = [...todos]
    
    newArr[index].defaultPos = { x: data.x, y: data.y}
    setTodos(newArr)
  }

  const toggleCheck = (todo) => {
    setTodos(todos.map((item => item.id === todo.id? {...item, status:!item.status}: item)))
  }
  return (
    <div className="App">
      {todos.length!==0? <h6 style={{margin: 0, padding: 0, textAlign: 'center',background: '#5c5b58', color: '#aadbaa'}}> Task counter : {todos.length}</h6>: ''}
      <div className='wrapper'>
        <div className='user-interface'>
          <input
          value={title}
          style={{width: '70%'}}
          className='input'
          type='text'
          placeholder='add username or task name'
          onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            value={description}
            className='input'
            type='text'
            placeholder='*** input description task...   please! ***'
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                newTodo()
              }
            }}
            />
          <button onClick={newTodo} className='enter'>Add new task</button>
        </div>
      </div>
  
      {
        todos.map((todo, index) => {
          return(
            <Draggable
              key={index}
              defaultPosition={todo.defaultPos}
              onStop={(_, data) => {
                  updatePos(data, index)
              }}
            >
           
              <div id={todo.id} className='todo__item' style={{backgroundColor: todo.color}}>
              <div className='btns-container'>
                <button
                    className='delete'
                      onClick={() => deleteTodo(todo.id)}
                      >X
                </button>

                  <input type='checkbox' defaultChecked={todo.status} className='checkbox-complete' onClick={() => toggleCheck(todo)}>
                  </input>
              </div>

                <div className={todo.status?'text-todo complete': 'text-todo'}>
                  <div className='title-todo'>{todo.title}</div>
                  <div className='title-description'>{todo.description }</div>
                  <div className='stamp'>{todo.timeStamp}</div>
                </div>
              </div>
            </Draggable>
          
        )
      })}
   
    </div>
  )
}

export default App;
