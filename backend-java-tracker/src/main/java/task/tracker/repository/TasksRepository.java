package task.tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import task.tracker.model.TasksModel;

@Repository
public interface TasksRepository extends JpaRepository<TasksModel, Long> {

}
