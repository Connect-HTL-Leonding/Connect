package org.connect.repository;

import org.connect.model.chat.Room;
import org.connect.model.meetup.Meeting;
import org.connect.model.meetup.Meeting_User;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.hibernate.mapping.Any;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class MeetUpRepository {
    @Inject
    protected EntityManager em;

    @Inject
    JsonWebToken jwt;

    @Transactional
    public Meeting create(Meeting meeting) {
        User u = em.find(User.class, jwt.getClaim("sub"));
        Room room = new Room("MU");
        meeting.setCreator(u);
        room.setMeeting(meeting);
        room.getUsers().add(u);
        em.persist(room);
        em.persist(meeting);
        return meeting;
    }

    @Transactional
    public Meeting_User addEntry(Meeting_User mu) {
        TypedQuery<Room> query = em.createNamedQuery(Room.FINDBYMEETING, Room.class);
        query.setParameter("meeting", mu.getMeeting());
        TypedQuery<User> userQuery = em.createNamedQuery(User.FINDWITHID, User.class);
        userQuery.setParameter("user_id", mu.getUser_id());

        Room r = null;
        User u = null;
        try {
            r = query.getSingleResult();
            u = userQuery.getSingleResult();
        } catch(Exception ex) {
            System.out.println(ex.getMessage());
        }

        r.getUsers().add(u);
        u.getRooms().add(r);
        mu.setSeen(false);
        em.persist(mu);
        em.merge(u);
        em.merge(r);
        return mu;
    }



    public List<Meeting> getMeetups(Optional user_id) {
        List<Meeting> list;
        TypedQuery<Meeting> query = em.createNamedQuery(Meeting.FINDALL, Meeting.class);
        query.setParameter("user_id", user_id.get().toString());
        list = query.getResultList();
        return list;
    }


    public List<Meeting> getMeetUpsWithMe(Optional user_id, String id) {
        List<Meeting> list;
        TypedQuery<Meeting> query = em.createNamedQuery(Meeting.FINDMEETUPSWITHME, Meeting.class);
        query.setParameter("user_id", user_id.get().toString());
        query.setParameter("creator_id", id);

        list = query.getResultList();
        return list;
    }

    public List<Meeting> getMeetUpsFromMe(Optional user_id) {
        List<Meeting> list;
        TypedQuery<Meeting> query = em.createNamedQuery(Meeting.FINDMEETUPSFROMME, Meeting.class);
        query.setParameter("creator_id",user_id.get().toString() );

        list = query.getResultList();
        return list;
    }

    public List<Meeting> getMeetUpsFromMeA(Optional user_id,String id) {
        List<Meeting> list;
        TypedQuery<Meeting> query = em.createNamedQuery(Meeting.FINDMEETUPSFROMMEA, Meeting.class);
        query.setParameter("creator_id",user_id.get().toString() );
        query.setParameter("user_id",id);

        list = query.getResultList();
        return list;
    }

    public List<Meeting> getMeetUpsFromMeD(Optional user_id,String id) {
        List<Meeting> list;
        TypedQuery<Meeting> query = em.createNamedQuery(Meeting.FINDMEETUPSFROMMED, Meeting.class);
        query.setParameter("creator_id",user_id.get().toString() );
        query.setParameter("user_id",id);

        list = query.getResultList();
        return list;
    }


    public List<Meeting_User> getMeetupUser(long id) {
        TypedQuery<Meeting_User> query = em.createNamedQuery(Meeting_User.FINDUSER, Meeting_User.class);
        query.setParameter("meeting_id", id);
        List<Meeting_User> list = query.getResultList();

        return list;
    }

    @Transactional
    public void setStatus(Long meetingId,String status) {
        User u = em.find(User.class, jwt.getClaim("sub"));
        Query query = em.createQuery("update Meeting_User mu set mu.status = :status where mu.meeting.id=:meetingId AND mu.user_id= :user_id");
        query.setParameter("status",status);
        query.setParameter("meetingId",meetingId);
        query.setParameter("user_id",u.getId());
        int result = query.executeUpdate();
    }

    @Transactional
    public void setSeen(Meeting_User mu) {
        User u = em.find(User.class, jwt.getClaim("sub"));
        System.out.println(mu.getMeeting().getId());
        System.out.println(mu.getUser_id());
        Query query = em.createQuery("update Meeting_User mu set mu.isSeen = true where mu.meeting.id=:meetingId AND mu.user_id= :user_id");
        query.setParameter("meetingId",mu.getMeeting().getId());
        query.setParameter("user_id",mu.getUser_id());
        int result = query.executeUpdate();
    }
}
