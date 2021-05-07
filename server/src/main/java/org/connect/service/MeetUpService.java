package org.connect.service;

import org.connect.model.meetup.Meeting;
import org.connect.model.meetup.Meeting_User;
import org.connect.model.user.User;
import org.connect.repository.MeetUpRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.print.attribute.standard.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@ApplicationScoped
@Path("api/meetup/")
public class MeetUpService {

    @Inject
    MeetUpRepository repo;

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
}
