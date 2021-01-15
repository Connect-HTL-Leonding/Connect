package org.connect.repository;

import org.connect.model.skin.Category;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class MySkinRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em ;

    // Finden einer Person über ID in der DB
    public MySkin find(long id) {
        return em.find(MySkin.class, id);
    }

    // Einfügen einer neuen Person in die DB
    @Transactional
    public MySkin create(MySkin skin) {
        em.persist(skin);
        return skin;
    }

    // Lesen aller Personen
    @Transactional
    public List<MySkin> findAll() {
        return this.em
                .createNamedQuery(MySkin.FINDALL, MySkin.class)
                .getResultList();
    }

    // Löschen einer Person
    @Transactional
    public void delete(long id) {
        MySkin s = em.find(MySkin.class, id);
        em.remove(s);
    }

    // Ändern oder Einfügen einer Person mit id
    @Transactional
    public MySkin update(MySkin skin) {
        return em.merge(skin);
    }


}
