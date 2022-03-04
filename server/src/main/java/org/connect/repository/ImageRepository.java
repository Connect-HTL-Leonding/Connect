package org.connect.repository;

import org.connect.model.image.Image;
import org.connect.model.skin.MySkin;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.Transient;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.Base64;
import java.util.List;

@ApplicationScoped
public class ImageRepository {
    @Inject
    protected EntityManager em;

    @Transactional
    public Image create(Image i) {
        if(i.getImg()!= null && i.getImg().length>0) {
            em.persist(i);
        }

        return i;
    }

    /*public String[] getImgURLs(JsonWebToken jwt) {
        String[] URLs = new String[4];
        TypedQuery<Image> tq = this.em.createNamedQuery(Image.FINDWITHID,Image.class);
        tq.setParameter("user_id", jwt.claim("sub").get().toString());
        List<Image> images;
        try {
            int counter = 0;
            images = tq.getResultList();
            for (Image i: images ) {
                String URL = new String( Base64.getDecoder().decode(new String(i.getImg()).getBytes("UTF-8")));
                URLs[counter] = URL;
                counter++;
            }

        }catch (Exception e) {
            //DEBUGSystem.out.println(e.getMessage());
        }
        return URLs;
    } */

     public List<Image> getImgURLs(JsonWebToken jwt) {
        TypedQuery<Image> tq = this.em.createNamedQuery(Image.FINDWITHID,Image.class);
        tq.setParameter("user_id", jwt.claim("sub").get().toString());
        List<Image> images = null;
        List<Image> tail = null;
        try {
            images = tq.getResultList();
            //DEBUGSystem.out.println(images);
            tail = images.subList(Math.max(images.size() - 4, 0), images.size());
            //DEBUGSystem.out.println(tail);
        }catch (Exception e) {
            //DEBUGSystem.out.println(e.getMessage());
        }
        return tail;
    }

    public byte[] getDefaultPfp() {
    TypedQuery<Image> q = em.createNamedQuery(Image.GETDEFAULTPFP,Image.class);
    Image i = q.getSingleResult();
    return i.getImg();
    }

    public List<Image> getFriendImgURLs(String id) {
         TypedQuery<Image> tq = this.em.createNamedQuery(Image.FINDWITHID, Image.class);
         tq.setParameter("user_id", id);
        List<Image> images = null;
        List<Image> tail = null;
        try {
            images = tq.getResultList();
            //DEBUGSystem.out.println(images);
            tail = images.subList(Math.max(images.size() - 4, 0), images.size());
            //DEBUGSystem.out.println(tail);
        }catch (Exception e) {
            //DEBUGSystem.out.println(e.getMessage());
        }
        return tail;
    }

    public List<Image> getAllFriendImgURLs(String id) {
        TypedQuery<Image> tq = this.em.createNamedQuery(Image.FINDWITHID, Image.class);
        tq.setParameter("user_id", id);
        List<Image> images = null;
        try {
            images = tq.getResultList();
        }catch (Exception e) {
            //DEBUGSystem.out.println(e.getMessage());
        }
        return images;
    }

    public List<Image> getALlImagesURLs(JsonWebToken jwt) {
        TypedQuery<Image> tq = this.em.createNamedQuery(Image.FINDWITHID,Image.class);
        tq.setParameter("user_id", jwt.claim("sub").get().toString());
        List<Image> images = null;
        try {
            images = tq.getResultList();
        }catch (Exception e) {
            //DEBUGSystem.out.println(e.getMessage());
        }
        return images;
    }

    @Transactional
    public Image delete(long id) {
        Image i = em.find(Image.class, id);
        em.remove(i);
        return i;
    }



}
