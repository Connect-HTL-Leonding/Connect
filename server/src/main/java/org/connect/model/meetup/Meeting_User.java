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

    private boolean accepted = true;

    public Meeting_User() {

    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
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
}
