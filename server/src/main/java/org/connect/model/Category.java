package org.connect.model;

import javax.persistence.*;
import java.awt.*;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Category implements Serializable {

    @Id
    @GeneratedValue
    private long id;
    private String title;

    @ManyToMany
    List<Skin> skins = new LinkedList<>();

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
}
