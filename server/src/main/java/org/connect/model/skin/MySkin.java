package org.connect.model.skin;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@DiscriminatorValue("my")
@NamedQueries({
        @NamedQuery(name = "MySkin.findAll", query = "SELECT ms FROM MySkin ms")
})
public class MySkin implements Serializable {

    @Id
    @GeneratedValue
    private long id;
    private int age;
    private int radius;
    private int niveau;

    @ManyToOne
    Skin skin;

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
}
