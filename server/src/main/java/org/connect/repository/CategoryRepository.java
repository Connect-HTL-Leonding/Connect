package org.connect.repository;

import org.connect.model.skin.Category;
import org.connect.model.skin.MySkin;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class CategoryRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em ;

    // Initialisieren
    //@PostConstruct
    public void initDB() {

    }

    // Finden einer Person über ID in der DB
    public Category find(long id) {
        return em.find(Category.class, id);
    }

    // Einfügen einer neuen Person in die DB
    @Transactional
    public Category create(Category c) {
        em.persist(c);
        return c;
    }

    // Lesen aller Personen
    public List<Category> findAll() {
        return this.em
                .createNamedQuery("Category.findAll", Category.class)
                .getResultList();
    }

    // Löschen einer Person
    @Transactional
    public Category delete(long id) {
        Category c = em.find(Category.class, id);
        em.remove(c);
        return c;
    }

    // Ändern oder Einfügen einer Person mit id
    @Transactional
    public Category update(Category c) {
        return em.merge(c);
    }


}
