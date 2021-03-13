package org.connect.model.chat;

import org.connect.model.user.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Calendar;

@Entity
@NamedQueries({
        @NamedQuery(name = MessageSeen.FINDWITHID, query = "SELECT ms FROM MessageSeen ms where ms.message = :m AND ms.user_Id = :u"),
        @NamedQuery(name = MessageSeen.GETCOUNT, query = "SELECT count(ms) FROM MessageSeen ms where ms.RoomId = :r")
})
public class MessageSeen implements Serializable {

    public static final String FINDWITHID = "MessageSeen.findWithId";
    public static final String GETCOUNT = "MessageSeen.getCount";

    @Id
    @GeneratedValue
    long id;


    @ManyToOne
    Message message;

    long RoomId;

    String user_Id;

    private Calendar dateSeen;

    public MessageSeen() { }


    public MessageSeen(Message m, long RoomId, String userId, Calendar dateSeen) {
        setMessage(m);
        setRoomId(RoomId);
        setUser_Id(userId);
        setDateSeen(dateSeen);
    }


    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public long getRoomId() {
        return RoomId;
    }

    public void setRoomId(long roomId) {
        RoomId = roomId;
    }

    public String getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(String user_Id) {
        this.user_Id = user_Id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Calendar getDateSeen() {
        return dateSeen;
    }

    public void setDateSeen(Calendar dateSeen) {
        this.dateSeen = dateSeen;
    }
}
