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
import java.nio.charset.StandardCharsets;
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


        User susi = new User("85d71aa5-aae8-48c1-8145-9cb3163d41bd", "susi");
        User jan = new User("7dfd00ec-436f-4d97-a72b-e9e82a7af50a", "jan");


        User ibo = new User("a4054032-dafe-4979-8efd-ae1107bec778", "ibo");
        User ibo1 = new User("74691fbf-c71c-4d9a-bb34-143265af9b5e","ibo1");
        User simon = new User("c0281dc2-1772-4552-bc52-1d54265ba4b0", "simon");

        //Trisis User, ID bitte nich ändern
        User trisi = new User("f065e017-25a6-4868-88be-79e5b0b38a84", "trisi");
        User trisi1 = new User("5eb2297f-85a9-4e6a-9901-268353e2e4c4","trisi1");

        //Tobis User, ID bitte nich ändern
        User tobias = new User("f8da46c4-406d-48db-97a3-bfbd85e87276", "tobias");
        User trisinger = new User("5f92cdb2-1d5f-43a2-80ef-8ba5cdc3c881", "trisinger");
        User janTobi = new User("4024687d-3598-4e70-86f2-8a9ffcbf11d0", "jan");

        Friendship f = new Friendship(susi,jan,s,LocalDateTime.now(),"cool");
        Friendship f1 = new Friendship(ibo,ibo1,s,LocalDateTime.now(),"cool");
        Friendship f2 = new Friendship(trisi,trisi1,s,LocalDateTime.now(),"cool");
        Friendship f3 = new Friendship(ibo1,trisi,s1,LocalDateTime.now(),"cool");
        Friendship f4 = new Friendship(jan,trisi1,s1,LocalDateTime.now(),"cool");





        susi.getPosition().put("Lat",123.456);
        susi.getPosition().put("Lng",-111.11);
        trisi1.getPosition().put("Lat",48.305394);
        trisi1.getPosition().put("Lng",14.287337);
        jan.getPosition().put("Lat",74.543);
        jan.getPosition().put("Lng",-9.33);
        ibo.getPosition().put("Lat",12.9);
        ibo.getPosition().put("Lng",120.0);
        ibo1.getPosition().put("Lat",48.307293);
        ibo1.getPosition().put("Lng",14.286994);
        simon.getPosition().put("Lat",81.007);
        simon.getPosition().put("Lng",0.3);
        tobias.getPosition().put("Lat",-74.543);
        tobias.getPosition().put("Lng",9.33);
        trisinger.getPosition().put("Lat",-12.9);
        trisinger.getPosition().put("Lng",-120.0);
        janTobi.getPosition().put("Lat",-156.34);
        janTobi.getPosition().put("Lng",-103.39);




    // Jan's rooms
        Room roomJan1 = new Room("DM");
        
        susi.getRooms().add(roomJan1);
        roomJan1.getUsers().add(susi);

        jan.getRooms().add(roomJan1);
        roomJan1.getUsers().add(jan);

    // Ibo's rooms
        Room roomIbo1 = new Room("DM");
        Room roomIbo2 = new Room("DM");
        ibo.getRooms().add(roomIbo1);
        ibo1.getRooms().add(roomIbo1);
        roomIbo1.getUsers().add(ibo);
        roomIbo1.getUsers().add(ibo1);

        ibo.getRooms().add(roomIbo2);
        simon.getRooms().add(roomIbo2);
        roomIbo2.getUsers().add(ibo);
        roomIbo2.getUsers().add(simon);

    // Rafi's rooms
        Room roomRafi1 = new Room("DM");
        Room roomRafi2 = new Room("DM");
        
        tobias.getRooms().add(roomRafi1);
        trisinger.getRooms().add(roomRafi1);
        roomRafi1.getUsers().add(tobias);
        roomRafi1.getUsers().add(trisinger);
        
        janTobi.getRooms().add(roomRafi2);
        tobias.getRooms().add(roomRafi2);
        roomRafi2.getUsers().add(janTobi);
        roomRafi2.getUsers().add(tobias);
        
        


        MySkin ms = new MySkin(30, 5, 5);
        ms.setSkin(s);
        ms.setUser(susi);
        s.getCategories().add(c);
        s.getCategories().add(c1);
        s1.getCategories().add(c);
        s1.getCategories().add(c1);
        c.getSkins().add(s);
        c1.getSkins().add(s);

        em.persist(c);
        em.persist(c1);
        em.persist(c2);
        em.persist(susi);
        em.persist(jan);
        em.persist(ibo);
        em.persist(ibo1);
        em.persist(simon);
        em.persist(trisi);
        em.persist(trisi1);
        em.persist(tobias);
        em.persist(roomJan1);
        em.persist(roomRafi1);
        em.persist(roomIbo1);
        em.persist(roomIbo2);
        em.persist(roomRafi2);
        em.persist(s);
        em.persist(s1);
        em.persist(ms);
        em.persist(f);
        em.persist(f1);
        em.persist(f2);
        em.persist(f3);
        em.persist(f4);
        em.persist(trisinger);
        em.persist(janTobi);
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
