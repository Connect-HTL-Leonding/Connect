package org.connect.model.chat;

import net.bytebuddy.asm.Advice;
import org.connect.model.skin.MySkin;
import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@NamedQueries({
        @NamedQuery(name = Message.FINDALL, query = "SELECT ms FROM Message ms where room_id = :u"),
        @NamedQuery(name = Message.GETCOUNT, query = "SELECT count(m) FROM Message m where room_id = :r")
})
public class Message implements Serializable {

    public static final String FINDALL = "Message.findAll";
    public static final String GETCOUNT = "Message.getCount";

    @Id
    @GeneratedValue
    private
    long id;
    private String message;
    private LocalDateTime created;
    private LocalDateTime updated;
    @Lob
    private byte[] image;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private Room room;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public Message() {

    }

    public Message(String message, LocalDateTime created, LocalDateTime updated) {
        this.message = message;
        this.created = created;
        this.updated = updated;
    }

    public Message(String message, LocalDateTime created, LocalDateTime updated, byte[] image) {
        this.message = message;
        this.created = created;
        this.updated = updated;
        this.image = image;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
