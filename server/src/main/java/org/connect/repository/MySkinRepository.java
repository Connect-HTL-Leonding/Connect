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

    // Initialisieren
    //@PostConstruct
    public void initDB() {

        Skin s = this.create(new MySkin("Fußball","Du magst Fußball? Cool! Das ist der Fußbal Skin. Komm doch vorbei!","../assets/connect_img/square/fussball_square.png",100, 40, 1, 10));
        s.getCategories().add(em.find(Category.class, 1L));
    }

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
    public List<MySkin> findAll() {
        return this.em
                .createNamedQuery("MySkin.findAll", MySkin.class)
                .getResultList();
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
