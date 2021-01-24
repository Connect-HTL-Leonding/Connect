package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.skin.Category;
import org.connect.model.user.User;
import org.connect.repository.CategoryRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.annotations.cache.NoCache;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.security.Principal;
import java.util.List;

@ApplicationScoped
@Path("/api/category")
public class CategoryService {

    @Inject
    CategoryRepository dbRepo;

    @Inject
    SecurityIdentity identity;

    @Inject
    JsonWebToken jwt;

    // Liste aller Categorys senden
    @Path("findAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> findAll() {
        return dbRepo.findAll();
    }

    // Ein Category senden
    @Path("find/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Category findAll(@PathParam("id") long id) {
        return dbRepo.find(id);
    }

    // Ein Category löschen
    @Path("delete/{id}")
    @DELETE
    public Category deleteSkin(@PathParam("id") long id) {
        return dbRepo.delete(id);
    }

    // Ein Category hinzufügen
    @Path("create")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Category createCategory(Category c) {
        return dbRepo.create(c);
    }

    // Ein Skin ändern
    @Path("update")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Category updatePerson(Category c) {
        return dbRepo.update(c);
    }

}