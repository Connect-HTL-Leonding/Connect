package org.connect.model.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Room;
import org.connect.model.skin.Skin;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.persistence.*;
import java.io.Serializable;
import java.security.Principal;
import java.sql.Blob;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","rooms"})
@NamedQueries({
        @NamedQuery(name = User.FINDWITHID, query = "SELECT u FROM User u where id = :user_id"),
})
public class User implements Serializable {

    public static final String FINDWITHID = "User.findwithid";

    @Id
    private String id;
    private String userName;
    //private LocalDateTime created;
    //LocalDateTime updated;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;
    private char gender;
    private String fullname;
    @Lob
    private byte[] profilePicture;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }
}