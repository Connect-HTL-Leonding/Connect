package org.connect.service;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.user.User;
import org.connect.repository.CategoryRepository;
import org.connect.repository.UserRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.representations.IDToken;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Map;

@Path("user")
public class UserService {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Inject
    UserRepository dbRepo;

    @GET
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    @NoCache
    public User login() {

        //user-id
        System.out.println(jwt.claim("sub"));

        return dbRepo.create(new User(jwt));
    }

    @GET
    @Path("customData")
    @Produces(MediaType.APPLICATION_JSON)
    @NoCache
    public User getData() {

        //user-id
        System.out.println(jwt.claim("sub"));

        return dbRepo.find(jwt.claim("sub"));
    }

    @PUT
    @Path("update")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public User update(User user) {

        //user-id
        System.out.println(jwt.claim("sub"));

        return dbRepo.update(user);
    }

    /*
    @GET
    @Path("logout")
    @Produces(MediaType.APPLICATION_JSON)
    @NoCache
    public void logout() {
        //user-id
        System.out.println(jwt.claim("sub"));
        jwt = null;
        //return dbRepo.create(new User(jwt));
    }

     */
}
