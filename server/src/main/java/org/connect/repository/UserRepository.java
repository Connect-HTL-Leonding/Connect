package org.connect.repository;

import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.Optional;

@ApplicationScoped
public class
UserRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;

    @Transactional
    public User create(JsonWebToken jwt) {
        //em.find(User.class, user)

        TypedQuery<User> tq = this.em.createNamedQuery(User.FINDWITHID, User.class);
        tq.setParameter("user_id", jwt.claim("sub").get().toString());
        User u = null;
        try {
            u = tq.getSingleResult();
            System.out.println(u);
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }

        if(u == null){
            u = new User(jwt);
            em.persist(u);
        }

        return u;
    }

    @Transactional
    public User findOtherUser(JsonWebToken jwt, long id) {
        TypedQuery<User> tq = this.em.createNamedQuery(User.FINDOTHERUSER, User.class);
        tq.setParameter("roomid", id);
        tq.setParameter("user_id", jwt.claim("sub").get().toString());

        User u = null;
        try {
            u = tq.getSingleResult();
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(u);
        return u;
    }

    // Finden einer Person über ID in der DB
    @Transactional
    public User find(Optional id) {
        return em.find(User.class, id.get().toString());
    }

    @Transactional
    public User findFriend(String id) {
        return em.find(User.class, id);
    }

    // Finden einer Person über ID in der DB
    @Transactional
    public User findUser(String id) {
        return em.find(User.class, id);
    }

    // Ändern oder Einfügen einer Person mit id
    @Transactional
    public User update(User user) {
        return em.merge(user);
    }
}
