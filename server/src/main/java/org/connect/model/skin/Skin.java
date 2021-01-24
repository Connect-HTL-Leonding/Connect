package org.connect.model.skin;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NamedQueries({
        /*
        @NamedQuery(name = "Skin.findCat", query = "SELECT c FROM Category c, Category_Skin cs, Skin s " +
                "where s.id = cs.skins_id AND cs.category_id = c.id"),*/
        @NamedQuery(name = Skin.FINDALL, query = "SELECT s FROM Skin s"),
        @NamedQuery(name = Skin.CHECK, query = "SELECT ms FROM MySkin ms where skin_id = :s and user_id = :u")
})
public class Skin implements Serializable {

    public static final String FINDALL = "Skin.findAll";
    public static final String CHECK = "Skin.check";

    @Id
    @GeneratedValue
    private long id;
    private String title;
    private String description;
    //private Image image;
    private String image;
    private int follower;

    //https://www.baeldung.com/hibernate-initialize-proxy-exception
    @ManyToMany(fetch = FetchType.EAGER)
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

    @Override
    public String toString() {
        return "Skin{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                ", follower=" + follower + '\'' +
                ", categories=" + categories.stream().map(Category::getTitle).collect(Collectors.toList()) + '\'' +
                +
                '}';
    }
}
