import { useState, useEffect } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      // console.log(tasksFromServer.json());

      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  //FETCH TASKS
  const fetchTasks = async () => {
    const response = await fetch('https://16.171.239.101:443/api/tasks');
    const data = await response.json();
    return data;
  }
  
  //FETCH TASK
  const fetchTask = async (id) => {
    const response = await fetch(`https://16.171.239.101:443/api/tasks/${id}`);
    const data = await response.json();

    return data;
  }

  //DELETE TASKS
  const deleteTask = async (id) => {
    fetch(`https://16.171.239.101:443/api/deletetask/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };
  //ADD TASKS
  const addTask = async (task) => {
    const response = await fetch('https://16.171.239.101:443/api/addtask', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    });

    const data = await response.json()
    
    setTasks([...tasks, data]);
   
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`https://16.171.239.101:443/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask),

    });
    
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  // const onSubmit = (newTask) => {
  //   const id = Math.floor(Math.random() * 10000) + 1;
  //   newTask["id"] = id;
  //   setTasks([...tasks, newTask]);
  // };

  const toggleTask = () => {
    console.log("showAddTask: ", showAddTask);
    setShowAddTask(!showAddTask);
  };

  return (
    <div className="App">
      <div className="container">
        <Header onAdd={toggleTask} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No Tasks to Show. Add Some !"
        )}
      </div>
    </div>
  );
}

export default App;
