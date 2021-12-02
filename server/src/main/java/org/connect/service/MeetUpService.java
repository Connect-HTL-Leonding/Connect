package org.connect.service;

import org.connect.model.meetup.Meeting;
import org.connect.model.meetup.Meeting_User;
import org.connect.model.user.User;
import org.connect.repository.MeetUpRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.hibernate.mapping.Any;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.JsonObject;
import javax.persistence.TypedQuery;
import javax.print.attribute.standard.Media;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.LinkedList;
import java.util.List;

@ApplicationScoped
@Path("api/meetup/")
public class MeetUpService {

    @Inject
    MeetUpRepository repo;

    @Inject
    JsonWebToken jwt;

    @POST
    @Path("create")
    public Meeting create(Meeting meeting) {
        repo.create(meeting);
        return meeting;
    }

    @POST
    @Path("setOtherUser")
    public void setOtherUser(List<Meeting_User> mu) {
        repo.addEntry(mu);
    }

    @GET
    @Path("getMeetups")
    public List<Meeting> getMeetups() {
        return repo.getMeetups(jwt.claim("sub"));
    }

    @GET
    @Path("getMeetupById/{id}")
    public Meeting getMeetupById(@PathParam("id") Long id) { return repo.getMeetupById(id); }

    @POST
    @Path("getMeetupsWithMe")
    public List<Meeting> getMeetupsWithMe(String id) {
        return repo.getMeetUpsWithMe(jwt.claim("sub"),id);
    }


    @GET
    @Path("getMeetupsFromMe")
    public List<Meeting> getMeetupsFromMe() {
        return repo.getMeetUpsFromMe(jwt.claim("sub"));
    }

    @POST
    @Path("getMeetupsFromMeA")
    public List<Meeting> getMeetupsFromMeA(String id) {
        return repo.getMeetUpsFromMeA(jwt.claim("sub"),id);
    }

    @POST
    @Path("getMeetupsFromMeD")
    public List<Meeting> getMeetupsFromMeD(String id) {
        return repo.getMeetUpsFromMeD(jwt.claim("sub"),id);
    }

    @GET
    @Path("getMeetupUser/{id}")
    public List<Meeting_User> getMeetupUser(@PathParam("id") long id) {
        return repo.getMeetupUser(id);
    }

    @POST
    @Path("setStatusA")
    @Transactional
    public void setStatusA(Long MeetingId) {
        repo.setStatus(MeetingId,"accepted");
    }

    @POST
    @Path("setStatusD")
    @Transactional
    public void setStatusD(Long MeetingId) {
        repo.setStatus(MeetingId,"declined");
    }

    @POST
    @Path("setSeen")
    @Transactional
    public void setSeen(Meeting_User mu) {
        repo.setSeen(mu);
    }

    @POST
    @Path("deleteUserFromMeetup")
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public void deleteUserFromMeetup(JsonObject data) {
        repo.removeUserFromMeetup(data);
    }


}
