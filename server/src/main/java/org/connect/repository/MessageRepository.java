package org.connect.repository;

import org.connect.model.chat.Message;
import org.connect.model.chat.MessageSeen;
import org.connect.model.chat.Room;
import org.connect.model.image.Image;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MessageRepository {
    @Inject
    protected EntityManager em ;

    @Inject
    JsonWebToken jwt;

    @Transactional
    public void init() {
    }

    @Transactional
    public Message create(Message message) {

        em.persist(message);
        return message;
    }

    public Room findRoom(long id) {
        return em.find(Room.class, id);
    }

    @Transactional
    public List<Message> findAll(long RoomId) {
        TypedQuery<Message> tq = this.em.createNamedQuery(Message.FINDALL, Message.class);
        tq.setParameter("u", RoomId);

        List<Message> ms = null;

        try {
            ms = tq.getResultList();

            //Set Messages to on seen
            for (Message m: ms) {
                setToSeen(RoomId, m, jwt.claim("sub").get().toString());
            }
        }catch(Exception e) {
            System.out.println(e.getMessage());
        }
        return ms;
    }

    // Setting message to "on seen"
    @Transactional
    public void setToSeen(long RoomId, Message m, String user_Id) {
        TypedQuery<MessageSeen> tq = this.em.createNamedQuery(MessageSeen.FINDWITHID, MessageSeen.class);
        tq.setParameter("m", m);
        tq.setParameter("u", user_Id);

        List<MessageSeen> messageList = null;

        // If a user reads his own messages, it won't get saved
        if (!(m.getUser().getId().equals(user_Id))) {
        try {
            messageList = tq.getResultList();
            // Check if message has already been seen by me
            if (messageList.isEmpty()) {
                // If not, write to database that it has been seen now
                MessageSeen ms = new MessageSeen(m, RoomId, user_Id, Calendar.getInstance());
                em.persist(ms);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
       }
    }

    public long getSeenMessages(long RoomId) {
        TypedQuery<Long> tq = this.em.createNamedQuery(MessageSeen.GETCOUNT, Long.class);
        tq.setParameter("r",RoomId);
        long count = 0;
        try {
           count = tq.getSingleResult();
           return count;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return count;
    }

    public long getAllMessages(long roomId) {
        TypedQuery<Long> tq = this.em.createNamedQuery(Message.GETCOUNT, Long.class);
        tq.setParameter("r",roomId);
        long count = 0;
        try {
            count = tq.getSingleResult();
            System.out.println(count);
            return count;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return count;
    }


    public Message getLatestMessage(long RoomId) {
        TypedQuery<Message> tq = this.em.createNamedQuery(Message.FINDALL, Message.class);
        tq.setParameter("u", RoomId);

        List<Message> ms = null;
        Message latestMessage = null;

        try {
            ms = tq.getResultList();
            latestMessage = ms.get(ms.size() - 1);
        }catch(Exception e) {
            System.out.println(e.getMessage());
        }
        return latestMessage;
    }
}
