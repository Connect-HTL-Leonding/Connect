package org.connect.service;

import io.quarkus.security.identity.SecurityIdentity;
import org.connect.model.image.Image;
import org.connect.model.user.User;
import org.connect.repository.ImageRepository;
import org.connect.repository.UserRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.List;

@ApplicationScoped
@Path("/api/image")
public class ImageService {
    byte[] profilePicture;


    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @Inject
    UserRepository uRepo;

    @Inject
    ImageRepository iRepo;


    @PUT
    @Path("setPfp")
    //@Consumes(MediaType.APPLICATION_JSON)
    public void saveImageToDatabase(byte[] blob) throws Exception {
        try {
            profilePicture = blob;
        } catch (Exception e) {
            e.printStackTrace();
        }

      User u = getUser();
        if(profilePicture!=null && profilePicture.length>0) {
            u.setProfilePicture(profilePicture);
            uRepo.update(u);
        }


    }

    @POST
    @Path("getFriendPfp")
    /*@Produces(MediaType.TEXT_PLAIN)*/
    public byte[] getFriendPfp(String id){
       return iRepo.getFriendPfp(id);
    }



    @GET
    @Path("getPfp")
    /*@Produces(MediaType.TEXT_PLAIN)*/
    public byte[] getPfp(){
        User u = getUser();

            return u.getProfilePicture();

    }

    @POST
    @Path("saveImage")
    @Consumes(MediaType.TEXT_PLAIN)
    public void saveImage(String base64string) throws UnsupportedEncodingException {
       byte[] stringToByteArray = Base64.getEncoder().encode(base64string.getBytes());
        Image i = new Image(getUser().getId(),stringToByteArray);
        iRepo.create(i);
    }

    /*@GET
    @Path("getImages")
    @Produces(MediaType.APPLICATION_JSON)
    public String[] getImages() {

        String[] imgURLs = iRepo.getImgURLs(jwt);
        return imgURLs;
    } */

    @GET
    @Path("getImages")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Image> getImages() {
        List<Image> images = iRepo.getImgURLs(jwt);
        return images;
    }

    @GET
    @Path("getDefaultPfp")
    public byte[] getDefaultPfp() {
        return iRepo.getDefaultPfp();
    }

    @GET
    @Path("getFriendImages/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Image> getFriendImages(@PathParam("id") String id) {
        return iRepo.getFriendImgURLs(id);
    }

    @GET
    @Path("getAllFriendImages/{id}}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Image> getAllFriendImages(@PathParam("id") String id) {
        return iRepo.getAllFriendImgURLs(id);
    }

    @GET
    @Path("getAllImages")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Image> getAllImages() {
        List<Image> images = iRepo.getALlImagesURLs(jwt);
        return images;
    }

    @Path("delete/{id}")
    @DELETE
    public Image deleteSkin(@PathParam("id") long id) {
        return iRepo.delete(id);
    }



    public User getUser () {
       return uRepo.find(jwt.claim("sub"));
    }



}
