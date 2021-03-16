package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.skin.MySkin;
import org.connect.model.user.User;
import org.connect.repository.MySkinRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@ApplicationScoped
@Path("/api/myskin")
public class MySkinService {

    @Inject
    MySkinRepository dbRepo;

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;


    // Liste aller Skins senden
    @Path("findAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<MySkin> findAll() {
        System.out.println(identity.getPrincipal().getName());

        return dbRepo.findAll(jwt.claim("sub"));
    }

    // Liste aller selektierten Skins senden
    @Path("findSelected")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<MySkin> findSelected() {
        System.out.println(identity.getPrincipal().getName());

        return dbRepo.findSelected(jwt.claim("sub"));
    }

    // Liste aller selektierten Skins senden
    @Path("findMapSkins")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<MySkin> findMapSkins() {
        System.out.println(identity.getPrincipal().getName());

        return dbRepo.findMapSkin(jwt.claim("sub"));
    }

    // Ein Skin senden
    @Path("find/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public MySkin findAll(@PathParam("id") long id) {
        MySkin ms = dbRepo.find(id);
        System.out.println(ms);
        return ms;
    }

    // Ein Skin löschen
    @Path("delete/{id}")
    @DELETE
    public MySkin deleteSkin(@PathParam("id") long id) {
       return dbRepo.delete(id);
    }

    // Ein Skin hinzufügen
    @Path("create")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public MySkin createMySkin(MySkin skin) {
        skin.setUser(new User(jwt));
        return dbRepo.create(skin);
    }
    // Ein Skin ändern
    @Path("update")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public MySkin updateMySkin(MySkin skin) {
        return dbRepo.update(skin);
    }

}