package org.connect.service;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@ApplicationScoped
@Path("/api/public")
public class PublicService {

    // Initialisieren der DB
    @Path("init")
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String init() {
        return "xD";
    }
}
