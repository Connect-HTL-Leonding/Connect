package org.connect.repository;

import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class FriendshipRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;


    @Transactional
    public Friendship create(Friendship f) {
        em.persist(f);
        return f;
    }

    @Transactional
    public Friendship create(User you, User friend, Skin skin) {
        Friendship f = new Friendship(you, friend, skin, LocalDateTime.now(), "friend");

        em.persist(f);
        return f;
    }

    @Transactional
    public List<User> findRandom(List<MySkin> mySkins, Optional id) {

        List<User> userList = new LinkedList<>();
        List<User> deleteList = new LinkedList<>();
        for (MySkin mySkin: mySkins) {
            TypedQuery<User> tq = this.em.createNamedQuery(Friendship.FINDRANDOM, User.class);
            tq.setParameter("niveau", mySkin.getNiveau());
            tq.setParameter("age", mySkin.getAge());
            tq.setParameter("user_1", em.find(User.class, id.get().toString()));
            tq.setParameter("mySkinSkin_id", mySkin.getSkin().getId());
            //muss noch implementiert werden
            //tq.setParameter("radius", mySkin.getRadius());

            try {
                List<User> users= tq.getResultList();
                System.out.println(users);
                userList.addAll(users);
                /*
                for (User user: userList) {
                    Friendship friendship = null;
                    TypedQuery<Friendship> tq2 = this.em.createNamedQuery(Friendship.FIND, Friendship.class);
                    tq2.setParameter("user_1", em.find(User.class, id.get().toString()));
                    tq2.setParameter("user_2", user);


                    friendship = tq2.getSingleResult();

                    if(friendship == null){
                        userList.remove(user);
                    }
                }
                 */
            }catch (Exception e) {
                System.out.println(e.getMessage());
            }

            System.out.println(userList);
        }

        if(!userList.isEmpty()){
            System.out.println(userList.size());
            for (User user: userList) {
                System.out.println("test");
                TypedQuery<Friendship> tq = this.em.createNamedQuery(Friendship.FIND, Friendship.class);
                tq.setParameter("user_1", user);
                tq.setParameter("user_2", em.find(User.class, id.get().toString()));
                //muss noch implementiert werden
                //tq.setParameter("radius", mySkin.getRadius());

                try {
                    Friendship dummy = tq.getSingleResult();
                    System.out.println(dummy + "Schritt 1");
                    if(dummy == null){
                        TypedQuery<Friendship> tq2 = this.em.createNamedQuery(Friendship.FIND2, Friendship.class);
                        tq2.setParameter("user_1", user);
                        tq2.setParameter("user_2", em.find(User.class, id.get().toString()));
                        dummy = tq2.getSingleResult();
                        System.out.println(dummy + "Schritt 2");
                        if(dummy != null){

                            deleteList.add(user);
                        }
                    }else {
                        deleteList.add(user);
                    }

                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }


            userList.removeAll(deleteList);

            System.out.println(userList);
        }

        return userList;
    }



    public List<Friendship> findAll() {
        return this.em
                .createNamedQuery(Friendship.FINDALL, Friendship.class)
                .getResultList();
    }

    public Friendship find(long id) {
        return em.find(Friendship.class, id);
    }

    public List<Friendship> findFriendshipsOfUser(User u) {
        return this.em
                .createNamedQuery(Friendship.FINDFRIENDSHIPSOFUSER, Friendship.class).setParameter("user",u)
                .getResultList();
    }
}
