package org.connect.model;

import javax.persistence.*;
import java.awt.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Entity
@NamedQueries({
        @NamedQuery(name = "MySkin.findAll", query = "SELECT ms FROM MySkin ms")
})
public class MySkin extends Skin implements Serializable {

    @Id
    @GeneratedValue
    private long id;
    private boolean following;
    private int age;
    private int radius;
    private int niveau;


    public MySkin() {
    }

    public MySkin(String title, String description, String image, int follower, boolean following, int age, int radius, int niveau) {
        super(title, description, image, follower);
        this.following = following;
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

    public boolean isFollowing() {
        return following;
    }

    public void setFollowing(boolean following) {
        this.following = following;
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

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
