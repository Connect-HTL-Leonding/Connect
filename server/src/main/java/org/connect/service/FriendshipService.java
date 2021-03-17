package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.skin.MySkin;
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
    public Friendship create(Friendship f) {

        return dbRepo.create(f);
    }

    //Friendship zwischen aktuellem und ausgesuchtem Nutzer wird erzeugt
    @GET
    @Path("create")
    @Produces(MediaType.APPLICATION_JSON)
    public Friendship create(User you, User friend, Skin skin) {

        return dbRepo.create(you, friend, skin);
    }

    @Path("findRandom")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> find(List<MySkin> mySkin) {
        return dbRepo.findRandom(mySkin, jwt.claim("sub"));
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
