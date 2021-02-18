package org.connect.repository;

import net.bytebuddy.asm.Advice;
import org.connect.model.chat.Message;
import org.connect.model.chat.Room;
import org.connect.model.skin.Category;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.User;
import org.hibernate.query.Query;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@ApplicationScoped
public class SkinRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;


    // Initialisieren
    //@PostConstruct
    @Transactional
    public void initDB() {

        Skin s = new Skin("Fußball","Du magst Fußball? Cool! Das ist der Fußbal Skin. Komm doch vorbei!","../assets/connect_img/square/fussball_square.png", 100);
        Skin s1 = new Skin("Fußball2","Du magst Fußball? Cool! Das ist der Fußbal Skin. Komm doch vorbei!","../assets/connect_img/square/fussball_square.png", 100);

        Category c = new Category("All");
        Category c1 = new Category("Sport");
        Category c2 = new Category("Freizeit");


        /*
        User u = new User("7dfd00ec-436f-4d97-a72b-e9e82a7af50a", "susi");
       // User u1 = new User("85d71aa5-aae8-48c1-8145-9cb3163d41bd", "jan");
        User u1 = em.find(User.class, "85d71aa5-aae8-48c1-8145-9cb3163d41bd");


         */




        User u = new User("54670498-2e18-404a-9c70-ef4245b8b358", "ibo");
        User u1 = new User("5f5079ab-63b9-4147-b8ae-1d3976338e23","ibo1");

        /*
        User u = new User("f065e017-25a6-4868-88be-79e5b0b38a84", "trisi");
        User u1 = new User("5eb2297f-85a9-4e6a-9901-268353e2e4c4","trisi1");

         */

        /*
        User u = new User("54670498-2e18-404a-9c70-ef4245b8b358", "ibo");
        User u1 = new User("5f5079ab-63b9-4147-b8ae-1d3976338e23","ibo1");
*/

        Room r = new Room("DM");
        Room r1 = new Room("DM");
        u.getRooms().add(r);
        u1.getRooms().add(r);
        u1.getRooms().add(r1);
        r.getUsers().add(u);
        r.getUsers().add(u1);
        r1.getUsers().add(u1);

        MySkin ms = new MySkin(30, 5, 5);
        ms.setSkin(s);
        ms.setUser(u);
        s.getCategories().add(c);
        s.getCategories().add(c1);
        s1.getCategories().add(c);
        s1.getCategories().add(c1);
        c.getSkins().add(s);
        c1.getSkins().add(s);

        em.persist(c);
        em.persist(c1);
        em.persist(c2);
        em.persist(u);
        em.persist(u1);
        em.persist(r);
        em.persist(r1);
        em.persist(s);
        em.persist(s1);
        em.persist(ms);
    }

    // Finden einer Person über ID in der DB
    public Skin find(long id) {
        return em.find(Skin.class, id);
    }


    public MySkin check(long skin_id, Optional user_id) {
        TypedQuery<MySkin> tq = this.em.createNamedQuery(Skin.CHECK, MySkin.class);
        tq.setParameter("s", skin_id);
        tq.setParameter("u", user_id.get().toString());
        MySkin s = null;
        try {
             s = tq.getSingleResult();
            System.out.println(s);
        }catch (Exception e) {
            System.out.println(e.getMessage());
        }


        return s;
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
                .createNamedQuery(Skin.FINDALL, Skin.class)
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
