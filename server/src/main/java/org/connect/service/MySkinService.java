package org.connect.service;

import org.connect.model.skin.MySkin;
import org.connect.repository.MySkinRepository;

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
    public List<MySkin> findAll() {
        return dbRepo.findAll();
    }

    // Ein Skin senden
    @Path("find/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public MySkin findAll(@PathParam("id") long id) {
        return dbRepo.find(id);
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
    public MySkin createPerson(MySkin skin) {
        return dbRepo.create(skin);
    }
    // Ein Skin ändern
    @Path("update")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public MySkin updatePerson(MySkin skin) {
        return dbRepo.update(skin);
    }

}