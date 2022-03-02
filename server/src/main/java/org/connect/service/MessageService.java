package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Message;
import org.connect.model.chat.Room;
import org.connect.model.skin.MySkin;
import org.connect.model.user.User;
import org.connect.repository.ChatRepository;
import org.connect.repository.MessageRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Calendar;
import java.util.List;

@ApplicationScoped
@Path("api/message/")
public class MessageService {

    @Inject
    MessageRepository dbRepo;

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Path("findAll/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Message> findAll(@PathParam("id") long id) {
        List<Message> ms = dbRepo.findAll(id);
        return ms;
    }


    @Path("getSeenMessages/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public long getSeenMessages(@PathParam("id") long roomId) {
        long count = dbRepo.getSeenMessages(roomId);
        return count;
    }

    @Path("getAllMessages/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public long getAllMessages(@PathParam("id") long roomId) {
        long count = dbRepo.getAllMessages(roomId);
        return count;
    }

    @Path("findLatestMessage/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Message findLatestMessage(@PathParam("id") long id) {
        Message m = dbRepo.getLatestMessage(id);
        return m;
    }

    @Path("create/{id}")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Message createMessage(Message message, @PathParam("id") long id) {
        //DEBUGSystem.out.println(java.time.LocalDateTime.now());
        message.setCreated(java.time.LocalDateTime.now());
        message.setUpdated(java.time.LocalDateTime.now());
        Room room = dbRepo.findRoom(id);
        message.setRoom(room);
        message.setUser(new User(jwt));
        return dbRepo.create(message);
    }

    @Path("init")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String init() {
        dbRepo.init();
        return "DB initialized";
    }



}
