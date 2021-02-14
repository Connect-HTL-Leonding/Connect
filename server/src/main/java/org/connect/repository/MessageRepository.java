package org.connect.repository;

import org.connect.model.chat.Message;
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
        System.out.println("msrepository: " + message);
        em.persist(message);
        return message;
    }

    public Room findRoom(long id) {
        return em.find(Room.class, id);
    }

    @Transactional
    public List<Message> findAll(long id) {
        TypedQuery<Message> tq = this.em.createNamedQuery(Message.FINDALL, Message.class);
        tq.setParameter("u", id);

        List<Message> ms = null;

        try {
            ms = tq.getResultList();
        }catch(Exception e) {
            System.out.println(e.getMessage());
        }
        return ms;
    }
}
