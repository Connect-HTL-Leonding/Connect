package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.skin.Skin;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.connect.repository.FriendshipRepository;
import org.connect.repository.UserRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.annotations.cache.NoCache;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("api/friendship")
public class FriendshipService {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Inject
    FriendshipRepository dbRepo;

    @Inject
    UserRepository userRepo;

    @GET
    @Path("create")
    @Produces(MediaType.APPLICATION_JSON)
    @NoCache
    public Friendship create(Friendship f) {

        return dbRepo.create(f);
    }


    @Path("findAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Friendship> find() {
        return dbRepo.findAll();
    }


    @Path("find/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Friendship find(@PathParam("id") long id) {
        return dbRepo.find(id);
    }

    @Path("findFriendshipsOfUser/{userId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Friendship> findFriendshipsOfUser(@PathParam("userId") String id) {

        User user = userRepo.findUser(id);

        return dbRepo.findFriendshipsOfUser(user);
    }




}
