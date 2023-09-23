import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const App = () => {

  const [socket, setSocket] = useState();
  const [tasks, setTasks] = useState([
    {id: 1, taskName:'go work'},
    {id: 2, taskName:'go gym'},
    {id: 3, taskName:'go for a walk'},
    {id: 4, taskName:'make sex'}]);

  useEffect(() => {
    const socket = io('ws://localhost:8000', { transports: ['websocket'] });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeTask = (idOfTask) => {
    for(let singleTask of tasks) {
      if(singleTask.id === idOfTask) {
        console.log('zostanie usunięty', singleTask)
      }
    }
  }

  return (
    <div className="App">
  
      <header>
        <h1>ToDoList.app</h1>
      </header>
  
      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>
  
        <ul className="tasks-section__list" id="tasks-list">
          {tasks.map(task => {return <li className="task">{task.taskName} <button onClick={()=>removeTask(task.id)} className="btn btn--red">Remove</button></li>})}
        </ul>
  
        <form id="add-task-form">
          <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
          <button className="btn" type="submit">Add</button>
        </form>
  
      </section>
    </div>
  );
}

export default App;