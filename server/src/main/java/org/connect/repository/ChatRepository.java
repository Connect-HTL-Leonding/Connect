package org.connect.repository;

import org.connect.model.chat.Room;
import org.connect.model.skin.MySkin;
import org.connect.model.user.User;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ChatRepository {
    @Inject
    protected EntityManager em ;

    @Transactional
    public void init() {
    }

    public List<Room> findAll(Optional user_id) {

        TypedQuery<Room> tq = this.em.createNamedQuery(Room.FINDALL, Room.class);
        tq.setParameter("u", user_id.get().toString());

        List<Room> roomList = null;
        try {
            roomList = tq.getResultList();
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }
        for (Room r : roomList) {
            System.out.println("test");
            System.out.println(r);
        }
        return roomList;
    }
}
