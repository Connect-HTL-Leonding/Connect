package org.connect.model.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.connect.model.skin.Category;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Entity

@NamedQueries({
        @NamedQuery(name = Room.FINDALL, query = "SELECT r from Room r join r.users u where u.id = 1") // : (
})
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","users"})
public class Room implements Serializable {

    public static final String FINDALL = "Room.findAll";

    @Id
    @GeneratedValue
    private
    long id;
    private String type;
    private LocalDateTime created;
    private LocalDateTime updated;

    public Room(){

    }

    public Room(String type) {
        setType(type);
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name= "Room_Members",
            joinColumns =
                    {@JoinColumn(name="room_id")},
            inverseJoinColumns =
                    {@JoinColumn(name="user_id")}
    )
    private List<User> users = new LinkedList<>();



    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }
}
