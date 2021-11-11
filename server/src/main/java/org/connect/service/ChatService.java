package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.chat.Room;
import org.connect.model.skin.Category;
import org.connect.repository.CategoryRepository;
import org.connect.repository.ChatRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@ApplicationScoped
@Path("api/chat/")
public class ChatService {

    @Inject
    ChatRepository dbRepo;

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Path("findAll/{type}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Room> findAll(@PathParam("type") String type) {
        System.out.println(identity.getPrincipal().getName());

        return dbRepo.findAll(jwt.claim("sub"), type);
    }




    @Path("init")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String init() {
        dbRepo.init();
        return "DB initialized";
    }
}
