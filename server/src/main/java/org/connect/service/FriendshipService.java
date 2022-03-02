package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.model.user.Friendship;
import org.connect.model.user.User;
import org.connect.repository.FriendshipRepository;
import org.connect.repository.UserRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

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

    @POST
    @Path("block")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Friendship block(User friend) {

        return dbRepo.block(jwt, friend);
    }

    @POST
    @Path("unblock")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Friendship unblock(User friend) {
        return dbRepo.unblock(jwt, friend);
    }

    @Path("findRandom")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User find(List<MySkin> mySkin) {

        return dbRepo.findRandom(mySkin, jwt.claim("sub"));
    }

    @Path("findAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Friendship> find() {
        //DEBUGSystem.out.println(dbRepo.findAll());
        return dbRepo.findAll();
    }

    @Path("findBlocked/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Friendship> findBlocked(@PathParam("id") String id) {
        return dbRepo.findBlocked(id);
    }


    @Path("find/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Friendship find(@PathParam("id") long id) {
        return dbRepo.find(id);
    }

    @Path("findWithUsers/{userid1}/{userid2}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Friendship findWithUsers(@PathParam("userid1") String userid1, @PathParam("userid2") String userid2) {
        return dbRepo.findWithUsers(userid1, userid2);
    }

    @Path("findFriendshipsOfUser/{userId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Friendship> findFriendshipsOfUser(@PathParam("userId") String id) {

        User user = userRepo.findUser(id);

        return dbRepo.findFriendshipsOfUser(user);
    }




}
