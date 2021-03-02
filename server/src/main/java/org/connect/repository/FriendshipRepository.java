package org.connect.repository;

import org.connect.model.skin.Skin;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class FriendshipRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;

    @Transactional
    public Friendship create(Friendship f) {
        em.persist(f);
        return f;
    }


    public List<Friendship> findAll() {
        return this.em
                .createNamedQuery(Friendship.FINDALL, Friendship.class)
                .getResultList();
    }

    public Friendship find(long id) {
        return em.find(Friendship.class, id);
    }

    public List<Friendship> findFriendshipsOfUser(User u) {
        return this.em
                .createNamedQuery(Friendship.FINDFRIENDSHIPSOFUSER, Friendship.class).setParameter("user",u)
                .getResultList();
    }
}
