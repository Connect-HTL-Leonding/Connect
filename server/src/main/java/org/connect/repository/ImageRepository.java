package org.connect.repository;

import org.connect.model.image.Image;
import org.connect.model.user.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
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
        em.persist(i);
        return i;
    }

    public String[] getImgURLs(JsonWebToken jwt) {
        String[] URLs = new String[4];
        TypedQuery<Image> tq = this.em.createNamedQuery(Image.FINDWITHID,Image.class);
        tq.setParameter("user_id", jwt.claim("sub").get().toString());
        List<Image> images;
        try {
            int counter = 0;
            images = tq.getResultList();
            for (Image i:
                images ) {
                String URL = new String( Base64.getDecoder().decode(new String(i.getImg()).getBytes("UTF-8")));
                URLs[counter] = URL;
                counter++;
            }

        }catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return URLs;
    }

}
