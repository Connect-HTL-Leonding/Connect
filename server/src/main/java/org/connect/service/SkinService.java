package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.skin.MySkin;
import org.connect.model.skin.Skin;
import org.connect.repository.SkinRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("/api/skin")
public class SkinService {

    @Inject
    SkinRepository dbRepo;

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    // Initialisieren der DB
    @Path("init")
    @GET
    @Produces(MediaType.TEXT_PLAIN)

    public String init() {
        dbRepo.initDB();
        return "DB initialized";
    }

    // Liste aller Skins senden
    @Path("findAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Skin> findAll() {
        return dbRepo.findAll();
    }

    // Ein Skin senden
    @Path("find/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Skin find(@PathParam("id") long id) {
        return dbRepo.find(id);
    }

    @Path("check/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public MySkin check(@PathParam("id") long id) {

        return dbRepo.check(id, jwt.claim("sub"));
    }

    // Ein Skin löschen
    @Path("delete/{id}")
    @DELETE
    public Skin deleteSkin(@PathParam("id") long id) {
        return dbRepo.delete(id);
    }

    // Ein Skin hinzufügen
    @Path("create")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Skin createPerson(Skin skin) {
        return dbRepo.create(skin);
    }

    // Ein Skin ändern
    @Path("update")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Skin updatePerson(Skin skin) {
        return dbRepo.update(skin);
    }

}