package org.connect.model.skin;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Entity
@NamedQueries({
        @NamedQuery(name = Category.FINDALL, query = "SELECT c FROM Category c")
})
public class Category implements Serializable {

    public static final String FINDALL = "Category.findAll";

    @Id
    @GeneratedValue
    private long id;
    private String title;

    @ManyToMany(mappedBy = "categories")
    //Um Endlosschleife zu verhindern
    @JsonIgnore
    private List<Skin> skins = new LinkedList<>();

    public Category() {
    }

    public Category(String title) {
        this.title = title;
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

    public List<Skin> getSkins() {
        return skins;
    }

    public void setSkins(List<Skin> skins) {
        this.skins = skins;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", skins=" + skins +
                '}';
    }
}
