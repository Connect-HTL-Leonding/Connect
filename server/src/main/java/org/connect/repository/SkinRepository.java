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

        Skin s = new Skin("Fußball","Du magst Fußball? Cool! Das ist der Fußball Skin. Komm doch vorbei!","../assets/connect_img/square/fussball_square.png", 100);
        Skin s1 = new Skin("Ausgehen","Du magst Ausgehen? Cool! Das ist der Ausgehen Skin. Komm doch vorbei!","../assets/connect_img/square/ausgehen_square.png", 100);
        Skin s2 = new Skin("Basketball","Du magst Basketball? Cool! Das ist der Basketball Skin. Komm doch vorbei!","../assets/connect_img/square/basketball_square.png", 100);
        Skin s3 = new Skin("Schwimmen","Du magst Schwimmen? Cool! Das ist der Schwimmen Skin. Komm doch vorbei!","../assets/connect_img/square/schwimmen_square.png", 100);
        Skin s4 = new Skin("Golf","Du magst Golf? Cool! Das ist der Golf Skin. Komm doch vorbei!","../assets/connect_img/square/golf_square.png", 100);
        Skin s5 = new Skin("Volleyball","Du magst Volleyball? Cool! Das ist der Volleyball Skin. Komm doch vorbei!","../assets/connect_img/square/volleyball_square.png", 100);
        Skin s6 = new Skin("Tennis","Du magst Tennis? Cool! Das ist der Tennis Skin. Komm doch vorbei!","../assets/connect_img/square/tennis_square.png", 100);



        Category c = new Category("All");
        Category c1 = new Category("Sport");
        Category c2 = new Category("Freizeit");

        s.getCategories().add(c);
        s.getCategories().add(c1);
        c.getSkins().add(s);
        c1.getSkins().add(s);

        s1.getCategories().add(c);
        s1.getCategories().add(c2);
        c.getSkins().add(s1);
        c2.getSkins().add(s1);

        s2.getCategories().add(c);
        s2.getCategories().add(c1);
        c.getSkins().add(s2);
        c1.getSkins().add(s2);

        s3.getCategories().add(c);
        s3.getCategories().add(c1);
        c.getSkins().add(s3);
        c1.getSkins().add(s3);

        s4.getCategories().add(c);
        s4.getCategories().add(c1);
        c.getSkins().add(s4);
        c1.getSkins().add(s4);

        s5.getCategories().add(c);
        s5.getCategories().add(c1);
        c.getSkins().add(s5);
        c1.getSkins().add(s5);

        s6.getCategories().add(c);
        s6.getCategories().add(c1);
        c.getSkins().add(s6);
        c1.getSkins().add(s6);

        //Jans User
        User susi = new User("7dfd00ec-436f-4d97-a72b-e9e82a7af50a", "susi");
        User jan = new User("85d71aa5-aae8-48c1-8145-9cb3163d41bd", "jan");
        User franz = new User("cf0f860a-8a18-4967-b010-233a7cef9bc3", "franz");
        User hello = new User("8c34c68f-3c8f-49e6-98be-a6a8a5e82939", "hello");



        User ibo = new User("9e5a3e77-8cc6-4f44-b59d-35c5b58ef36a", "ibo");
        User ibo1 = new User("3d225746-744d-4aca-a6c1-1e329c52cdbb","ibo1");
        User simon = new User("bf217210-fe97-41e5-80f9-2dcd84bb0308", "simon");

        //Trisis User, ID bitte nich ändern
        User trisi = new User("ec4b5ad7-d282-4970-b3e4-3342e16a82f5", "trisi");
        User trisi1 = new User("0f95e11b-5ac0-4f59-883a-4e6aadd6fc65","trisi1");
        User iboTrisi = new User("6096ea87-37fc-4bfb-8bf3-8b16816d6349","ibo1");

        //Tobis User, ID bitte nich ändern
        User tobias = new User("88db121c-4f49-42c2-8f96-5db7d3cbe75a", "tobias");
        User trisinger = new User("8ba5c9b4-47a1-445e-bc2b-689d7dcf44d3", "trisinger");
        User janTobi = new User("7e375e76-dc48-4c84-94ad-ce512effc6d9", "jan");

        Friendship f = new Friendship(susi,jan,s,LocalDateTime.now(),"cool");
        Friendship f1 = new Friendship(ibo,ibo1,s,LocalDateTime.now(),"cool");
        Friendship f2 = new Friendship(trisi,trisi1,s,LocalDateTime.now(),"cool");
        Friendship f3 = new Friendship(iboTrisi,trisi,s1,LocalDateTime.now(),"cool");
        Friendship f4 = new Friendship(iboTrisi,trisi1,s1,LocalDateTime.now(),"cool");
 //       Friendship f5 = new Friendship(franz, jan, s, LocalDateTime.now(), "cool");
        Friendship f5 = new Friendship(tobias,trisinger,s1,LocalDateTime.now(),"cool");
        Friendship f6 = new Friendship(tobias,janTobi,s1,LocalDateTime.now(),"cool");




        trisi.getPosition().put("lat",40.0);
        trisi.getPosition().put("lng",14.0);
        susi.getPosition().put("lat",48.205866965334934);
        susi.getPosition().put("lng",14.056365489806257);
        franz.getPosition().put("lat",48.26854300052356);
        franz.getPosition().put("lng",14.244409970317164);
        trisi1.getPosition().put("lat",48.305394);
        trisi1.getPosition().put("lng",14.287337);
        jan.getPosition().put("lat",48.205424900000004);
        jan.getPosition().put("lng",14.057973299999999);
        hello.getPosition().put("lat",48.205414999999995);
        hello.getPosition().put("lng",14.058034399999999);
        ibo.getPosition().put("lat",12.9);
        ibo.getPosition().put("lng",120.0);
        iboTrisi.getPosition().put("lat",48.307293);
        iboTrisi.getPosition().put("lng",14.286994);
        ibo1.getPosition().put("lat",81.007);
        ibo1.getPosition().put("lng",0.3);
        simon.getPosition().put("lat", 48.27776187468075);
        simon.getPosition().put("lng", 14.307813528905484);
        tobias.getPosition().put("lat",-74.543);
        tobias.getPosition().put("lng",9.33);
        trisinger.getPosition().put("lat",-12.9);
        trisinger.getPosition().put("lng",-120.0);
        janTobi.getPosition().put("lat",-156.34);
        janTobi.getPosition().put("lng",-103.39);




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

        // Trisi's rooms
        Room roomTrisi1 = new Room("DM");
        Room roomIboTrisi = new Room("DM");


        trisi.getRooms().add(roomTrisi1);
        trisi1.getRooms().add(roomTrisi1);
        roomTrisi1.getUsers().add(trisi);
        roomTrisi1.getUsers().add(trisi1);

        trisi.getRooms().add(roomIboTrisi);
        iboTrisi.getRooms().add(roomIboTrisi);
        roomIboTrisi.getUsers().add(trisi);
        roomIboTrisi.getUsers().add(iboTrisi);


        
        


        MySkin ms = new MySkin(30, 5, 1);
        ms.setSkin(s);
        ms.setUser(susi);
        MySkin ms2 = new MySkin(30, 5, 1);
        ms2.setSkin(s);
        ms2.setUser(franz);
        //MySkin ms3 = new MySkin(30, 5, 1);
        //ms3.setSkin(s);
       // ms3.setUser(trisi1);
        MySkin ms4 = new MySkin(30, 5, 1);
        ms4.setSkin(s);
        ms4.setUser(iboTrisi);
        MySkin ms5 = new MySkin(30, 5, 1);
        ms5.setSkin(s);
        ms5.setUser(hello);


        em.persist(c);
        em.persist(c1);
        em.persist(c2);
        em.persist(susi);
        em.persist(jan);
        em.persist(hello);
        em.persist(franz);
        em.persist(ibo);
        em.persist(ibo1);
        em.persist(iboTrisi);
        em.persist(simon);
        em.persist(trisi);
        em.persist(trisi1);
        em.persist(tobias);
        em.persist(roomJan1);
        em.persist(roomRafi1);
        em.persist(roomTrisi1);
        em.persist(roomIboTrisi);
        em.persist(roomIbo1);
        em.persist(roomIbo2);
        em.persist(roomRafi2);
        em.persist(s);
        em.persist(s1);
        em.persist(s2);
        em.persist(s3);
        em.persist(s4);
        em.persist(s5);
        em.persist(s6);
        em.persist(ms);
        em.persist(ms2);
     //   em.persist(ms3);
       em.persist(ms4);
        em.persist(ms5);
        em.persist(f);
        em.persist(f1);
        em.persist(f2);
        em.persist(f3);
        em.persist(f4);
        em.persist(f5);
        em.persist(f6);
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
