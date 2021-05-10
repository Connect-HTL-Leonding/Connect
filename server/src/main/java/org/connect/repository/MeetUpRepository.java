package org.connect.repository;

import org.connect.model.meetup.Meeting;
import org.connect.model.meetup.Meeting_User;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

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
        meeting.setCreator(u);
        em.persist(meeting);
        return meeting;
    }

    @Transactional
    public Meeting_User addEntry(Meeting_User mu) {
      em.persist(mu);
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

    public List<Meeting> getMeetUpFromMe(Optional user_id, String id) {
        List<Meeting> list;
        TypedQuery<Meeting> query = em.createNamedQuery(Meeting.FINDMEETUPSFROMME, Meeting.class);
        query.setParameter("creator_id", user_id);
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
        Query query = em.createQuery("update Meeting_User mu set mu.status = :status where mu.meeting.id=:meetingId");
        query.setParameter("status",status);
        query.setParameter("meetingId",meetingId);
        int result = query.executeUpdate();
    }
}
