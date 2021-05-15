package org.connect.repository;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import org.connect.model.Person;

@ApplicationScoped
public class PublicRepo {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;

    @Transactional
    public void init() {

        Person p1 = new Person("gamer1", "Susi", "Sommer");
        Person p2 = new Person("gamer2", "Franz", "Winter");
        Person p3 = new Person("gamer3", "Jan", "Donnerbauer");

        em.persist(p1);
        em.persist(p2);
        em.persist(p3);

    }

    // Lesen aller Personen
    public List<Person> findAll() {
        return this.em
                .createNamedQuery(Person.FINDALL, Person.class)
                .getResultList();
    }
}
