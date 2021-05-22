package org.connect.model.meetup;

import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NamedQuery(name = Meeting_User.FINDUSER, query = "select m from Meeting_User m where m.meeting.id = :meeting_id")
public class Meeting_User implements Serializable {

    @Id
    @GeneratedValue
    private long id;

    public static final String FINDUSER = "Meeting_User.findUser";

    @ManyToOne
    private Meeting meeting;

    String user_id;

    private String status;

    private Boolean isSeen;

    public Meeting_User() {

    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public Boolean getSeen() {
        return isSeen;
    }

    public void setSeen(Boolean seen) {
        isSeen = seen;
    }
}
