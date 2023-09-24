import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import shortid from 'shortid';


const App = () => {

  const [socket, setSocket] = useState();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState([]);
  
  useEffect(() => {
    const socket = io('ws://localhost:8000', { transports: ['websocket'] });
    setSocket(socket);
    socket.on('updateData', task => setTasks(task));
    socket.on('addTask', incommingTask => addTask(incommingTask));

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeTask = (idTask) => {
    setTasks(tasks => tasks.filter(task => task.id !== idTask));
    socket.emit('removeTask', idTask);
  };

  const addTask = (task) => {
    setTasks(tasks => [...tasks, task ]);
  };

  const submitForm = e => {
    e.preventDefault();
    const id = shortid();
    addTask({name: taskName, id: id});
    socket.emit('addTask', {name: taskName, id: id})
    setTaskName('');
  };


  return (
    <div className="App">
  
      <header>
        <h1>ToDoList.app</h1>
      </header>
  
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
  
        <ul className="tasks-section__list" id="tasks-list">
          {tasks.map(task => {return <li key={shortid()} className="task">{task.name} <button onClick={()=>removeTask(task.id)} className="btn btn--red">Remove</button></li>})}
        </ul>
  
        <form id="add-task-form" onSubmit={submitForm}>
          <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={taskName} onChange={e => setTaskName(e.target.value)} />
          <button className="btn" type="submit">Add</button>
        </form>
  
      </section>
    </div>
  );
}

export default App;