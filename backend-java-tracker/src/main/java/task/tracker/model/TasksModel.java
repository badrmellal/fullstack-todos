package task.tracker.model;

import com.fasterxml.jackson.annotation.JsonGetter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TasksModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "tasks")
    private String tasks;
    @Column(name = "dayAndTime")
    private String dayAndTime;
    @Column(name = "reminder")
    private Boolean reminder;

    // Adding @JsonGetter annotations to make Lombok-generated getters accessible to
    // Jackson
    @JsonGetter("id")
    public Long getId() {
        return id;
    }

    @JsonGetter("username")
    public String getUsername() {
        return username;
    }

    @JsonGetter("tasks")
    public String getTasks() {
        return tasks;
    }

    @JsonGetter("dayAndTime")
    public String getDayAndTime() {
        return dayAndTime;
    }

    @JsonGetter("reminder")
    public Boolean getReminder() {
        return reminder;
    }

}
