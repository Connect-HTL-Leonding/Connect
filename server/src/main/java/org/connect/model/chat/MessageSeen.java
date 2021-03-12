package org.connect.model.chat;

import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
public class MessageSeen implements Serializable {
    @Id
    @ManyToOne
    Message message;

    long RoomId;

    @ManyToOne
    User user;

    private LocalDateTime dateSeen;

    public MessageSeen() { }

    public MessageSeen(Message m, long RoomId, User u) {
        setMessage(m);
        setRoomId(RoomId);
        setUser(u);
    }

    public MessageSeen(Message m, long RoomId) {
        setMessage(m);
        setRoomId(RoomId);
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public long getRoomId() {
        return RoomId;
    }

    public void setRoomId(long roomId) {
        RoomId = roomId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getDateSeen() {
        return dateSeen;
    }

    public void setDateSeen(LocalDateTime dateSeen) {
        this.dateSeen = dateSeen;
    }
}
