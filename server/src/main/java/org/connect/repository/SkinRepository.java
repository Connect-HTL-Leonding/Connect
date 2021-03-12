package org.connect.repository;

import net.bytebuddy.asm.Advice;
import org.connect.model.chat.Message;
import org.connect.model.chat.Room;
import org.connect.model.skin.Category;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.hibernate.query.Query;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;


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


        User u = new User("7dfd00ec-436f-4d97-a72b-e9e82a7af50a", "susi");
        User u1 = new User("85d71aa5-aae8-48c1-8145-9cb3163d41bd", "jan");


        User u2 = new User("54670498-2e18-404a-9c70-ef4245b8b358", "ibo");
        User u3 = new User("5f5079ab-63b9-4147-b8ae-1d3976338e23","ibo1");

        User u4 = new User("f065e017-25a6-4868-88be-79e5b0b38a84", "trisi");
        User u5 = new User("5eb2297f-85a9-4e6a-9901-268353e2e4c4","trisi1");

        User u6 = new User("f8da46c4-406d-48db-97a3-bfbd85e87276", "tobias");

        User u7 = new User("5f92cdb2-1d5f-43a2-80ef-8ba5cdc3c881", "trisinger");
        User u8 = new User("4024687d-3598-4e70-86f2-8a9ffcbf11d0", "jan");

        Friendship f = new Friendship(u,u1,s,LocalDateTime.now(),"cool");
        Friendship f1 = new Friendship(u2,u3,s,LocalDateTime.now(),"cool");
        Friendship f2 = new Friendship(u4,u5,s,LocalDateTime.now(),"cool");
        Friendship f3 = new Friendship(u3,u5,s1,LocalDateTime.now(),"cool");
        Friendship f4 = new Friendship(u1,u5,s1,LocalDateTime.now(),"cool");




        u.getPosition().put("Lat",123.456);
        u.getPosition().put("Lng",-111.11);
        u1.getPosition().put("Lat",74.543);
        u1.getPosition().put("Lng",-9.33);
        u2.getPosition().put("Lat",12.9);
        u2.getPosition().put("Lng",120.0);
        u3.getPosition().put("Lat",156.34);
        u3.getPosition().put("Lng",103.39);
        u4.getPosition().put("Lat",81.007);
        u4.getPosition().put("Lng",0.3);
        u5.getPosition().put("Lat",-74.543);
        u5.getPosition().put("Lng",9.33);
        u6.getPosition().put("Lat",-12.9);
        u6.getPosition().put("Lng",-120.0);
        u7.getPosition().put("Lat",-156.34);
        u7.getPosition().put("Lng",-103.39);
        u8.getPosition().put("Lat",-81.007);
        u8.getPosition().put("Lng",-0.3);





        Room r = new Room("DM");
        Room r1 = new Room("DM");
        Room r2 = new Room("DM");
        Room r3 = new Room("DM");

        u.getRooms().add(r);
        r.getUsers().add(u);

        u1.getRooms().add(r);
        r.getUsers().add(u1);

        u2.getRooms().add(r2);
        r2.getUsers().add(u2);


        u3.getRooms().add(r2);
        r2.getUsers().add(u3);

        u6.getRooms().add(r1);
        u6.getRooms().add(r3);
        r1.getUsers().add(u6);
        r3.getUsers().add(u6);

        u8.getRooms().add(r3);
        r3.getUsers().add(u8);
        r1.getUsers().add(u7);
        u7.getRooms().add(r1);



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
        em.persist(u2);
        em.persist(u3);
        em.persist(u4);
        em.persist(u5);
        em.persist(u6);
        em.persist(r);
        em.persist(r1);
        em.persist(r2);
        em.persist(r3);
        em.persist(s);
        em.persist(s1);
        em.persist(ms);
        em.persist(f);
        em.persist(f1);
        em.persist(f2);
        em.persist(f3);
        em.persist(f4);
        em.persist(u7);
        em.persist(u8);
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
