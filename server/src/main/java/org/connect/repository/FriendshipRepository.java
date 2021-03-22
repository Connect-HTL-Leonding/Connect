package org.connect.repository;

import org.connect.model.chat.Room;
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
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@ApplicationScoped
public class FriendshipRepository {

    // Entitymanager erzeugen
    @Inject
    protected EntityManager em;

    public static double distance(double lat1, double lat2, double lon1,
                                  double lon2, double el1, double el2) {

        final int R = 6371; // Radius of the earth

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        double height = el1 - el2;

        distance = Math.pow(distance, 2) + Math.pow(height, 2);

        return Math.sqrt(distance);
    }

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
    public User findRandom(List<MySkin> mySkins, Optional id) {
        User curUser = em.find(User.class, id.get().toString());
        Map<User, Skin> userSkin = new HashMap<User, Skin>();
        Integer randomNumber = null;
        int tolerance = 50;
        List<User> userList = new LinkedList<>();
        List<User> deleteList = new LinkedList<>();
        for (MySkin mySkin: mySkins) {
            System.out.println("Myskin from list");
            System.out.println(mySkin.getSkin().getTitle());
            TypedQuery<User> tq = this.em.createNamedQuery(Friendship.FINDRANDOM, User.class);
            tq.setParameter("niveau", mySkin.getNiveau());
            tq.setParameter("age", mySkin.getAge());
            tq.setParameter("user_1", curUser);
            tq.setParameter("mySkinSkin_id", mySkin.getSkin().getId());
            //muss noch implementiert werden
            //tq.setParameter("radius", mySkin.getRadius());

            try {
                List<User> users= tq.getResultList();
                System.out.println("1. Query");
                System.out.println(tq);
                userList.addAll(users);
                for(User user : userList){

                    Double distance = distance(user.getPosition().get("lat"),curUser.getPosition().get("lat"),user.getPosition().get("lng"),curUser.getPosition().get("lng"),0,0);
                    TypedQuery<MySkin> tms = this.em.createNamedQuery(MySkin.FINDSPECIFIC, MySkin.class);
                    tms.setParameter("u",user);
                    tms.setParameter("skin",mySkin.getSkin().getId());

                    MySkin ms2 = tms.getSingleResult();
                    int radius;
                    if(mySkin.getRadius() >= ms2.getRadius()){
                        radius = ms2.getRadius();
                    }else{
                        radius = mySkin.getRadius();
                    }
                    System.out.println("Distance und Radius"+ user.getId()+" & "+curUser.getId());
                    System.out.println(distance);
                    System.out.println(radius*1000);


                    if(distance >= radius * 1000 + tolerance){
                        deleteList.add(user);
                    }else {
                        userSkin.put(user, mySkin.getSkin());
                    }
                }
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
                System.out.println("Yeet");
                System.out.println(e.getMessage());
            }

            System.out.println("userList nach 1. Query");
            System.out.println(deleteList);
        }

        if(!userList.isEmpty()){
            System.out.println("Größe der UserList");
            System.out.println(userList.size());
            for (User user: userList) {


                TypedQuery<Friendship> tq = this.em.createNamedQuery(Friendship.FIND, Friendship.class);
                tq.setParameter("user_1", user);
                tq.setParameter("user_2", curUser);


                try {

                    Friendship dummy = tq.getSingleResult();

                    System.out.println(dummy + "Schritt 1");
                    if(dummy != null && !deleteList.contains(user)){


                            deleteList.add(user);

                    }

                } catch (Exception e) {
                    System.out.println("yoink");
                    System.out.println(e.getMessage());
                }
            }


            userList.removeAll(deleteList);
            if(!userList.isEmpty()){
                randomNumber = ThreadLocalRandom.current().nextInt(0, userList.size());
            }

            System.out.println("finale Userlist");
            System.out.println(userList);
        }

        if(randomNumber != null){

            User newFriend = userList.get(randomNumber);
            Skin sameSkin = userSkin.get(newFriend);

            create(curUser, newFriend, em.find(Skin.class, sameSkin.getId()));

            Room room = new Room();
            room.getUsers().add(curUser);
            room.getUsers().add(newFriend);
            em.persist(room);

            return newFriend;
        }

        return null;
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
