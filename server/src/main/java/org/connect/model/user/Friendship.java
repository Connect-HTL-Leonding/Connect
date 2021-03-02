package org.connect.model.user;

import org.connect.model.skin.Skin;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@NamedQueries({
        @NamedQuery(name = Friendship.FINDALL, query = "SELECT f FROM Friendship f"),
        @NamedQuery(name = Friendship.FINDFRIENDSHIPSOFUSER, query = "SELECT f FROM Friendship f where user1_id = :user or user2_id = :user")
})
public class Friendship implements Serializable {

    public static final String FINDALL = "Friendship.findAll";
    public static final String FINDFRIENDSHIPSOFUSER = "Friendship.findFriendshipsOfUser";


    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user1_id")
    private User user1_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user2_id")
    private User user2_id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "skin")
    private Skin skin;

    private LocalDateTime created;

    private String status;

    public Friendship(){

    }

    public Friendship(User user1_id, User user2_id, Skin skin, LocalDateTime created, String status) {
        this.user1_id = user1_id;
        this.user2_id = user2_id;
        this.created = created;
        this.status = status;
        this.skin = skin;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser1_id() {
        return user1_id;
    }

    public void setUser1_id(User user1_id) {
        this.user1_id = user1_id;
    }

    public User getUser2_id() {
        return user2_id;
    }

    public void setUser2_id(User user2_id) {
        this.user2_id = user2_id;
    }

    public Skin getSkin() {
        return skin;
    }

    public void setSkin(Skin skin) {
        this.skin = skin;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
