package org.connect.repository;

import org.connect.model.chat.Room;
import org.connect.model.skin.MySkin;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@ApplicationScoped
public class ChatRepository {
    @Inject
    protected EntityManager em ;

    @Transactional
    public void init() {
    }

    public List<Room> findAll(Optional user_id, String type) {

        TypedQuery<Room> tq = this.em.createNamedQuery(Room.FINDALL, Room.class);
        TypedQuery<Friendship> tq2 = this.em.createNamedQuery(Friendship.FIND, Friendship.class);

        tq.setParameter("u", user_id.get().toString());
        tq.setParameter("type", type);


        List<Room> roomList = null;
        // Blocked users wont be shown (obviously :D)
        if(type.equals("DM")) {
            try {
                roomList = tq.getResultList();
                for (Room r : roomList) {
                    for (User u : r.getUsers()) {
                        try {
                            System.out.println(em.find(User.class, user_id.get().toString()));
                            System.out.println(u);
                            if (!Objects.equals(u.getId(), user_id.get().toString())) {
                                tq2.setParameter("user_1", em.find(User.class, user_id.get().toString()));
                                tq2.setParameter("user_2", u);
                                tq2.getSingleResult();
                            }

                        } catch (Exception e) {
                            roomList.remove(r);
                            System.out.println(e.getMessage() + "ahhhhhhh h eeeeellp");
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        } else {
            try {
                roomList = tq.getResultList();
            }catch (Exception ex) {
                System.out.println(ex.getMessage());
            }
        }
        System.out.println(roomList);
        return roomList;
    }
}
