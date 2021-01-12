package org.connect.service;

import org.connect.model.Skin;
import org.connect.repository.DBRepositorySkin;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@ApplicationScoped
@Path("/api/skin")
public class ExampleService {

    @Inject
    DBRepositorySkin dbRepo;

    @Path("message")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "hello";
    }


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
    @Path("find/{idPerson}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Skin findAll(@PathParam("idPerson") long id) {
        return dbRepo.find(id);
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