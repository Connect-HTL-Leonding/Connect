package org.connect.model.meetup;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@NamedQuery(name = Meeting.FINDALL, query = "select m from Meeting m where m.creator.id = :user_id")
@NamedQuery(name=Meeting.FINDMEETUPSWITHME, query = "select m from Meeting m join m.mu_list mu where mu.user_id= :user_id AND m.creator.id= :creator_id AND mu.status = 'pending' ")
public class Meeting implements Serializable {

    @Id
    @GeneratedValue
    private long id;
    private LocalDateTime time;

    public static final String FINDALL = "Meeting.findAll";
    public static final String FINDMEETUPSWITHME = "Meeting.findMeetupsWithMe";

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "meetup_position_mapping",
            joinColumns = {@JoinColumn(name = "meetup_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "latlng")
    @Column(name = "degrees")
    Map<String,Double> position = new HashMap<>();

   @ManyToOne
   private User creator;

   @JsonIgnore
   @OneToMany(mappedBy = "meeting")
   public List<Meeting_User> mu_list;


    public Meeting(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Map<String, Double> getPosition() {
        return position;
    }

    public void setPosition(Map<String, Double> position) {
        this.position = position;
    }

    public List<Meeting_User> getMu_list() {
        return mu_list;
    }

    public void setMu_list(List<Meeting_User> mu_list) {
        this.mu_list = mu_list;
    }
}
