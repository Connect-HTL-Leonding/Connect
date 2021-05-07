package org.connect.service;

import org.connect.model.meetup.Meeting;
import org.connect.model.meetup.Meeting_User;
import org.connect.model.user.User;
import org.connect.repository.MeetUpRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.TypedQuery;
import javax.print.attribute.standard.Media;
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
    public void setOtherUser(Meeting_User mu) {
        System.out.println(mu.getMeeting().getId());
        repo.addEntry(mu);
    }

    @GET
    @Path("getMeetups")
    public List<Meeting> getMeetups() {
        return repo.getMeetups(jwt.claim("sub"));
    }

    @GET
    @Path("getMeetupUser/{id}")
    public List<Meeting_User> getMeetupUser(@PathParam("id") long id) {
        return repo.getMeetupUser(id);
    }
}
