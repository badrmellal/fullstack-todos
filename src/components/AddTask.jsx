import { useState } from "react"

const AddTask = ({ onAdd }) => {

    const [username, setUsername] = useState('');
    const [tasks, setTasks] = useState('');
    const [dayAndTime, setDayAndTime] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!tasks || !dayAndTime || !username) {
            alert(`Please add ${!tasks ? 'Task' : !dayAndTime ? 'Day & Time' : 'Username'}`);
            return;
        }

        onAdd({username, tasks, dayAndTime, reminder });

        setUsername('');
        setTasks('');
        setDayAndTime('');
        setReminder(false);

    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Username</label>
            <input type="text" placeholder="Add Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder="Add Task" value={tasks} onChange={(e)=> setTasks(e.target.value)}/>
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type="text" placeholder="Add Day & Time" value={dayAndTime} onChange={(e)=> setDayAndTime(e.target.value)}/>
        </div>
        <div className="form-control form-control-check">
            <label>Set Urgency</label>
            <input type="checkbox" checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
        </div>
        <input type="submit" value='Save Task' className="btn btn-block"/>
    </form>
  )
}

export default AddTask;
