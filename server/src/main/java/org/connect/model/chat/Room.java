package org.connect.model.chat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.connect.model.meetup.Meeting;
import org.connect.model.skin.Category;
import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Entity

@NamedQueries({
        @NamedQuery(name = Room.FINDALL, query = "SELECT r from Room r join r.users u where u.id=:u and r.type = :type"),
        //@NamedQuery(name = Room.FINDALL, query = "SELECT r from Room r left join Room_Members m on (m.user_id=:u)") // : (
        //@NamedQuery(name = Room.FINDALL, query = "SELECT r from Room r left join r.users u left join Friendship f on(f.user1.id=:u or f.user2.id = :u) where u.id = :u and f.status<>'blocked'") // : (
        @NamedQuery(name = Room.FINDBYMEETING, query = "SELECT r from Room r where r.meeting=:meeting")
})
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","users"})
public class Room implements Serializable {

    public static final String FINDALL = "Room.findAll";
    public static final String FINDBYMEETING = "Room.findByMeeting";

    @Id
    @GeneratedValue
    private
    long id;
    private String type;
    private LocalDateTime created;
    private LocalDateTime updated;

    @OneToOne
    private Meeting meeting;

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

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }
}
