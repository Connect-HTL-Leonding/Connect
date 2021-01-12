package org.connect.service;

import org.connect.model.skin.Skin;
import org.connect.repository.SkinRepository;

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
    public Skin findAll(@PathParam("id") long id) {
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