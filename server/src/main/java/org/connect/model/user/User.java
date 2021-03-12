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
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","rooms"})
@NamedQueries({
        @NamedQuery(name = User.FINDWITHID, query = "SELECT u FROM User u where id = :user_id"),
        @NamedQuery(name = User.FINDOTHERUSER, query = "SELECT u FROM User u join u.rooms where room_id = :roomid AND u.id NOT LIKE :user_id")
})
public class User implements Serializable {

    public static final String FINDWITHID = "User.findwithid";
    public static final String FINDOTHERUSER = "User.findotheruser";

    //Attribute
    @Id
    private String id;
    //private String userName;
    //private String firstname;
    //private String lastname;

    private char gender;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_position_mapping",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "latlng")
    @Column(name = "degrees")
    Map<String,Double> position;

    // Boolean to detect if the User has finished the Tutorial
    private boolean finishedTutorial;

    //private LocalDateTime created;
    //LocalDateTime updated;
    private String description;
    //private String email;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;
    @Lob
    private byte[] profilePicture;

    @ManyToMany(mappedBy = "users")
    private List<Room> rooms = new LinkedList<>();

    public User() {
    }

    public User(String id, String userName) {
        this.id = id;
        //this.userName = userName;
    }

    public User(SecurityIdentity identity) {
        //this.userName = identity.getPrincipal().getName();
        //this.attributes = identity.getPrincipal().toString();
        //System.out.println(attributes);
    }

    public User(JsonWebToken token) {
        this.id = token.claim("sub").get().toString();
        //this.userName = token.getName();
        System.out.println(token.claim("name").get().toString());
        //this.firstname = token.claim("given_name").get().toString();
        //this.lastname = token.claim("family_name").get().toString();
        //this.email = token.claim("email").get().toString();
        this.gender = 'a';
        this.finishedTutorial = false;
        //this.attributes = token.getRawToken();
        System.out.println(this.id);
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, Double> getPosition() {
        return position;
    }

    public void setPosition(Map<String, Double> position) {
        this.position = position;
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

    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public boolean isFinishedTutorial() { return finishedTutorial; }

    public void setFinishedTutorial(boolean finishedTutorial) { this.finishedTutorial = finishedTutorial; }
}