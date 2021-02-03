package org.connect.repository;

import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.User;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.Optional;

@ApplicationScoped
public class UserRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;

    @Transactional
    public User create(User user) {
        //em.find(User.class, user)
        em.merge(user);
        return user;
    }

    // Finden einer Person über ID in der DB
    @Transactional
    public User find(Optional id) {
        return em.find(User.class, id.get().toString());
    }

    // Ändern oder Einfügen einer Person mit id
    @Transactional
    public User update(User user) {
        return em.merge(user);
    }
}
