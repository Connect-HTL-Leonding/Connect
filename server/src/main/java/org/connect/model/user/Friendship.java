package org.connect.model.user;

import org.connect.model.skin.Skin;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity

@NamedQuery(name = Friendship.FINDALL, query = "SELECT f FROM Friendship f")
@NamedQuery(name = Friendship.FINDFRIENDSHIPSOFUSER, query = "SELECT f FROM Friendship f where user1 = :user or user2 = :user")
//Radius muss noch hinzugefügt werden
@NamedQuery(name = Friendship.FINDRANDOM, query = "SELECT u FROM User u join MySkin ms on(ms.user.id = u.id)" +
        "where ms.age <= :age and ms.niveau = :niveau")

public class Friendship implements Serializable {

    public static final String FINDALL = "Friendship.findAll";
    public static final String FINDFRIENDSHIPSOFUSER = "Friendship.findFriendshipsOfUser";
    public static final String FINDRANDOM = "Friendship.findRandom";



    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user1")
    private User user1;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user2")
    private User user2;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "skin")
    private Skin skin;

    private LocalDateTime created;

    private String status;

    public Friendship(){

    }

    public Friendship(User user1_id, User user2_id, Skin skin, LocalDateTime created, String status) {
        this.user1 = user1_id;
        this.user2 = user2_id;
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

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1_id) {
        this.user1 = user1_id;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2_id) {
        this.user2 = user2_id;
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
