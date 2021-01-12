package org.connect.repository;

import org.connect.model.skin.Skin;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class SkinRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em ;

    // Finden einer Person über ID in der DB
    public Skin find(long id) {
        return em.find(Skin.class, id);
    }

    // Einfügen einer neuen Person in die DB
    @Transactional
    public Skin create(Skin skin) {
        em.persist(skin);
        return skin;
    }

    // Lesen aller Personen
    public List<Skin> findAll() {
        return this.em
                .createNamedQuery("Skin.findAll", Skin.class)
                .getResultList();
    }

    // Löschen einer Person
    @Transactional
    public Skin delete(long id) {
        Skin s = em.find(Skin.class, id);
        em.remove(s);
        return s;
    }

    // Ändern oder Einfügen einer Person mit id
    @Transactional
    public Skin update(Skin skin) {
        return em.merge(skin);
    }


}
