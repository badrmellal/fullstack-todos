package task.tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import task.tracker.model.TasksModel;
import task.tracker.repository.TasksRepository;

@Service
public class TasksService {

	private TasksRepository tasksRepository;

	@Autowired
	public TasksService(TasksRepository tasksRepository) {
		this.tasksRepository = tasksRepository;
	}

	public TasksModel saveTask(TasksModel task) {
		System.out.println("data being received in service layer :" + task);
		return tasksRepository.save(task);
	}

	public void deleteTask(Long id) {
		tasksRepository.deleteById(id);
	}

	public List<TasksModel> findAllTasks() {
		List<TasksModel> allTasks = tasksRepository.findAll();
		return allTasks;
	}

}
