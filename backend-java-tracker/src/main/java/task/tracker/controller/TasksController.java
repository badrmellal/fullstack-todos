package task.tracker.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import task.tracker.model.TasksModel;
import task.tracker.service.TasksService;

@CrossOrigin
@RestController
public class TasksController {
	private TasksService tasksService;
	private ObjectMapper objectMapper;

	@Autowired
	public TasksController(TasksService tasksService, ObjectMapper objectMapper) {
		this.tasksService = tasksService;
		this.objectMapper = objectMapper;
	}

	@PostMapping("/api/addtask")
	public ResponseEntity<TasksModel> saveTask(@RequestBody TasksModel task){
		tasksService.saveTask(task);
		System.out.println("data being received : "+ task);

		try {
			String jsonData = objectMapper.writeValueAsString(task);
			System.out.println("This is data after objectMapper: "+ jsonData);
		} catch (JsonProcessingException e) {
		  e.getStackTrace();
		}
		
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@DeleteMapping("/api/deletetask/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable Long id) throws Exception{
		try {
			tasksService.deleteTask(id);
			return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error when deleting task : "+ e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/api/tasks")
	public ResponseEntity<List<TasksModel>> getAllTasks() throws SQLException {
	    List<TasksModel> allTasks = tasksService.findAllTasks();
	    System.out.println("data being sent from server: "+ allTasks);
	    if (allTasks.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    } else {
        	return ResponseEntity.status(HttpStatus.OK).body(allTasks);
	    }
	}

	
}
