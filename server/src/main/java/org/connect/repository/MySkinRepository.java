package org.connect.repository;

import org.connect.model.skin.Category;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


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
    public MySkin create(MySkin myskin) {
        em.persist(myskin);
        return myskin;
    }

    // Lesen aller Personen
    @Transactional
    public List<MySkin> findAll(Optional id) {
        TypedQuery<MySkin> tq = this.em.createNamedQuery(MySkin.FINDALL, MySkin.class);
        tq.setParameter("u", id.get().toString());

        List<MySkin> ms = null;
        try {
            ms = tq.getResultList();
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(ms);

        return ms;
    }

    // Löschen einer Person
    @Transactional
    public MySkin delete(long id) {
        MySkin s = em.find(MySkin.class, id);
        em.remove(s);
        return s;
    }

    // Ändern oder Einfügen einer Person mit id
    @Transactional
    public MySkin update(MySkin skin) {
        return em.merge(skin);
    }


}
