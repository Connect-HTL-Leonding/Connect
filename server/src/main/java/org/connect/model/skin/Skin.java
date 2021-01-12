package org.connect.model.skin;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NamedQueries({
        @NamedQuery(name = "Skin.findAll", query = "SELECT s FROM Skin s")
})
public class Skin implements Serializable {

    @Id
    @GeneratedValue
    private long id;
    private String title;
    private String description;
    //private Image image;
    private String image;
    private int follower;

    @ManyToMany(mappedBy = "skins")
    List<Category> categories = new LinkedList<>();

    public Skin() {
    }

    public Skin(String title, String description, String image, int follower) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.follower = follower;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getFollower() {
        return follower;
    }

    public void setFollower(int follower) {
        this.follower = follower;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
