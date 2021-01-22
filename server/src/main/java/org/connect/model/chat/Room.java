package org.connect.model.chat;

import org.connect.model.skin.Category;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@NamedQueries({
        @NamedQuery(name = Room.FINDALL, query = "SELECT r FROM Room r")
})
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
