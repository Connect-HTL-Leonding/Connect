package org.connect.model.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Room;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.io.Serializable;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","rooms"})
public class User implements Serializable {

    @Id
    private String id;
    private String userName;
    private LocalDateTime created;
    LocalDateTime updated;
    private String description;

    @ManyToMany(mappedBy = "users")
    private List<Room> rooms = new LinkedList<>();

    public User() {
    }

    public User(String id, String userName) {
        this.id = id;
        this.userName = userName;
    }

    public User(SecurityIdentity identity) {
        this.userName = identity.getPrincipal().getName();
        //this.attributes = identity.getPrincipal().toString();
        //System.out.println(attributes);
    }

    public User(JsonWebToken token) {
        /*
        if(token.claim("sub").isPresent()){
            this.id =
        }
        */

        this.id = token.claim("sub").get().toString();
        this.userName = token.getName();
        //this.attributes = token.getRawToken();
        System.out.println(this.id);
    }

    public String getUserName() {
        return userName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }

    public String getDesc() {
        return description;
    }

    public void setDesc(String desc) {
        this.description = desc;
    }
}