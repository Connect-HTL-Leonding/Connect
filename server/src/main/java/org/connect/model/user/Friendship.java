package org.connect.model.user;

import org.connect.model.skin.Skin;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Entity

@NamedQuery(name = Friendship.FINDALL, query = "SELECT f FROM Friendship f where f.status not like 'blocked'")
@NamedQuery(name = Friendship.FINDFRIENDSHIPSOFUSER, query = "SELECT f FROM Friendship f where (f.user1 = :user or f.user2 = :user) and f.status not like 'blocked'")
@NamedQuery(name = Friendship.USERSOFFRIENDSHIPS, query = "SELECT f.user1.id, f.user2.id FROM Friendship f where (f.user1 = :user or f.user2 = :user) and f.status not like 'blocked'")
@NamedQuery(name = Friendship.FIND, query = "SELECT f FROM Friendship f where ((f.user1 = :user_1 and f.user2 = :user_2) or (f.user1 = :user_2 and f.user2 = :user_1)) and f.status not like 'blocked'")
@NamedQuery(name = Friendship.FIND2, query = "SELECT f FROM Friendship f where f.user1 = :user_2 and f.user2 = :user_1 and f.status not like 'blocked'")
@NamedQuery(name = Friendship.FINDBLOCKED, query = "SELECT f FROM Friendship f where ((f.user1 = :user_1 and f.user2 = :user_2) or (f.user1 = :user_2 and f.user2 = :user_1)) and f.status like 'blocked'")

//CONNECT
//holt alle User, die den MySkin-Kriterien entsprechen
//muss noch mehr überprüft werden!!!!
//Radius muss noch hinzugefügt werden!!!!!
/*
@NamedQuery(name = Friendship.FINDRANDOM, query = "SELECT distinct u FROM User u join MySkin ms on(ms.user.id = u.id) " +
        "join Friendship f1 on(f1.user1 = u) " +
        "join Friendship f2 on(f2.user2 = u) " +
        "where f1.user2 <> :user_1 and f2.user1 <> :user_1 " +
        "and ms.skin.id = :mySkinSkin_id " +
        "and ms.age <= :age and ms.niveau <= :niveau " +
        "and u <> :user_1")
*/
@NamedQuery(name = Friendship.FINDRANDOM, query = "SELECT distinct u FROM User u join MySkin ms on(ms.user.id = u.id) " +
        "where ms.skin.id = :mySkinSkin_id " +
        "and ms.age <= :age and ms.niveau <= :niveau " +
        "and u <> :user_1")
public class Friendship implements Serializable {

    public static final String FINDALL = "Friendship.findAll";
    public static final String FINDFRIENDSHIPSOFUSER = "Friendship.findFriendshipsOfUser";
    public static final String USERSOFFRIENDSHIPS = "Friendship.usersOfFriendship";
    public static final String FINDRANDOM = "Friendship.findRandom";
    public static final String FIND = "Friendship.find";
    public static final String FIND2 = "Friendship.find2";
    public static final String FINDBLOCKED = "Friendship.findBlocked";


    @Id
    @GeneratedValue
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user1")
    private User user1;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user2")
    private User user2;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "skin")
    private List<Skin> skins = new LinkedList<>();

    private LocalDateTime created;

    private String status;

    public Friendship(){

    }

    public Friendship(User user1_id, User user2_id, Skin skin, LocalDateTime created, String status) {
        this.user1 = user1_id;
        this.user2 = user2_id;
        this.created = created;
        this.status = status;
        this.skins.add(skin);
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

    public List<Skin> getSkin() {
        return skins;
    }

    public void setSkin(List<Skin> skin) {
        this.skins = skin;
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
