import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';

const Task = ({ task, onDelete, onToggle }) => {

  return (
    <div className= { `task ${task.reminder ? 'reminder' : ''}` } onDoubleClick={() => onToggle(task.id)} >
         <h3>
         Username: {task.username}
         </h3>
      <p>{task.tasks} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} /></p>
      <p>{task.dayAndTime}</p> 
        
    </div>
  )
}

Task.defaultProps = {
    task: "My Task"
}

Task.propTypes = {
    task: PropTypes.object,
}

export default Task;