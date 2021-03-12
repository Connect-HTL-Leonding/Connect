package org.connect.repository;

import org.connect.model.chat.Message;
import org.connect.model.chat.MessageSeen;
import org.connect.model.chat.Room;
import org.connect.model.skin.MySkin;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MessageRepository {
    @Inject
    protected EntityManager em ;

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
                //setToSeen(RoomId, m);
            }
        }catch(Exception e) {
            System.out.println(e.getMessage());
        }
        return ms;
    }

    // Setting message to on seen
    @Transactional
    public void setToSeen(long RoomId, Message m) {
        MessageSeen ms = new MessageSeen(m,RoomId);
        em.persist(ms);
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
