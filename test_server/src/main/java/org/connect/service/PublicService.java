package org.connect.service;

import org.connect.model.Person;
import org.connect.repository.PublicRepo;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@ApplicationScoped
@Path("/api/public")
public class PublicService {

    @Inject
    PublicRepo dbRepo;

    @Path("test")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test() {
        return "Hello world!!!";
    }

    // Initialisieren der DB
    @Path("init")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String init() {
        dbRepo.init();
        return "DB init success";
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getUser() {
        return dbRepo.findAll();
    }
}
