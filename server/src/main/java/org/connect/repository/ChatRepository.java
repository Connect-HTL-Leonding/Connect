package org.connect.repository;

import org.connect.model.chat.Room;
import org.connect.model.chat.User;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class ChatRepository {
    @Inject
    protected EntityManager em ;

    @Transactional
    public void init() {
        User u = new User("test","email");
        Room r = new Room("DM");
        u.getRooms().add(r);
        r.getUsers().add(u);

        em.persist(u);
        em.persist(r);
    }

    public List<Room> findAll() {
        return this.em
                .createNamedQuery(Room.FINDALL, Room.class)
                .getResultList();
    }
}
