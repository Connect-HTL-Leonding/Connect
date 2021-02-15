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

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.sql.rowset.serial.SerialBlob;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Map;

@ApplicationScoped
@Path("/api/image")
public class ImageService {
    byte[] profilePicture;

    String defaultPfp = "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";

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Inject
    UserRepository dbRepo;

    @PUT
    @Path("setPfp")
    @Consumes(MediaType.APPLICATION_JSON)
    public void saveImageToDatabase(String string) throws Exception {
        try {
            profilePicture = Base64.getEncoder().encode(string.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

      User u = getUser();
       u.setProfilePicture(profilePicture);
       dbRepo.update(u);

    }

    @GET
    @Path("getPfp")
    @Produces(MediaType.TEXT_PLAIN)
    public String getPfp() throws UnsupportedEncodingException {
        System.out.println("-------------");
        User u = getUser();
        System.out.println(u.getUserName());
        System.out.println(u.getProfilePicture());
        System.out.println(u.getDescription());
        if( u.getProfilePicture() != null) {
            return new String( Base64.getDecoder().decode(new String(u.getProfilePicture()).getBytes("UTF-8")));
        } else {
            return defaultPfp;
        }

    }

    public User getUser () {
       return dbRepo.find(jwt.claim("sub"));
    }



}
