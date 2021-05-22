package org.connect.model.skin;

import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@DiscriminatorValue("my")
@NamedQuery(name = MySkin.FINDALL, query = "SELECT ms FROM MySkin ms where user_id = :u")
@NamedQuery(name = MySkin.FINDSPECIFIC, query = "SELECT ms FROM MySkin ms where user_id = :u and ms.skin.id = :skin")
@NamedQuery(name = MySkin.FINDSELECTED, query = "SELECT ms FROM MySkin ms where user_id = :u and ms.selected = true")
@NamedQuery(name = MySkin.FINDMAPSKINS, query = "SELECT ms FROM MySkin ms where user_id = :u and ms.selected = true and ms.showInMap = true")
@NamedQuery(name = MySkin.COUNTFOLLOWER, query = "SELECT count(ms) from MySkin ms where ms.skin = :skin")
public class MySkin implements Serializable {

    public static final String FINDALL = "MySkin.findAll";
    public static final String FINDSPECIFIC = "MySkin.findSpecific";
    public static final String FINDSELECTED = "MySkin.findSelected";
    public static final String FINDMAPSKINS = "MySkin.findMapSkins";
    public static final String COUNTFOLLOWER = "MySkin.countFollower";


    @Id
    @GeneratedValue
    private long id;
    private int age;
    private int radius;
    private int niveau;

    private boolean selected = false;
    private boolean showInMap = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skin_id")
    Skin skin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    User user;

    /*
    @ManyToOne
    User user;
    */

    public MySkin() {
    }

    public MySkin(int age, int radius, int niveau) {
        this.age = age;
        this.radius = radius;
        this.niveau = niveau;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public int getNiveau() {
        return niveau;
    }

    public void setNiveau(int niveau) {
        this.niveau = niveau;
    }

    public Skin getSkin() {
        return skin;
    }

    public void setSkin(Skin skin) {
        this.skin = skin;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    public boolean isShowInMap() {
        return showInMap;
    }

    public void setShowInMap(boolean showInMap) {
        this.showInMap = showInMap;
    }
}
