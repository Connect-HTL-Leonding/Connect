package org.connect.repository;

import org.connect.model.skin.Skin;
import org.connect.model.user.User;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

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
}
